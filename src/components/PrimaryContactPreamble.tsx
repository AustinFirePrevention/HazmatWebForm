import { useTranslation } from 'react-i18next';

export function PrimaryContactPreamble() {
    const { t } = useTranslation();

    return (<>
        <div className='alert alert-info'>{t("primary_contact.note")}</div>
        <div className="alert alert-warning">
            {t("primary_contact.preamble")}
        </div>
    </>

    );
}
