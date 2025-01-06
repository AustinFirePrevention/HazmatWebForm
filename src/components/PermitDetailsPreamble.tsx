import { useTranslation } from 'react-i18next';

export function PermitDetailsPreamble() {
    const { t } = useTranslation();

    return (<>
        <div className="alert alert-info">
            {t("permit_details_preamble.info")}
            <strong>{t("permit_details_preamble.register_at")}</strong>
            <strong>
                <a title={t("permit_details_preamble.abc_registration_link")} href="https://abc.austintexas.gov/citizenportal/app/register" target="_blank" rel="noopener">
                    {t("permit_details_preamble.abc_website")}
                </a>
                {t("permit_details_preamble.to_proceed")}
            </strong>
        </div>
        <div className="alert alert-warning">
            {t("permit_details_preamble.bills_note")}
        </div>
        <div className="alert alert-danger">
            <strong>{t("permit_details_preamble.no_mail")}</strong>
        </div>
    </>);
}