import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooks";
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security, useOktaAuth } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import { ReviewListPage } from "./layouts/BookCheckoutPage/ReviewListPage/ReviewListPage";
const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const navigate = useNavigate();

  const customAuthHendler = () => {
    navigate("/login");
  };

  const restore = async (_oktaAuth: any, originalUrl: any) => {
    navigate(toRelativeUrl(originalUrl || "/", window.location.origin), {
      replace: true,
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restore}
        onAuthRequired={customAuthHendler}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/search" element={<SearchBooksPage />}></Route>
            <Route
              path="/reviewList/:bookId"
              element={<ReviewListPage />}
            ></Route>
            <Route
              path="/checkout/:bookId"
              element={<BookCheckoutPage />}
            ></Route>
            <Route
              path="/login"
              element={<LoginWidget config={oktaAuth} />}
            ></Route>
            <Route path="/login/callback" Component={LoginCallback} />
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

export default App;
