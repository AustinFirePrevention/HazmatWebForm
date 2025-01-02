export function PermitDetailsPreamble() {
    return (<>
        <div className="alert alert-info">
            Payments are processed through the Austin Build + Connect (AB+C) online customer portal.&nbsp;
            <strong>Register at the </strong>
            <strong>
                <a title="AB+C Registration Link" href="https://abc.austintexas.gov/citizenportal/app/register" target="_blank" rel="noopener">
                    Austin Build + Connect
                </a> website to proceed.&nbsp;
            </strong>
        </div>
        <div className="alert alert-warning">
            Bills are not added to the account automatically, bills will be added manually after the application is reviewed and approved. An e-mail will be sent to the address associated with the account when the fees are ready to be paid.
        </div>
        <div className="alert alert-danger">
            <strong>Do not send applications and payment by mail.</strong>
        </div></>
    );
}