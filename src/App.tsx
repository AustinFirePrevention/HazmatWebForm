import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { HazardousMaterials } from './components/HazardousMaterials';
import { ContactDetails } from './components/ContactDetails';
import PermitDetails, { ApplicationType } from './components/PermitDetails';
import BusinessDetails from './components/BusinessDetails';
import { NavBar } from './components/NavBar'
import { SubmissionModal, Status as SubmissionStatus } from './components/Modal';
import { useFees } from './helpers/FeeProcessor';
import { useMaterials, IncompleteMaterialsError } from './helpers/MaterialsContext';
import { PrimaryContactPreamble } from './components/PrimaryContactPreamble';
import { Toast, ToastContainer } from 'react-bootstrap';
import schema from './helpers/validationSchema';

//const endpoint = "https://localhost"
const endpoint = 'https://prod-08.usgovtexas.logic.azure.us:443/workflows/cc81a18f43ca44d38a582cbb2558b91e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-aivnhs83y1zB8GXU2C5G28RrHdUtmzo8xP_7brUl10'

function App() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [applicationType, setApplicationType] = useState<ApplicationType>('new_permit');
  const { fees, calculateFees } = useFees();
  const [file, setFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<SubmissionStatus>('error');
  const { materials, uncollapseIncompleteMaterialsAndThrow, setMaterials } = useMaterials();
  const [showMaterialToast, setShowMaterialToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isThirdParty, setIsThirdParty] = useState(false);
  const [businessPhone, setBusinessPhone] = useState('');
  const [requestPhone, setRequestPhone] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [responsiblePhone, setResponsiblePhone] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [requestCellPhone, setRequestCellPhone] = useState('');
  const [primaryCellPhone, setPrimaryCellPhone] = useState('');
  const [responsibleCellPhone, setResponsibleCellPhone] = useState('');
  const [emergencyCellPhone, setEmergencyCellPhone] = useState('');
  const [isSpreadsheetMode, setIsSpreadsheetMode] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileAdditionalRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (materials && materials.length > 0) {
      setShowMaterialToast(true);
    }
  }, [materials]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  function clearFile() {
    const f = fileInputRef.current;
    setFile(null);

    if (f?.value) {
      f.value = '';
    }
  }

  function clearAdditionalFiles() {
    const f = fileAdditionalRef.current;
    setAdditionalFiles([]);
    if (f?.value) {
      f.value = '';
    }
  }

  const handleAdditionalFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setAdditionalFiles(newFiles);
    }
  }

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  function clearForm() {
    setBusinessPhone('')
    setRequestPhone('')
    setPrimaryPhone('')
    setResponsiblePhone('')
    setEmergencyPhone('')
    setRequestCellPhone('')
    setPrimaryCellPhone('')
    setResponsibleCellPhone('')
    setEmergencyCellPhone('')
    setMaterials([])
    setApplicationType('new_permit')
    setFile(null)
    setAdditionalFiles([])
    setIsThirdParty(false)
    if (formRef.current) {
      formRef.current.reset()
    }
  }


  async function processForm(event: React.FormEvent) {
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData.forEach((_, key) => {
      if (key.startsWith('material_')) {
        formData.delete(key) // Remove all materials from the form data
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: { [key: string]: any } = {}
    formData.forEach((value, key) => {
      data[key] = value
    })
    data.fees = calculateFees(applicationType)

    if (file) {
      data.storage_map = {
        content: await toBase64(file),
        name: file.name
      }
    } else {
      data.storage_map = undefined
    }

    // Process additional files
    if (additionalFiles.length > 0) {
      data.additional_files = await Promise.all(
        additionalFiles.map(async (file) => ({
          content: await toBase64(file),
          name: file.name
        }))
      );
    }
    data.is_third_party = isThirdParty

    if (applicationType === 'renewal_no_change') {
      data.materials = []
    } else {
      data.materials = materials
    }
    return await schema.validate(data);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (applicationType !== 'renewal_no_change' && !isSpreadsheetMode && materials.length === 0) { //todo handle differently
        console.log("No materials found")
        throw new IncompleteMaterialsError()
      }

      uncollapseIncompleteMaterialsAndThrow();

      const data = await processForm(event);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {

        setStatus(applicationType === "renewal_no_change" || isSpreadsheetMode ? 'successCantShowFees' : 'success')
        clearForm()
      }

      if (!response.ok) {
        setStatus('error')
        console.error(response)
        console.error(data)
      }

      setShowModal(true);
    } catch (error) {
      if (error instanceof IncompleteMaterialsError) {
        setShowErrorToast(true);
        return;
      }
      setStatus('error')
      setShowModal(true);
      console.error(error);
      throw error;
    }
  }

  return (
    <>
      <NavBar />
      <h1 className="text-center mt-4">{t("title")}</h1>
      <form ref={formRef} data-testid="form" className="form container mt-4" onSubmit={handleSubmit}>
        <div className="alert alert-warning">
          {t("permit_details_preamble.public_info_notice")}
        </div>
        <PermitDetails applicationType={applicationType} onApplicationTypeChange={(type) => setApplicationType(type)} />
        <BusinessDetails phone={businessPhone} setPhone={setBusinessPhone} />
        <div className="section mb-4">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isThirdParty"
              name="is_third_party"
              onChange={(e) => setIsThirdParty(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isThirdParty">
              {t("requesting_party.checkbox_label", "I am a third party requesting this application on behalf of the business")}
            </label>
          </div>
        </div>

        {isThirdParty && (
          <ContactDetails
            prefix="requesting_party"
            title={t("requesting_party.title", "Requesting Party")}
            note={<div className="alert alert-info">{t("requesting_party.note", "Please provide the contact details of the person requesting this application.")}</div>}
            required
            businessPhone={requestPhone}
            setBusinessPhone={setRequestPhone}
            cellPhone={requestCellPhone}
            setCellPhone={setRequestCellPhone}
          />
        )}
        <ContactDetails
          required
          prefix="primary_contact"
          title={t("primary_contact.title")}
          note={<PrimaryContactPreamble />}
          businessPhone={primaryPhone}
          setBusinessPhone={setPrimaryPhone}
          cellPhone={primaryCellPhone}
          setCellPhone={setPrimaryCellPhone}
        />
        <ContactDetails
          prefix="responsible_official"
          title={t("responsible_official.title")}
          note={<div className="alert alert-info">{t("responsible_official.note")}</div>}
          required
          copyFromPrimary
          businessPhone={responsiblePhone}
          setBusinessPhone={setResponsiblePhone}
          cellPhone={responsibleCellPhone}
          setCellPhone={setResponsibleCellPhone}
        />
        <ContactDetails prefix="emergency_contact" title={t("emergency_contact.title")}
          businessPhone={emergencyPhone}
          setBusinessPhone={setEmergencyPhone}
          cellPhone={emergencyCellPhone}
          setCellPhone={setEmergencyCellPhone}
        />
        <HazardousMaterials show={applicationType !== 'renewal_no_change'} isSpreadsheetMode={isSpreadsheetMode} setIsSpreadsheetMode={setIsSpreadsheetMode} />
        <div className="section mb-4">
          <div className="mb-3">
            <label htmlFor='storage_map' className={`form-label ${applicationType === 'new_permit' ? "required" : ""}`}>{t("storage_map")}</label>
            <input ref={fileInputRef} id='storage_map' type="file" className="form-control mb-2" name="storage_map" onChange={handleFileChange} required={applicationType === 'new_permit'} />
            <button type="button" className="btn btn-secondary btn-sm me-2" onClick={clearFile}>
              {t("clear")}
            </button>
            {applicationType !== 'new_permit' && (
              <small className="form-text text-muted">
                {t("storage_map_note")}
              </small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">{t("additional_files")}</label>
            <input
              ref={fileAdditionalRef}
              type="file"
              className="form-control mb-2"
              multiple
              onChange={handleAdditionalFilesChange}
            />
            <button type="button" className="btn btn-secondary btn-sm me-2" onClick={clearAdditionalFiles}>
              {t("clear")}
            </button>
            <small className="form-text text-muted">
              {t("additional_files_note", "Upload SDS, response plans, or other relevant documents")}
            </small>
          </div>
        </div>
        <button type="submit" className="btn btn-success mb-3">{t("submit")}</button>

      </form>
      <ToastContainer position="bottom-center" containerPosition="sticky" className="p-3">
        <Toast bg={showErrorToast ? "danger" : ""} show={showMaterialToast || showErrorToast} onClose={() => { setShowMaterialToast(false); setShowErrorToast(false) }} delay={5000} autohide>
          <Toast.Body className='text-center'>
            {showErrorToast ? t("toast.error_message") : t("toast.materials_count_message", { count: materials.length })}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <SubmissionModal showModal={showModal} setShowModal={setShowModal} status={status} fees={fees} />
    </>
  )
}

export default App
