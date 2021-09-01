import React from 'react'
import APIHandler from "../utils/APIHandler";

class CompanyAccountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        companyAccountdata: [],
        dataLoaded: false,
        companylist: [],
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCompanyTransactionData(
            event.target.company_id.value,
            event.target.transaction_type.value,
            event.target.transaction_amt.value,
            event.target.transaction_date.value,
            event.target.payment_mode.value
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
        this.updateDataAgain();
    }

    //This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchCompanyAccountData();
    }

    async fetchCompanyAccountData() {
        var apihandler = new APIHandler();
        var companydata = await apihandler.fetchCompanyOnly();
        this.updateDataAgain();
        this.setState({ companylist: companydata.data });
        this.setState({ dataLoaded: true });
    }

    async updateDataAgain() {
        var apihandler = new APIHandler();
        var companyAccountdata = await apihandler.fetchAllCompanyAccount();
        this.setState({ companyAccountdata: companyAccountdata.data.data });
    }
    render() {
        return (
            < div className="main-panel" >
                <div className="content-wrapper">
                    <div className="page-header"><h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-view-list"></i></span> MANAGE COMPANY ACCOUNT</h3></div>
                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add Company Account Bill</h4>
                                    <form className="forms-sample" onSubmit={this.formSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Company</label>
                                            <div className="form-line">
                                                <select
                                                    className="form-control show-tick"
                                                    name="company_id"
                                                    id="company_id"
                                                >
                                                    {this.state.companylist.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Transaction Type</label>
                                            <div className="form-line">
                                                <select
                                                    id="transaction_type"
                                                    name="transaction_type"
                                                    className="form-control"
                                                >
                                                    <option value="1">Debit</option>
                                                    <option value="2">Credit</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Amount</label>
                                            <input
                                                type="text"
                                                id="transaction_amt"
                                                name="transaction_amt"
                                                className="form-control"
                                                id="exampleInputName1"
                                                placeholder="Enter Amount"
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
                                            <label htmlFor="email_address">Transaction Date</label>
                                            <div className="form-line">
                                                <input
                                                    type="date"
                                                    id="transaction_date"
                                                    name="transaction_date"
                                                    className="form-control"
                                                    placeholder="EnterTransaction Date"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Payment Mode</label>
                                            <input
                                                type="text"
                                                id="payment_mode"
                                                name="payment_mode"
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
                                                ? "Add Company Transaction"
                                                : "Adding Company Transaction Please Wait.."}
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
                                <h4 className="card-title">All Companies Account Transactions</h4>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Company Name</th>
                                            <th>Company ID</th>
                                            <th>Transaction Type</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Payment Mode</th>
                                            <th>Added On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.companyAccountdata.map((companyaccount) => (
                                            <tr key={companyaccount.id}>
                                                <td>{companyaccount.id}</td>
                                                <td>{companyaccount.company.name}</td>
                                                <td>{companyaccount.company.id}</td>
                                                <td>
                                                    {companyaccount.transaction_type == 1
                                                        ? "Debit"
                                                        : "Credit"}
                                                </td>
                                                <td>{companyaccount.transaction_amt}</td>
                                                <td>{companyaccount.transaction_date}</td>
                                                <td>{companyaccount.payment_mode}</td>
                                                <td>
                                                    {new Date(companyaccount.added_on).toLocaleString()}
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

export default CompanyAccountComponent
