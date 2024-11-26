import { useState } from 'react'
import { HazardousMaterials } from './components/HazardousMaterials';
import { ContactDetails } from './components/ContactDetails';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FeeProcessor } from './helpers/FeeProcessor';
import { Modal, Button } from 'react-bootstrap';
import { SummaryModalContent } from './components/SummaryModal';

export interface ContactDetailsProps {
  prefix: string;
  title: string;
  note?: string;
}

const endpoint = 'https://prod-08.usgovtexas.logic.azure.us:443/workflows/cc81a18f43ca44d38a582cbb2558b91e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-aivnhs83y1zB8GXU2C5G28RrHdUtmzo8xP_7brUl10'

function App() {
  const [isAgentSameAsPrimary, setIsAgentSameAsPrimary] = useState('no')
  const [materials, setMaterials] = useState([{ id: Date.now() }])
  const [isPermitDetailsCollapsed, setIsPermitDetailsCollapsed] = useState(false);
  const [isBusinessDetailsCollapsed, setIsBusinessDetailsCollapsed] = useState(true);
  const [isRequestingPartyCollapsed, setIsRequestingPartyCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [totals, setTotals] = useState({
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const data: { [key: string]: any } = {}
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

    data.materials = materialsArray

    // Calculate totals using FeeProcessor
    const feeResults = FeeProcessor(materialsArray);
    setTotals(feeResults);
    setShowModal(true);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      alert('Form submitted successfully')
    } else {
      alert('Form submission failed')
    }
    console.log(JSON.stringify(data))
  }

  return (
    <>
      <h1 className="text-center mt-4">Aboveground Hazardous Materials Permit Application</h1>
      <form className="form container mt-4" onSubmit={handleSubmit}>
        <div className="section mb-4">
          <h2 onClick={() => setIsPermitDetailsCollapsed(!isPermitDetailsCollapsed)} style={{ cursor: 'pointer' }}>
            <button type='button' className='btn btn-primary'>{isPermitDetailsCollapsed ? <FaChevronDown /> : <FaChevronUp />}</button> Permit Details
          </h2>
          {!isPermitDetailsCollapsed && (
            <>
              <div className="alert alert-info">
                Payments are processed through the Austin Build + Connect (AB+C) online customer portal.&nbsp;
                <strong>Register at the </strong>
                <strong>
                  <a title="AB+C Registration Link" href="https://abc.austintexas.gov/austin-ui/portal/home" target="_blank" rel="noopener">
                    Austin Build + Connect
                  </a> website to proceed.&nbsp;
                </strong>
              </div>
              <div className="alert alert-warning">
                Bills are not added to the account automatically, bills will be added manually after the application is reviewed and approved. An e-mail will be sent to the address associated with the account when the fees are ready to be paid.
              </div>
              <div className="alert alert-danger">
                <strong>Do not send applications and payment by mail.</strong>
              </div>
              <div className="mb-3">
                <label className="form-label">Austin Build + Connect ID:</label>
                <input type="text" className="form-control" name="abc_id" />
                <small className="form-text text-muted">
                  To locate your Austin Build + Connect ID number, go to "My Profile" from the AB+C menu pane.
                </small>
              </div>
              <div className="mb-3">
                <label className="form-label">Austin Build + Connect Email:</label>
                <input type="text" className="form-control" name="abc_email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Type of Application:</label>
                <select className="form-select" name="application_type">
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Aboveground Hazardous Materials Permit Number:</label>
                <input type="text" className="form-control" name="permit_number" />
              </div>
              <div className="mb-3">
                <label className="form-label">Building Permit Number:</label>
                <input type="text" className="form-control" name="building_permit" />
              </div>
            </>
          )}
        </div>
        <div className="section mb-4">
          <h2 onClick={() => setIsBusinessDetailsCollapsed(!isBusinessDetailsCollapsed)} style={{ cursor: 'pointer' }}>
            <button type='button' className='btn btn-primary'>{isBusinessDetailsCollapsed ? <FaChevronDown /> : <FaChevronUp />}</button> Business Details
          </h2>
          {!isBusinessDetailsCollapsed && (
            <>
              <div className="mb-3">
                <label className="form-label">Business Name:</label>
                <input type="text" className="form-control" name="business_name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Street Address:</label>
                <input type="text" className="form-control" name="street_address" />
              </div>
              <div className="mb-3">
                <label className="form-label">Suite Number:</label>
                <input type="text" className="form-control" name="suite_no" />
              </div>
              <div className="mb-3">
                <label className="form-label">City:</label>
                <input type="text" className="form-control" name="city" />
              </div>
              <div className="mb-3">
                <label className="form-label">Zip:</label>
                <input type="text" className="form-control" name="zip" />
              </div>
              <div className="mb-3">
                <label className="form-label">Main Phone Number:</label>
                <input type="text" className="form-control" name="main_phone_number" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address:</label>
                <input type="text" className="form-control" name="email_address" />
              </div>
              <div className="mb-3">
                <label className="form-label">Principal Business Activity:</label>
                <input type="text" className="form-control" name="business_activity" />
              </div>
              <div className="mb-3">
                <label className="form-label">Hours of Operations:</label>
                <input type="text" className="form-control" name="hours_of_operation" />
              </div>
            </>
          )}
        </div>
        <ContactDetails
          prefix="primary_contact"
          title="Primary Contact"
          note="This person is responsible for obtaining the initial permit, renewing it every 3 years, and answering application questions. They will be listed as an emergency contact."
        />
        <div className="section mb-4">
          <h2 onClick={() => setIsRequestingPartyCollapsed(!isRequestingPartyCollapsed)} style={{ cursor: 'pointer' }}>
            <button type='button' className='btn btn-primary'>{isRequestingPartyCollapsed ? <FaChevronDown /> : <FaChevronUp />}</button> Requesting Party
          </h2>
          {!isRequestingPartyCollapsed && (
            <>
              <p>Agent, contractor, or permitted business representative completing this application.</p>
              <div className="mb-3">
                <label className="form-label">Business representative or agent completing this application is the same as the primary contact:</label>
                <select
                  className="form-select"
                  name="is_agent_same_as_primary_contact"
                  value={isAgentSameAsPrimary}
                  onChange={(e) => setIsAgentSameAsPrimary(e.target.value)}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {isAgentSameAsPrimary === 'no' && (
                <ContactDetails prefix="requesting_party" title="Requesting Party" />
              )}
            </>
          )}
        </div>
        <ContactDetails prefix="responsible_official" title="Responsible Official - Business Owner, Manager, President, etc." />
        <ContactDetails prefix="emergency_contact" title="Emergency Contact - 24 hour contact" />
        <HazardousMaterials materials={materials} setMaterials={setMaterials} />
        <div className="section mb-4">
          <div className="mb-3">
            <label className="form-label">Facilities Storage Map:</label>
            <input type="file" className="form-control" name="storage_map" />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SummaryModalContent totals={totals} />
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