import { useTranslation } from 'react-i18next';
import FormSection from "./FormSection";
import InputMask from 'react-input-mask';

export default function BusinessDetails() {
    const { t } = useTranslation();

    return (
        <FormSection title={t("business_details.title")}>
            <div>
                <div className="mb-3">
                    <label className="form-label required">{t("business_details.business_name")}</label>
                    <input type="text" className="form-control" name="business_name" required />
                    <small className="form-text text-muted">
                        {t("business_details.business_name_note")}
                    </small>
                </div>
                <div className="mb-3">
                    <label className="form-label required">{t("business_details.street_address")}</label>
                    <input type="text" className="form-control" name="street_address" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t("business_details.suite_no")}</label>
                    <input type="text" className="form-control" name="suite_no" />
                </div>
                <div className="mb-3">
                    <label className="form-label required">{t("business_details.city")}</label>
                    <input type="text" className="form-control" name="city" required />
                </div>
                <div className="mb-3">
                    <label className="form-label required">{t("business_details.zip")}</label>
                    <input type="text" className="form-control" name="zip" required />
                </div>
                <div className="mb-3">
                    <label className="form-label required">{t("business_details.main_phone_number")}</label>
                    <InputMask mask="(999)999-9999" className="form-control" name="main_phone_number" required />
                </div>
                <div className="mb-3">
                    <label className="form-label required">{t("business_details.email_address")}</label>
                    <input type="email" className="form-control" name="email_address" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t("business_details.business_activity")}</label>
                    <input type="text" className="form-control" name="business_activity" />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t("business_details.hours_of_operation")}</label>
                    <input type="text" className="form-control" name="hours_of_operation" />
                </div>
            </div>
        </FormSection>
    )
}