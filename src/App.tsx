import { useState } from 'react'
import { HazardousMaterials } from './components/HazardousMaterials';
import { ContactDetails } from './components/ContactDetails';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
      <form className="form container mt-4" onSubmit={handleSubmit}>
        <div className="section mb-4">
          <h2 onClick={() => setIsPermitDetailsCollapsed(!isPermitDetailsCollapsed)} style={{ cursor: 'pointer' }}>
            Permit Details {isPermitDetailsCollapsed ? <FaChevronDown /> : <FaChevronUp />}
          </h2>
          {!isPermitDetailsCollapsed && (
            <>
              <div className="alert alert-warning">
                <strong>Payment options for AFD services have recently changed</strong>
              </div>
              <div className="alert alert-info">
                Payments for our services are now processed through the Austin Build + Connect (AB+C) online customer portal.&nbsp;
              </div>
              <div className="alert alert-info">
                <strong>If you do not have an AB+C account, please register at the </strong>
                <strong>
                  <a title="AB+C Registration Link" href="https://abc.austintexas.gov/austin-ui/portal/home" target="_blank" rel="noopener">
                    Austin Build + Connect
                  </a> website before proceeding with this application.
                </strong>
              </div>
              <div className="alert alert-info">
                Once you have created your account, please locate your Austin Build + Connect ID number by going to "My Profile" from the AB+C menu pane and enter the ID number below.
              </div>
              <div className="alert alert-info">
                Is important to note that the bills are not added to the account automatically, we will have to manually add them after the application is reviewed and approved. We will e-mail the address associated with the account when the fees are ready to be paid.
                <strong>Note to all applicants: Please make sure to follow the process outlined in this form and do not send applications and payment by mail.</strong>
              </div>
              <div className="mb-3">
                <label className="form-label">Austin Build + Connect ID:</label>
                <input type="text" className="form-control" name="abc_id" />
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
            Business Details {isBusinessDetailsCollapsed ? <FaChevronDown /> : <FaChevronUp />}
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
            Requesting Party {isRequestingPartyCollapsed ? <FaChevronDown /> : <FaChevronUp />}
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
    </>
  )
}

export default App