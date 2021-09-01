import React from 'react'
import APIHandler from "../utils/APIHandler";

class EmployeeDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.formSubmitSalary = this.formSubmitSalary.bind(this);
        this.formSubmitBank = this.formSubmitBank.bind(this);
    }
    state = {
        errorRes: false,
        errorResSalary: false,
        errorResBank: false,
        errorMessage: "",
        errorMessageSalary: "",
        errorMessageBank: "",
        btnMessage: 0,
        btnMessageSalary: 0,
        btnMessageBank: 0,
        sendData: false,
        sendDataSalary: false,
        sendDataBank: false,
        employeeList: [],
        dataLoaded: false,
        address: "",
        name: "",
        phone: "",
        joining_date: "",
        employeeSalaryList: [],
        employeebankList: [],
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.editEmployeeData(
            event.target.name.value,
            event.target.joining_date.value,
            event.target.phone.value,
            event.target.address.value,
            this.props.match.params.id
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
        this.fetchEmployeeDataByID();
    }

    async fetchEmployeeDataByID() {
        this.updateDataAgain();
    }

    async formSubmitSalary(event) {
        event.preventDefault();
        this.setState({ btnMessageSalary: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.AddEmployeeSalaryData(
            event.target.salary_date.value,
            event.target.salary_amount.value,
            this.props.match.params.id
        );
        console.log(response);
        this.setState({ btnMessageSalary: 0 });
        this.setState({ errorResSalary: response.data.error });
        this.setState({ errorMessageSalary: response.data.message });
        this.setState({ sendDataSalary: true });
        this.updateDataAgain();
    }

    async updateDataAgain() {
        var apihandler = new APIHandler();
        var employeeData = await apihandler.fetchEmployeeById(
            this.props.match.params.id
        );

        var employeeSalary = await apihandler.fetchSalaryEmployee(
            this.props.match.params.id
        );

        var employeeBank = await apihandler.fetchBankEmployee(
            this.props.match.params.id
        );

        console.log(employeeSalary);
        this.setState({ name: employeeData.data.data.name });
        this.setState({ phone: employeeData.data.data.phone });
        this.setState({ joining_date: employeeData.data.data.joining_date });
        this.setState({ address: employeeData.data.data.address });
        this.setState({ employeeSalaryList: employeeSalary.data });
        this.setState({ employeebankList: employeeBank.data });
        //this.setState({ employeeList: employeeDataList.data.data });
        this.setState({ dataLoaded: true });
    }

    async formSubmitBank(event) {
        event.preventDefault();
        this.setState({ btnMessageBank: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.AddEmployeeBankData(
            event.target.bank_account_no.value,
            event.target.ifsc_no.value,
            this.props.match.params.id
        );
        console.log(response);
        this.setState({ btnMessageBank: 0 });
        this.setState({ errorResBank: response.data.error });
        this.setState({ errorMessageBank: response.data.message });
        this.setState({ sendDataBank: true });
        this.updateDataAgain();
    }
    render() {
        return (
            < div className="main-panel" >
                <div className="content-wrapper">
                    <div className="page-header"><h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-view-list"></i></span>Edit Employee #{this.props.match.params.id}</h3></div>
                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Edit Employee</h4>
                                    <form className="forms-sample" onSubmit={this.formSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter Name"
                                                defaultValue={this.state.name}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_address">Joining Date</label>
                                            <div className="form-line">
                                                <input
                                                    type="date"
                                                    id="joining_date"
                                                    name="joining_date"
                                                    className="form-control"
                                                    placeholder="Enter Joining Date"
                                                    defaultValue={this.state.joining_date}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Phone</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Enter Phone"
                                                defaultValue={this.state.phone}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className="form-control"
                                                placeholder="Enter Phone"
                                                defaultValue={this.state.address}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Add Employee"
                                                : "Adding Employee Please Wait.."}
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
                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">ADD Employee Salary</h4>
                                    <form className="forms-sample" onSubmit={this.formSubmitSalary}>
                                        <div className="form-group">
                                            <label htmlFor="email_address">Salary Date</label>
                                            <div className="form-line">
                                                <input
                                                    type="date"
                                                    id="salary_date"
                                                    name="salary_date"
                                                    className="form-control"
                                                    placeholder="Enter Salary Date"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Salary Amount</label>
                                            <input
                                                type="text"
                                                id="salary_amount"
                                                name="salary_amount"
                                                className="form-control"
                                                placeholder="Enter Salary Amount"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Add Employee Salary"
                                                : "Adding Employee Salary Please Wait.."}
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
                                <h4 className="card-title">Employee Salary</h4>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Salary Date</th>
                                            <th>Salary Amount</th>
                                            <th>Added On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.employeeSalaryList.map((salary) => (
                                            <tr key={salary.id}>
                                                <td>{salary.id}</td>
                                                <td>{salary.salary_date}</td>
                                                <td>{salary.salary_amount}</td>
                                                <td>{new Date(salary.added_on).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">ADD Employee Bank</h4>
                                    <form className="forms-sample" onSubmit={this.formSubmitBank}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Account No.</label>
                                            <input
                                                type="text"
                                                id="bank_account_no"
                                                name="bank_account_no"
                                                className="form-control"
                                                placeholder="Enter Account No."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">IFSC Code.</label>
                                            <input
                                                type="text"
                                                id="ifsc_no"
                                                name="ifsc_no"
                                                className="form-control"
                                                placeholder="Enter IFSC Code."
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Add Employee Bank"
                                                : "Adding Employee Bank Please Wait.."}
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
                                <h4 className="card-title">Employee Bank</h4>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Account No</th>
                                            <th>IFSC Code</th>
                                            <th>Added On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.employeebankList.map((bankdetails) => (
                                            <tr key={bankdetails.id}>
                                                <td>{bankdetails.id}</td>
                                                <td>{bankdetails.bank_account_no}</td>
                                                <td>{bankdetails.ifsc_no}</td>
                                                <td>
                                                    {new Date(bankdetails.added_on).toLocaleString()}
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

export default EmployeeDetailsComponent
