import React from 'react'
import APIHandler from "../utils/APIHandler";

class CompanyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formsubmit = this.formsubmit.bind(this);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        companyDataList: [],
        dataLoaded: false,
    };
    async formsubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCompanyData(
            event.target.name.value,
            event.target.license_no.value,
            event.target.address.value,
            event.target.contact_no.value,
            event.target.email.value,
            event.target.description.value
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
        var companydata = await apihandler.fetchAllCompany();
        console.log(companydata);
        this.setState({ companyDataList: companydata.data.data });
        this.setState({ dataLoaded: true });
    }

    viewCompanyDetails = (company_id) => {
        console.log(company_id);
        console.log(this.props);
        this.props.history.push("/companydetails/" + company_id);
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
                                    <h4 className="card-title">Add Company</h4>
                                    <form className="forms-sample" onSubmit={this.formsubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                id="exampleInputName1"
                                                placeholder="Enter Company Name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">License No.</label>
                                            <input
                                                type="text"
                                                id="license_no"
                                                name="license_no"
                                                className="form-control"
                                                id="exampleInputName1"
                                                placeholder="Enter Company License No."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className="form-control"
                                                id="exampleInputName1"
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
                                                id="exampleInputName1"
                                                placeholder="Enter Company Contact No."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Email Address</label>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                id="exampleInputName1"
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
                                                id="exampleInputName1"
                                                placeholder="Enter Company Description"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Add Company"
                                                : "Adding Company Please Wait.."}
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
                                <h4 className="card-title">All Companies</h4>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>NAME</th>
                                            <th>License NO.</th>
                                            <th>Address</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <th>Description</th>
                                            <th>Added On</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.companyDataList.map((company) => (
                                            <tr key={company.id}>
                                                <td>{company.id}</td>
                                                <td>{company.name}</td>
                                                <td>{company.license_no}</td>
                                                <td>{company.address}</td>
                                                <td>{company.contact_no}</td>
                                                <td>{company.email}</td>
                                                <td>{company.description}</td>
                                                <td>{new Date(company.added_on).toLocaleString()}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-gradient-info btn-rounded btn-fw"
                                                        onClick={() =>
                                                            this.viewCompanyDetails(company.id)
                                                        }
                                                    >
                                                        View
                                                    </button>
                                                </td>
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

export default CompanyComponent
