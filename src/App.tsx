import { useState } from 'react'
import { HazardousMaterials } from './components/HazardousMaterials';
import { ContactDetails } from './components/ContactDetails';
import { FeeProcessor } from './helpers/FeeProcessor';
import { Modal, Button } from 'react-bootstrap';
import { SummaryModalContent } from './components/SummaryModal';
import PermitDetails from './components/PermitDetails';
import BusinessDetails from './components/BusinessDetails';
import { useMaterials, Material } from './helpers/MaterialsContext';

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
    setFees(FeeProcessor(materialsArray));
    return fees;
  }

  return { fees, calculateFees };
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [applicationType, setApplicationType] = useState('new_permit');
  const { fees, calculateFees } = useFees();
  const [file, setFile] = useState<File | null>(null);
  const { materials } = useMaterials();

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

    setShowModal(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: { [key: string]: any } = {}
    formData.forEach((value, key) => {
      data[key] = value
    })
    data.materials = materials
    data.fees = calculateFees(materials as Required<Material>[])
    console.log(file)
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
    if (!response.ok) {
      alert('There was an error submitting the form. Please contact the administrator.')
      console.log(response)
      console.log(JSON.stringify(formData))
    }

  }

  return (
    <>
      <nav className="navbar sticky-top bg-body-secondary">
        <div className="container-fluid">
          <a className="navbar-brand mb-0 h1 fs-1" href="https://www.austintexas.gov/department/fire">
            <img src="/pages/AFDPreventionDevTeam/hazmat/AFD.gif" alt="Logo" width="30" height="30" className="d-inline-block align-text me-3 logo" />
            Austin Fire Department
          </a>
          <span className="navbar-text fs-4">
            <a href="https://www.austintexas.gov/department/fire-marshals-office">Fire Marshal's Office</a>
          </span>
        </div>
      </nav>
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SummaryModalContent totals={fees} />
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