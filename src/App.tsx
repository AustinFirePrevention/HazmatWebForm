import { useState } from 'react'
import { HazardousMaterials } from './components/HazardousMaterials';
import { ContactDetails } from './components/ContactDetails';
import { FeeProcessor } from './helpers/FeeProcessor';
import { Modal, Button } from 'react-bootstrap';
import { SummaryModalContent } from './components/SummaryModal';
import PermitDetails, { ApplicationTypes } from './components/PermitDetails';
import BusinessDetails from './components/BusinessDetails';
import { useMaterials, Material } from './helpers/MaterialsContext';
import { NavBar } from './components/NavBar'
import * as Sentry from '@sentry/react'

export interface ContactDetailsProps {
  prefix: string;
  title: string;
  note?: string;
  required?: boolean;
}

const endpoint = 'https://prod-08.usgovtexas.logic.azure.us:443/workflows/cc81a18f43ca44d38a582cbb2558b91e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-aivnhs83y1zB8GXU2C5G28RrHdUtmzo8xP_7brUl10'

function useFees() {
  const [fees, setFees] = useState({
    aggregateAmounts: {
      healthLiquid: 0,
      fireLiquid: 0,
      instabilityLiquid: 0,
      healthGas: 0,
      fireGas: 0,
      instabilityGas: 0,
      healthSolid: 0,
      fireSolid: 0,
      instabilitySolid: 0,
      ESS: 0,
    },
    fees: {
      healthLiquid: 0,
      fireLiquid: 0,
      instabilityLiquid: 0,
      healthGas: 0,
      fireGas: 0,
      instabilityGas: 0,
      healthSolid: 0,
      fireSolid: 0,
      instabilitySolid: 0,
      ESS: 0,
    },
    total: 0,
  });

  const calculateFees = (materialsArray: Required<Material>[]) => {
    const calculatedFees = FeeProcessor(materialsArray);
    Sentry.setContext('fees', calculatedFees);
    setFees(calculatedFees);
    return calculatedFees;
  }

  return { fees, calculateFees };
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [applicationType, setApplicationType] = useState<ApplicationTypes>('new_permit');
  const { fees, calculateFees } = useFees();
  const [file, setFile] = useState<File | null>(null);
  const { materials } = useMaterials();
  const [status, setStatus] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
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

    if (applicationType === 'renewal_no_change') {
      data.materials = []
    } else {
      data.materials = materials
    }
    data.fees = calculateFees(materials as Required<Material>[])

    if (file) {
      data.storage_map = {
        content: await toBase64(file),
        name: file.name
      }
    }
    console.log(data)
    console.log(JSON.stringify(data))

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      setStatus(true)
    } else {
      setStatus(false)
      console.error(response)
      console.error(JSON.stringify(formData))
    }

    setShowModal(true);
  }

  return (
    <>
      <NavBar />
      <h1 className="text-center mt-4">Aboveground Hazardous Materials Permit Application</h1>
      <form className="form container mt-4" onSubmit={handleSubmit}>
        <PermitDetails applicationType={applicationType} onApplicationTypeChange={(type) => setApplicationType(type)} />
        <BusinessDetails />
        <ContactDetails
          required
          prefix="primary_contact"
          title="Primary Contact"
          note="This person is responsible for obtaining the initial permit, renewing it every 3 years, and answering application questions. They will be listed as an emergency contact."
        />
        <ContactDetails prefix="responsible_official" title="Responsible Official - Business Owner, Manager, President, etc." />
        <ContactDetails prefix="emergency_contact" title="Emergency Contact - 24 hour contact" />
        <HazardousMaterials show={applicationType !== 'renewal_no_change'} />
        <div className="section mb-4">
          <div className="mb-3">
            <label className={`form-label ${applicationType === 'new_permit' ? "required" : ""}`}>Facilities Storage Map:</label>
            <input type="file" className="form-control" name="storage_map" onChange={handleFileChange} required={applicationType === 'new_permit'} />
          </div>
        </div>
        <button type="submit" className="btn btn-success mb-3">Submit</button>
      </form>
      <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
        <Modal.Header className={status ? "bg-success" : "bg-danger"} closeButton>
          <Modal.Title >Form Submission {status ? "Completed!" : "Failed!"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            {status ? <p>Your form has been submitted successfully.</p> : <p>There was an error submitting your form. Please try again. If your issues persist please contact us at <a href='mailto:FirePrevention@austintexas.gov'> FirePrevention@austintexas.gov</a></p>}
          </div>

          {status && <SummaryModalContent totals={fees} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default App