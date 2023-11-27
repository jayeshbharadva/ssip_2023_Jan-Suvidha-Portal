import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import SchemesTable from "./components/SchemeTable";
import StickyNavbar from "./components/StickyNavbar";
import MainBody from "./components/MainBody";
import About from "./components/AboutUs";
import AadharVerification from "./components/AadharVerification.component";
import FormComponent from "./components/DocumentUpload.component";
import GovLogin from "./components/GovLogin";
import Table from "./components/GovernmentSchemeList";
import Verification from "./components/UserLogin";
import Userschemelist from "./components/UserschemeList";
import Listofuser from "./components/GovListofUser";
import UserDetail from "./components/UserDetail";
import Form from "./components/govschemegeneration";
import New from "./components/New.component";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <StickyNavbar />
            <MainBody />
            <SchemesTable />
            <About />
            <Footer />
          </>
        }
      />
      <Route
        path="/AadharVerification/:schemeId"
        element={
          <>
            <AadharVerification />
          </>
        }
      />
      <Route
        path="/documentupload"
        element={
          <>
            <FormComponent />
          </>
        }
      />
      <Route
        path="/organiztionlogin"
        element={
          <>
            <GovLogin />
          </>
        }
      />

      <Route
        path="/listscheme"
        element={
          <>
            <Table />
          </>
        }
      />

      <Route
        path="/citizenlogin"
        element={
          <>
            <Verification />
          </>
        }
      />
      <Route
        path="/Userschemelist"
        element={
          <>
            <Userschemelist />
          </>
        }
      />

      <Route
        path="/showapplicant/:schemeid"
        element={
          <>
            <Listofuser />
          </>
        }
      />

      <Route
        path="/showapplication/:aadhar"
        element={
          <>
            <UserDetail />
          </>
        }
      />

      <Route
        path="/addscheme"
        element={
          <>
            <Form />
          </>
        }
      />
      <Route
        path="/newcom"
        element={
          <>
            <New />
          </>
        }
      />
    </Routes>
  );
}

export default App;
