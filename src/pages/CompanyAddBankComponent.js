import React from 'react'
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";

class CompanyAddBankComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formsubmit = this.formsubmit.bind(this);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
    };
    async formsubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCompanyBankData(
            event.target.bank_account_no.value,
            event.target.ifsc_no.value,
            this.props.match.params.id
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    render() {
        return (
            < div className="main-panel" >
                <div className="content-wrapper">
                    <div className="page-header"><h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-view-list"></i></span> MANAGE COMPANY</h3></div>
                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add Company Bank #{this.props.match.params.id}</h4>
                                    <form className="forms-sample" onSubmit={this.formsubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Account No</label>
                                            <input
                                                type="text"
                                                id="bank_account_no"
                                                name="bank_account_no"
                                                className="form-control"
                                                id="exampleInputName1"
                                                placeholder="Enter Company Account No"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">IFSC No.</label>
                                            <input
                                                type="text"
                                                id="ifsc_no"
                                                name="ifsc_no"
                                                className="form-control"
                                                id="exampleInputName1"
                                                placeholder="Enter Company IFSC No."
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Add Company"
                                                : "Adding Company Bank Details Please Wait.."}
                                        </button>
                                        <br />
                                        {this.state.errorRes == false &&
                                            this.state.sendData == true ? (
                                            <div className="alert alert-success">
                                                <strong>Success!</strong> {this.state.errorMessage}.
                                                <Link
                                                    to={"/companydetails/" + this.props.match.params.id}
                                                    className="btn btn-info"
                                                >
                                                    Back to Company Details
                                                </Link>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {this.state.errorRes == true &&
                                            this.state.sendData == true ? (
                                            <div className="alert alert-danger">
                                                <strong>Failed!</strong>
                                                {this.state.errorMessage}.
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyAddBankComponent
