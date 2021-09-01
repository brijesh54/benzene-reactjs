import React from 'react'
import APIHandler from "../utils/APIHandler";

class CompanyDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        console.log(props.match.params.id);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        companyBank: [],
        name: "",
        license_no: "",
        address: "",
        contact_no: "",
        email: "",
        description: "",
        dataLoaded: false,
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.editCompanyData(
            event.target.name.value,
            event.target.license_no.value,
            event.target.address.value,
            event.target.contact_no.value,
            event.target.email.value,
            event.target.description.value,
            this.props.match.params.id
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    //This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchCompanyData();
    }

    async fetchCompanyData() {
        var apihandler = new APIHandler();
        var companydata = await apihandler.fetchCompanyDetails(
            this.props.match.params.id
        );
        console.log(companydata);
        this.setState({ companyBank: companydata.data.data.company_bank });
        this.setState({ name: companydata.data.data.name });
        this.setState({ license_no: companydata.data.data.license_no });
        this.setState({ address: companydata.data.data.address });
        this.setState({ contact_no: companydata.data.data.contact_no });
        this.setState({ email: companydata.data.data.email });
        this.setState({ description: companydata.data.data.description });
        this.setState({ dataLoaded: true });
    }

    viewCompanyDetails = (company_id) => {
        console.log(company_id);
        console.log(this.props);
    };

    AddCompanyBank = () => {
        this.props.history.push("/addCompanyBank/" + this.props.match.params.id);
    };

    EditCompanyBank = (company_bank_id) => {
        console.log(company_bank_id);
        this.props.history.push(
            "/editcompanybank/" + this.props.match.params.id + "/" + company_bank_id
        );
    };
    render() {
        return (
            < div className="main-panel" >
                <div className="content-wrapper">
                    <div className="page-header"><h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-view-list"></i></span> MANAGE COMPANY</h3></div>
                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Edit Company</h4>
                                    <form className="forms-sample" onSubmit={this.formsubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter Company Name"
                                                defaultValue={this.state.name}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">License No.</label>
                                            <input
                                                type="text"
                                                id="license_no"
                                                name="license_no"
                                                className="form-control"
                                                placeholder="Enter Company License No."
                                                defaultValue={this.state.license_no}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className="form-control"
                                                defaultValue={this.state.address}
                                                placeholder="Enter Company Address"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Contact No.</label>
                                            <input
                                                type="text"
                                                id="contact_no"
                                                name="contact_no"
                                                className="form-control"
                                                placeholder="Enter Company Contact No."
                                                defaultValue={this.state.contact_no}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Email Address</label>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                defaultValue={this.state.email}
                                                placeholder="Enter Company Email Address"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Description</label>
                                            <input
                                                type="text"
                                                id="description"
                                                name="description"
                                                className="form-control"
                                                defaultValue={this.state.description}
                                                placeholder="Enter Company Description"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-dark btn-icon-text"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Edit Company"
                                                : "Editing Company Please Wait.."}
                                        </button>
                                        <br />
                                        {this.state.errorRes == false &&
                                            this.state.sendData == true ? (
                                            <div className="alert alert-success">
                                                <strong>Success!</strong> {this.state.errorMessage}.
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
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="header">
                                    {this.state.dataLoaded == false ? (
                                        <div className="text-center">
                                            <div class="preloader pl-size-xl">
                                                <div class="spinner-layer">
                                                    <div class="circle-clipper left">
                                                        <div class="circle"></div>
                                                    </div>
                                                    <div class="circle-clipper right">
                                                        <div class="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <h2>Company Bank</h2>
                                    <div className="float-right">
                                        <button
                                            className="btn btn-gradient-dark btn-rounded btn-fw"
                                            onClick={this.AddCompanyBank}
                                        >
                                            Add Company
                                        </button>
                                    </div>
                                </div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Account No.</th>
                                            <th>IFSC Code</th>
                                            <th>Added On</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.companyBank.map((company) => (
                                            <tr key={company.id}>
                                                <td>{company.id}</td>
                                                <td>{company.bank_account_no}</td>
                                                <td>{company.ifsc_no}</td>
                                                <td>{new Date(company.added_on).toLocaleString()}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-gradient-success btn-rounded btn-fw"
                                                        onClick={() => this.EditCompanyBank(company.id)}
                                                    >
                                                        EDIT
                                                    </button><br></br>
                                                    <br></br>
                                                    <button className="btn btn-gradient-danger btn-rounded btn-fw">
                                                        DELETE
                                                    </button>
                                                </td>
                                                <td>Test</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyDetailsComponent
