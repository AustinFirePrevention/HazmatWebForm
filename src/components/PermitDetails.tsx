import FormSection from './FormSection';

export default function PermitDetails() {

    return (<>
        <FormSection title="Permit Details">
            <div>
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
                    <input type="text" className="form-control" name="abc_id" required  />
                    <small className="form-text text-muted">
                        To locate your Austin Build + Connect ID number, go to "My Profile" from the AB+C menu pane.
                    </small>
                </div>
                <div className="mb-3">
                    <label className="form-label">Austin Build + Connect Email:</label>
                    <input type="text" className="form-control" name="abc_email" required  />
                </div>
                <div className="mb-3">
                    <label className="form-label">Type of Application:</label>
                    <select className="form-select" name="application_type" required >
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Aboveground Hazardous Materials Permit Number:</label>
                    <input type="text" className="form-control" name="permit_number" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Building Permit Number:</label>
                    <input type="text" className="form-control" name="building_permit" required />
                </div>
            </div>
        </FormSection>

    </>)
}