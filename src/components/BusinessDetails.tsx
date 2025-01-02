import FormSection from "./FormSection";

export default function BusinessDetails() {
    return (
        <FormSection title="Business Details">
            <div>
                <div className="mb-3">
                    <label className="form-label required">Business Name:</label>
                    <input type="text" className="form-control" name="business_name" required />
                </div>
                <div className="mb-3">
                    <label className="form-label required">Street Address:</label>
                    <input type="text" className="form-control" name="street_address" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Suite Number:</label>
                    <input type="text" className="form-control" name="suite_no" />
                </div>
                <div className="mb-3">
                    <label className="form-label required">City:</label>
                    <input type="text" className="form-control" name="city" required />
                </div>
                <div className="mb-3">
                    <label className="form-label required">Zip:</label>
                    <input type="text" className="form-control" name="zip" required />
                </div>
                <div className="mb-3">
                    <label className="form-label required">Main Phone Number:</label>
                    <input type="tel" className="form-control" name="main_phone_number" required />
                </div>
                <div className="mb-3">
                    <label className="form-label required">Email Address:</label>
                    <input type="email" className="form-control" name="email_address" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Principal Business Activity:</label>
                    <input type="text" className="form-control" name="business_activity" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Hours of Operations:</label>
                    <input type="text" className="form-control" name="hours_of_operation" />
                </div>
            </div>
        </FormSection>
    )
}