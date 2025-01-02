export function NavBar() {
    return (
        <nav className="navbar sticky-top border-bottom bg-body border-3">
            <div className="container-fluid">
                <a className="navbar-brand mb-0 h1 fs-1" href="https://www.austintexas.gov/department/fire">
                    <img src="/HazmatWebForm/AFD.gif" alt="Logo" width="30" height="30" className="d-inline-block align-text me-3 logo" />
                    Austin Fire Department
                </a>
                <span className="navbar-text fs-4">
                    <a href="https://www.austintexas.gov/department/fire-marshals-office">Fire Marshal's Office</a>
                </span>
            </div>
        </nav>
    )
}