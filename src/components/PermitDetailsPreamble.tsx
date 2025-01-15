import { useTranslation, Trans } from 'react-i18next';

export function PermitDetailsPreamble() {
    const { t } = useTranslation();

    return (<>
        <div className="alert alert-info">
            <Trans i18nKey="permit_details_preamble.description">
                Payments are processed...
                <a href="https://abc.austintexas.gov/citizenportal/app/register" target="_blank" rel="noopener">
                    Austin Build + Connect
                </a>
                website to proceed...
            </Trans>
        </div>
        <div className="alert alert-warning">
            <strong>{t("permit_details_preamble.no_mail")}</strong>
        </div>
    </>);
}