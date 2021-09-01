import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import HomeComponent from './pages/HomeComponent'
import { PrivateRouteNew } from "./utils/PrivateRouteNew"
import CompanyComponent from './pages/CompanyComponent';
import CompanyDetailsComponent from './pages/CompanyDetailsComponent';
import CompanyAddBankComponent from './pages/CompanyAddBankComponent';
import CompanyEditBankComponent from './pages/CompanyEditBankComponent';
import MedicineAddComponent from './pages/MedicineAddComponent';
import MedicineManageComponent from './pages/MedicineManageComponent';
import CompanyAccountComponent from "./pages/CompanyAccountComponent";
import EmployeeComponent from "./pages/EmployeeComponent";
import EmployeeDetailsComponent from "./pages/EmployeeDetailsComponent";
import BillGenerateComponent from "./pages/BillGenerateComponent";
import CustomerRequestComponent from "./pages/CustomerRequestComponent";
import LogoutComponent from './pages/LogoutComponent';
import Config from './utils/Config';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route
        exact
        path={Config.logoutPageUrl}
        component={LogoutComponent}
      ></Route>
      <PrivateRouteNew
        exact
        path="/home"
        activepage="0"
        page={HomeComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/company"
        page={CompanyComponent}
        activepage="1"
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/companydetails/:id"
        page={CompanyDetailsComponent}
        activepage="1"
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/addCompanyBank/:id"
        page={CompanyAddBankComponent}
        activepage="1"
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/editcompanybank/:company_id/:id"
        activepage="1"
        page={CompanyEditBankComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/addMedicine"
        activepage="2"
        page={MedicineAddComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/manageMedicine"
        activepage="3"
        page={MedicineManageComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/manageCompanyAccount"
        activepage="4"
        page={CompanyAccountComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/employeeManage"
        activepage="5"
        page={EmployeeComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/employeedetails/:id"
        activepage="5"
        page={EmployeeDetailsComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/generateBill"
        activepage="6"
        page={BillGenerateComponent}
      ></PrivateRouteNew>
      <PrivateRouteNew
        exact
        path="/customerRequest"
        activepage="7"
        page={CustomerRequestComponent}
      ></PrivateRouteNew>
    </Switch>
  </Router>,
  document.getElementById('root')
);
