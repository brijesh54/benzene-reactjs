import React from 'react'
import APIHandler from "../utils/APIHandler";

class EmployeeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        employeeList: [],
        dataLoaded: false,
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.saveEmployeeData(
            event.target.name.value,
            event.target.joining_date.value,
            event.target.phone.value,
            event.target.address.value
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
        this.fetchEmployeeData();
    }

    async fetchEmployeeData() {
        this.updateDataAgain();
    }

    async updateDataAgain() {
        var apihandler = new APIHandler();
        var employeeDataList = await apihandler.fetchEmployee();
        this.setState({ employeeList: employeeDataList.data.data });
        this.setState({ dataLoaded: true });
    }

    ShowEmpDetails = (eid) => {
        this.props.history.push("/employeedetails/" + eid);
    };
    render() {
        return (
            < div className="main-panel" >
                <div className="content-wrapper">
                    <div className="page-header"><h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-view-list"></i></span>MANAGE Employee</h3></div>
                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add Employee</h4>
                                    <form className="forms-sample" onSubmit={this.formSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter Name"
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
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_address">Transaction Date</label>
                                            <div className="form-line">
                                                <input
                                                    type="date"
                                                    id="transaction_date"
                                                    name="transaction_date"
                                                    className="form-control"
                                                    placeholder="Enter Transaction Date"
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
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">All Employee Data</h4>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Name</th>
                                            <th>Joining Date</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Added On</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.employeeList.map((employee) => (
                                            <tr key={employee.id}>
                                                <td>{employee.id}</td>
                                                <td>{employee.name}</td>
                                                <td>{employee.joining_date}</td>
                                                <td>{employee.phone}</td>
                                                <td>{employee.address}</td>
                                                <td>
                                                    {new Date(employee.added_on).toLocaleString()}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-gradient-info btn-rounded btn-fw"
                                                        onClick={() => this.ShowEmpDetails(employee.id)}
                                                    >
                                                        VIEW
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

export default EmployeeComponent
