import { useTranslation, Trans } from 'react-i18next';
import FormSection from './FormSection';
import { PermitDetailsPreamble } from './PermitDetailsPreamble';
import InputMask from 'react-input-mask';

export type ApplicationType = "new_permit" | "renewal_no_change" | "renewal_with_change";

export default function PermitDetails({ applicationType, onApplicationTypeChange }: { applicationType: ApplicationType, onApplicationTypeChange: (type: ApplicationType) => void }) {
    const { t } = useTranslation();

    return (<>
        <FormSection title={t("permit_details.title")}>
            <div>
                <PermitDetailsPreamble />
                <div className="mb-3">
                    <label htmlFor='abc_id' className="form-label required">{t("permit_details.abc_id")}</label>
                    <InputMask id='abc_id' mask="9999999" className="form-control" name="abc_id" required />
                    <small className="form-text text-muted">
                        <Trans i18nKey="permit_details.abc_id_note">
                            To locate your Austin Build + Connect ID number, log into your 
                            <a href="https://abc.austintexas.gov" target="_blank" rel="noopener noreferrer">AB+C account</a> 
                            and go to "My Profile" from the top menu pane.
                        </Trans>
                    </small>
                </div>
                <div className="mb-3">
                    <label htmlFor='abc_email' className="form-label required">{t("permit_details.abc_email")}</label>
                    <input id='abc_email' type="email" className="form-control" name="abc_email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor='application_type' className="form-label required">{t("permit_details.application_type")}</label>
                    <select
                        id='application_type'
                        className="form-select"
                        name="application_type"
                        required
                        onChange={(e) => onApplicationTypeChange(e.target.value as ApplicationType)}
                    >
                        <option value="new_permit">{t("permit_details.new_permit")}</option>
                        <option value="renewal_no_change">{t("permit_details.renewal_no_change")}</option>
                        <option value="renewal_with_change">{t("permit_details.renewal_with_change")}</option>
                    </select>
                </div>
                {applicationType === "new_permit" ?
                    <div className="mb-3">
                        <label htmlFor='building_permit' className="form-label">{t("permit_details.building_permit")}</label>
                        <InputMask id='building_permit' mask="99-999999-BP" className="form-control" name="building_permit" />
                    </div> :
                    <div className="mb-3">
                        <label htmlFor='permit_number' className="form-label required">{t("permit_details.permit_number")}</label>
                        <InputMask id='permit_number' mask="9999999" type="text" className="form-control" name="permit_number" required />
                    </div>
                }
            </div>
        </FormSection>
    </>)
}
