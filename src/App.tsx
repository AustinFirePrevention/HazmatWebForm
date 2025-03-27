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
import { FileSelector } from './components/FileSelector';
import { processForm, ProcessedFormData } from './helpers/processForm';

const endpoint = "https://localhost"
//const endpoint = 'https://prod-08.usgovtexas.logic.azure.us:443/workflows/cc81a18f43ca44d38a582cbb2558b91e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-aivnhs83y1zB8GXU2C5G28RrHdUtmzo8xP_7brUl10'

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

  class FileError extends Error {
    constructor() {
      super('Files are missing');
      this.name = 'FileError';
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (applicationType !== 'renewal_no_change' && !isSpreadsheetMode && materials.length === 0) {
        console.log("No materials found")
        throw new IncompleteMaterialsError()
      }

      const cleanMaterials = uncollapseIncompleteMaterialsAndThrow();

      if (!formRef.current) {
        throw new Error('Form not found');
      }

      const files = {
        storage_map: file || undefined,
        additional_files: additionalFiles
      };

      const options = {
        isThirdParty,
        applicationType,
        isSpreadsheetMode
      };

      const data = await processForm(
        formRef.current,
        files,
        cleanMaterials,
        options,
        calculateFees,
        schema
      ) as ProcessedFormData;

      // Check for empty file content
      if (data.additional_files.some(f => !f.content) || 
          (data.storage_map && !data.storage_map.content)) {
        throw new FileError()
      }

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
      if (error instanceof FileError) {
        setStatus('fileError')
        setShowModal(true);
        console.error(error);
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
        <BusinessDetails phone={businessPhone} setPhone={setBusinessPhone} setIsThirdParty={setIsThirdParty} />
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
          <FileSelector
            applicationType={applicationType}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            clearFile={clearFile}
            labelText={t("storage_map")}
            labelId="storage_map"
            note={t("storage_map_note")}
          />
          <FileSelector
            applicationType={applicationType}
            fileInputRef={fileAdditionalRef}
            handleFileChange={handleAdditionalFilesChange}
            clearFile={clearAdditionalFiles}
            labelText={t("additional_files")}
            labelId="additional_files"
            note={t("additional_files_note", "Upload SDS, response plans, or other relevant documents")}
            multiple
          />
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
