import React from 'react'
import Config from "../utils/Config";
import logo from '../assets/images/logonew.svg'
import '../assets/vendors/mdi/css/materialdesignicons.min.css'
import '../assets/vendors/css/vendor.bundle.base.css'
import '../assets/css/style.css'
import AuthHandler from "../utils/AuthHandler";
import { Redirect } from 'react-router';

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    btnDisabled: true,
    loginStatus: 0,
  };
  saveInputs = (event) => {
    var key = event.target.name;
    this.setState({ [key]: event.target.value });
    if (this.state.username != "" && this.state.password != "") {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  formSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.setState({ loginStatus: 1 });
    AuthHandler.login(
      this.state.username,
      this.state.password,
      this.handleAjaxResponse
    );
  };

  handleAjaxResponse = (data) => {
    console.log(data);
    if (data.error) {
      this.setState({ loginStatus: 4 });
    } else {
      this.setState({ loginStatus: 3 });
      window.location = Config.homeUrl;
    }
  };

  getMessages = () => {
    if (this.state.loginStatus === 0) {
      return "";
    } else if (this.state.loginStatus === 1) {
      return (
        <div class="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (this.state.loginStatus === 3) {
      return (
        <div class="alert alert-success">
          <strong>Login Successfull!</strong>
        </div>
      );
    } else if (this.state.loginStatus === 4) {
      return (
        <div class="alert alert-danger">
          <strong>Invalid Login Details</strong>
        </div>
      );
    }
  };
  render() {
    if (AuthHandler.loggedIn()) {
      return <Redirect to={Config.homeUrl} />;
    }
    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="card col-lg-4 mx-auto">
                <div className=" card-body auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <img src={logo} alt="logo" />
                  </div>
                  <div className="page-header">
                    <h3 className="page-title">Login</h3>
                  </div>
                  <form className="forms-sample" method="POST" onSubmit={this.formSubmit}>
                    <div className="form-group">
                      <label for="exampleInputUsername1">Username</label>
                      <input type="text" className="form-control" id="exampleInputUsername1" name="username" placeholder="Username" required autofocus onChange={this.saveInputs} />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" required autofocus onChange={this.saveInputs} />
                    </div>
                    <div className="mt-3">
                      <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" disabled={this.state.btnDisabled}>SIGN IN</button>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" />
                          <i className="input-helper"></i>
                          Keep me signed in
                        </label>
                      </div>
                      <a href="!#" className="auth-link text-black">Forgot password?</a>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      <a href="sign-up.html">Don't have an account?</a>
                    </div>
                    <div className="col-xs-12">{this.getMessages()}</div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
