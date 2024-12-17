import FormSection from './FormSection';
import { PermitDetailsPreamble } from './PermitDetailsPreamble';

export default function PermitDetails({ applicationType, onApplicationTypeChange }: { applicationType: String, onApplicationTypeChange: (type: string) => void }) {

    return (<>
        <FormSection title="Permit Details">
            <div>
                <PermitDetailsPreamble />
                <div className="mb-3">
                    <label className="form-label required">Austin Build + Connect ID:</label>
                    <input type="text" className="form-control" name="abc_id" required />
                    <small className="form-text text-muted">
                        To locate your Austin Build + Connect ID number, go to "My Profile" from the AB+C menu pane.
                    </small>
                </div>
                <div className="mb-3">
                    <label className="form-label required">Austin Build + Connect Email:</label>
                    <input type="text" className="form-control" name="abc_email" required />
                </div>
                <div className="mb-3">
                    <label className="form-label required">Type of Application:</label>
                    <select
                        className="form-select"
                        name="application_type"
                        required
                        onChange={(e) => onApplicationTypeChange(e.target.value)}
                    >
                        <option value="new_permit">New Permit</option>
                        <option value="renewal_no_change">Permit Renewal - No inventory Change</option>
                        <option value="renewal_with_change">Permit Renewal - Inventory Change</option>
                    </select>
                </div>
                {applicationType === "new_permit" ?
                    <div className="mb-3">
                        <label className="form-label required">Building Permit Number:</label>
                        <input type="text" className="form-control" name="building_permit" required />
                    </div> :
                    <div className="mb-3">
                        <label className={`form-label required`}>Aboveground Hazardous Materials Permit Number:</label>
                        <input type="text" className="form-control" name="permit_number" required />
                    </div>
                }
            </div>
        </FormSection>
    </>)
}