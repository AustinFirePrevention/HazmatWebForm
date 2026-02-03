import { useTranslation } from 'react-i18next';
import FormSection from "./FormSection";
import InputMask from 'react-input-mask';

type BusinessDetailsProps = { phone: string, setPhone: (arg0: string) => void, setIsThirdParty: (arg0: boolean) => void };


export default function BusinessDetails({ phone, setPhone, setIsThirdParty }: BusinessDetailsProps) {
    const { t } = useTranslation();


    return (
        <FormSection title={t("business_details.title")}>
            <div>
                <div className="mb-3">
                    <label htmlFor='business_name' className="form-label required">{t("business_details.business_name")}</label>
                    <input id='business_name' type="text" className="form-control" name="business_name" required />
                    <small className="form-text text-muted">
                        {t("business_details.business_name_note")}
                    </small>
                </div>
                <div className="mb-3">
                    <label htmlFor='street_address' className="form-label required">{t("business_details.street_address")}</label>
                    <input id='street_address' type="text" className="form-control" name="street_address" required />
                </div>
                <div className="mb-3">
                    <label htmlFor='suite_no' className="form-label">{t("business_details.suite_no")}</label>
                    <input id='suite_no' type="text" className="form-control" name="suite_no" />
                </div>
                <div className="mb-3">
                    <label htmlFor='city' className="form-label required">{t("business_details.city")}</label>
                    <input id="city" type="text" className="form-control" name="city" required />
                </div>
                <div className="mb-3">
                    <label htmlFor='zip' className="form-label required">{t("business_details.zip")}</label>
                    <InputMask id='zip' mask="99999" maskChar="_" className="form-control" name="zip" required />
                </div>
                <div className="mb-3">
                    <label htmlFor='main_phone_number' className="form-label required">{t("business_details.main_phone_number")}</label>
                    <InputMask
                        id='main_phone_number'
                        mask="(999)999-9999"
                        className="form-control"
                        name="main_phone_number"
                        required value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor='email_address' className="form-label required">{t("business_details.email_address")}</label>
                    <input id='email_address' type="email" className="form-control" name="email_address" required />
                </div>
                <div className="mb-3">
                    <label htmlFor='business_activity' className="form-label required">{t("business_details.business_activity")}</label>
                    <input id='business_activity' type="text" className="form-control" name="business_activity" required />
                    <small className="form-text text-muted">{t("business_details.business_activity_note")}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor='hours_of_operations' className="form-label required">{t("business_details.hours_of_operation")}</label>
                    <input id='hours_of_operations' type="text" className="form-control" name="hours_of_operation" required />
                </div>
                <div className="mb-3">
                    <label htmlFor='total_employees' className="form-label required">{t("business_details.total_employees")}</label>
                    <input id='total_employees' type="text" className="form-control" name="total_employees" pattern="[0-9]{1,99999}" required />
                </div>
                <div className="mb-3">
                    <label htmlFor='number_of_ERT' className="form-label">{t("business_details.number_of_ERT")}</label>
                    <input
                        id='number_of_ERT'
                        type="text"
                        className="form-control"
                        name="number_of_ERT"
                    />
                    <small className="form-text text-muted">{t("business_details.number_of_ERT_note")}</small>
                </div>
            </div>
            <div className="section mb-4">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isThirdParty"
              name="is_third_party"
              onChange={(e) => setIsThirdParty(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isThirdParty">
              {t("requesting_party.checkbox_label", "I am a third party requesting this application on behalf of the business")}
            </label>
          </div>
        </div>
        </FormSection>
    )
}
