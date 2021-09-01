import React from 'react'
import APIHandler from "../utils/APIHandler";

class CustomerRequestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.completeCustomerRequestDetails = this.completeCustomerRequestDetails.bind(
            this
        );
        this.formRef = React.createRef();
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        customerRequestDataList: [],
        dataLoaded: false,
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCustomerRequestData(
            event.target.name.value,
            event.target.phone.value,
            event.target.medicine_details.value,
            event.target.prescription.files[0]
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
        this.fetchCustomerRequestData();
        this.formRef.current.reset();
    }

    //This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchCustomerRequestData();
    }

    async fetchCustomerRequestData() {
        var apihandler = new APIHandler();
        var customerRequestData = await apihandler.fetchAllCustomerRequest();
        console.log(customerRequestData);
        this.setState({ customerRequestDataList: customerRequestData.data.data });
        this.setState({ dataLoaded: true });
    }

    async completeCustomerRequestDetails(
        customer_id,
        name,
        phone,
        medicine_details
    ) {
        console.log(customer_id);
        var apihandler = new APIHandler();
        var customerRequestData = await apihandler.updateCustomerRequest(
            customer_id,
            name,
            phone,
            medicine_details
        );
        console.log(customerRequestData);
        this.fetchCustomerRequestData();
    }

    render() {
        return (
            < div className="main-panel" >
                <div className="content-wrapper">
                    <div className="page-header"><h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-view-list"></i></span>MANAGE CUSTOMER MEDICINE REQUEST</h3></div>
                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add CUSTOMER REQUEST</h4>
                                    <form className="forms-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter Customer Name"
                                            />
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
                                            <label htmlFor="exampleInputName1">Medicine Details</label>
                                            <input
                                                type="text"
                                                id="medicine_details"
                                                name="medicine_details"
                                                className="form-control"
                                                placeholder="Enter Medicine Details"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_address">Prescription</label>
                                            <div className="form-line">
                                                <input
                                                    type="file"
                                                    id="prescription"
                                                    name="prescription"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Add Customer Request"
                                                : "Adding Customer Request Please Wait.."}
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
                                <h4 className="card-title">All Customer Medicine Request</h4>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>NAME</th>
                                            <th>Phone</th>
                                            <th>Medicine Details</th>
                                            <th>PRESCRIPTION</th>
                                            <th>Status</th>
                                            <th>Added On</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.customerRequestDataList.map(
                                            (CustomerRequest) => (
                                                <tr key={CustomerRequest.id}>
                                                    <td>{CustomerRequest.id}</td>
                                                    <td>{CustomerRequest.customer_name}</td>
                                                    <td>{CustomerRequest.phone}</td>
                                                    <td>{CustomerRequest.medicine_details}</td>
                                                    <td>
                                                        {CustomerRequest.prescription == null ? (
                                                            ""
                                                        ) : (
                                                            <img
                                                                src={CustomerRequest.prescription}
                                                                style={{ width: 100, height: 100 }}
                                                            />
                                                        )}
                                                    </td>
                                                    <td>
                                                        {CustomerRequest.status == 0
                                                            ? "Pending"
                                                            : "Completed"}
                                                    </td>
                                                    <td>
                                                        {new Date(
                                                            CustomerRequest.added_on
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td>
                                                        {CustomerRequest.status == 0 ? (
                                                            <button
                                                                className="btn btn-block btn-warning"
                                                                onClick={() =>
                                                                    this.completeCustomerRequestDetails(
                                                                        CustomerRequest.id,
                                                                        CustomerRequest.customer_name,
                                                                        CustomerRequest.phone,
                                                                        CustomerRequest.medicine_details
                                                                    )
                                                                }
                                                            >
                                                                COMPLETE?
                                                            </button>
                                                        ) : (
                                                            <button className="btn btn-block btn-success">
                                                                COMPLETED
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
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

export default CustomerRequestComponent
