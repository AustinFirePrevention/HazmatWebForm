import { useTranslation } from 'react-i18next';
import { ContactDetailsProps } from "../App";
import FormSection from './FormSection';

export function ContactDetails({ prefix, title, note, required }: ContactDetailsProps) {
    const { t } = useTranslation();
    return (
        <FormSection title={title}>
            <>
                {note && <p>{note}</p>}
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`}>{t("contact_details.name")}:</label>
                    <input type="text" className="form-control" name={`${prefix}_name`} required={required} />
                </div>
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`}>{t("contact_details.phone")}:</label>
                    <input type="tel" className="form-control" name={`${prefix}_phone`} required={required} />
                </div>
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`}>{t("contact_details.email")}:</label>
                    <input type="email" className="form-control" name={`${prefix}_email`} required={required} />
                </div>
            </>
        </FormSection>
    );
}
