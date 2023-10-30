import { useOktaAuth } from "@okta/okta-react";
import { NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  if (!authState) {
    return <SpinnerLoading />;
  }
  const handleLogout = async () => oktaAuth.signOut();
  console.log(authState);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">księgarnia</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-targer="#navbarNavDropdown"
          aria-aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              {" "}
              <NavLink className="nav-link" to="/">
                Start
              </NavLink>
            </li>
            <li className="nav-item">
              {" "}
              <NavLink className="nav-link" to="search">
                Znajdz książkę
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ? (
              <li className="nav-item m-1">
                <NavLink
                  type="butoon"
                  className="btn btn-outline-light"
                  to="/login"
                >
                  Zaloguj Sie
                </NavLink>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Wyloguj
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
