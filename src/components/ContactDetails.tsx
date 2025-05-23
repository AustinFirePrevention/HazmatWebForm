import { useTranslation } from 'react-i18next';
import FormSection from './FormSection';
import InputMask from 'react-input-mask';
import { useState } from 'react';

export interface ContactDetailsProps {
    prefix: string;
    title: string;
    note?: string | JSX.Element;
    required?: boolean;
    copyFromPrimary?: boolean;
    businessPhone: string;
    setBusinessPhone: (arg0: string) => void;
    cellPhone: string;
    setCellPhone: (arg0: string) => void;
    hasBusinessName?: boolean
}

function useCopy(prefix: string, setBusinessPhone: (arg0: string) => void, setCellPhone: (arg0: string) => void){
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        const primaryName = (document.querySelector('input[name="primary_contact_name"]') as HTMLInputElement).value;
        const primaryPhone = (document.querySelector('input[name="primary_contact_business_phone"]') as HTMLInputElement).value;
        const primaryCellPhone = (document.querySelector('input[name="primary_contact_cell_phone"]') as HTMLInputElement).value;
        const primaryEmail = (document.querySelector('input[name="primary_contact_email"]') as HTMLInputElement).value;

        const nameInput = document.querySelector(`input[name="${prefix}_name"]`) as HTMLInputElement;
        const emailInput = document.querySelector(`input[name="${prefix}_email"]`) as HTMLInputElement;

        if (!isCopied) {
            nameInput.value = primaryName;
            setBusinessPhone(primaryPhone);
            setCellPhone(primaryCellPhone);
            emailInput.value = primaryEmail;
        } else {
            nameInput.value = '';
            setBusinessPhone('');
            setCellPhone('');
            emailInput.value = '';
        }

        setIsCopied(!isCopied);
    };

    return {isCopied, handleCopy}
}

export function ContactDetails({ prefix, title, note, required, copyFromPrimary, businessPhone, setBusinessPhone, cellPhone, setCellPhone, hasBusinessName }: ContactDetailsProps) {
    const { t } = useTranslation();
    const {isCopied, handleCopy} = useCopy(prefix, setBusinessPhone, setCellPhone);

    return (
        <FormSection title={title}>
            <>
                {note && (typeof note === 'string' ? <p>{note}</p> : note)}
                {hasBusinessName && (
                    <div className="mb-3">
                        <label className='form-label' htmlFor={`${prefix}_business_name`}>{t("contact_details.business_name")}:</label>
                        <input type="text" className='form-control' name={`${prefix}_business_name`} id={`${prefix}_business_name`}/>
                    </div>
                )}
                {copyFromPrimary && (
                    <button type="button" className="btn btn-secondary mb-3" onClick={handleCopy}>
                        {isCopied ? t("responsible_official.clear_primary_contact") : t("responsible_official.copy_primary_contact")}
                    </button>
                )}
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`} htmlFor={`${prefix}_title`}>{t("contact_details.title")}:</label>
                    <input type="text" className='form-control' name={`${prefix}_title`} id={`${prefix}_title`} required={required} readOnly={isCopied}/>
                </div>
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`} htmlFor={`${prefix}_name`}>{t("contact_details.name")}:</label>
                    <input type="text" className="form-control" name={`${prefix}_name`} id={`${prefix}_name`} required={required} readOnly={isCopied} />
                </div>
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`} htmlFor={`${prefix}_business_phone`}>{t("contact_details.phone")}:</label>
                    <InputMask
                        mask="(999)999-9999"
                        className="form-control"
                        name={`${prefix}_business_phone`}
                        id={`${prefix}_business_phone`}
                        required={required}
                        readOnly={isCopied}
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label' htmlFor={`${prefix}_cell_phone`}>{t("contact_details.cell_phone")}:</label>
                    <InputMask
                        mask="(999)999-9999"
                        className="form-control"
                        name={`${prefix}_cell_phone`}
                        id={`${prefix}_cell_phone`}
                        readOnly={isCopied}
                        value={cellPhone}
                        onChange={(e) => setCellPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className={`form-label${required ? ' required' : ''}`} htmlFor={`${prefix}_email`}>{t("contact_details.email")}:</label>
                    <input type="email" className="form-control" name={`${prefix}_email`} id={`${prefix}_email`} required={required} readOnly={isCopied} />
                </div>
            </>
        </FormSection>
    );
}
