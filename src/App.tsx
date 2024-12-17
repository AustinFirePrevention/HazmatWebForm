import { useState } from 'react'
import { HazardousMaterials } from './components/HazardousMaterials';
import { ContactDetails } from './components/ContactDetails';
import { FeeProcessor } from './helpers/FeeProcessor';
import { Modal, Button } from 'react-bootstrap';
import { SummaryModalContent } from './components/SummaryModal';
import PermitDetails from './components/PermitDetails';
import BusinessDetails from './components/BusinessDetails';
import type { Material } from './helpers/FeeProcessor';

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

  const calculateFees = (materialsArray: Material[]) => {
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const data: { [key: string]: unknown } = {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materialsArray: any[] = []
    formData.forEach((value, key) => {
      if (key.startsWith('material_')) {
        const field = key.split('_').slice(1, -1).join('_')
        const id = key.split('_').at(-1)
        const material = materialsArray.find(m => m.id === id) || { id }
        material[field] = value
        if (!materialsArray.includes(material)) {
          materialsArray.push(material)
        }
      } else {
        data[key] = value
      }
    })

    // Calculate totals using FeeProcessor
    if (applicationType === 'new_permit' && !file) {
      alert('Storage map is required for new permit applications.');
      return;
    }

    data.storage_map = file
    data.storage_map_name = file?.name
    data.hazardous_materials = materialsArray
    data.fees = calculateFees(materialsArray);
    setShowModal(true);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      console.log(response)
      console.log(JSON.stringify(data))
    }

  }

  return (
    <>
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