import { useTranslation } from 'react-i18next';

export function NavBar() {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="navbar sticky-top border-bottom bg-body border-3">
            <div className="container-fluid">
                <a className="navbar-brand mb-0 h1 fs-1" href="https://www.austintexas.gov/department/fire">
                    <img src="/HazmatWebForm/COA-Icon-Official-CMYK.png" alt="Logo" width="30" height="30" className="d-inline-block align-text me-3 logo" />
                    {t('navbar.title')}
                </a>
                <div className="d-flex flex-column align-items-end fs-4">
                    <a href="https://www.austintexas.gov/department/fire-marshals-office">{t('navbar.fire_marshal')}</a>
                    <a href="https://www.austintexas.gov/department/hazmat-permit" className="mt-2">{t('navbar.hazmat_program')}</a>
                    <div className="mt-2">
                        <button className="btn btn-link" onClick={() => changeLanguage('en')}>EN</button>
                        <button className="btn btn-link" onClick={() => changeLanguage('es')}>ES</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}