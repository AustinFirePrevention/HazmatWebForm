import { useTranslation } from 'react-i18next';
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
                    <label className="form-label required">{t("permit_details.abc_id")}</label>
                    <input type="text" className="form-control" name="abc_id" required />
                    <small className="form-text text-muted">
                        {t("permit_details.abc_id_note_before_link")} <a href="https://abc.austintexas.gov">{t("permit_details.abc_id_note_link")}</a> {t("permit_details.abc_id_note_after_link")}
                    </small>
                </div>
                <div className="mb-3">
                    <label className="form-label required">{t("permit_details.abc_email")}</label>
                    <input type="email" className="form-control" name="abc_email" required />
                </div>
                <div className="mb-3">
                    <label className="form-label required">{t("permit_details.application_type")}</label>
                    <select
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
                        <label className="form-label required">{t("permit_details.building_permit")}</label>
                        <InputMask mask="99-999999-BP" className="form-control" name="building_permit" />
                    </div> :
                    <div className="mb-3">
                        <label className="form-label required">{t("permit_details.permit_number")}</label>
                        <input type="text" className="form-control" name="permit_number" required />
                    </div>
                }
            </div>
        </FormSection>
    </>)
}