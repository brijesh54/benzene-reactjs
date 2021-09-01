import React from 'react'
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";

class MedicineAddComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        companylist: [],
        medicinedetails: [
            { salt_name: "", salt_qty: "", salt_qty_type: "", description: "" },
        ],
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.saveMedicineData(
            event.target.name.value,
            event.target.medical_typ.value,
            event.target.buy_price.value,
            event.target.sell_price.value,
            event.target.c_gst.value,
            event.target.s_gst.value,
            event.target.batch_no.value,
            event.target.shelf_no.value,
            event.target.expire_date.value,
            event.target.mfg_date.value,
            event.target.company_id.value,
            event.target.description1.value,
            event.target.in_stock_total.value,
            event.target.qty_in_strip.value,
            this.state.medicinedetails
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    componentDidMount() {
        this.LoadCompany();
    }

    async LoadCompany() {
        var apihandler = new APIHandler();
        var companydata = await apihandler.fetchCompanyOnly();
        this.setState({ companylist: companydata.data });
    }

    RemoveItems = () => {
        if (this.state.medicinedetails.length != 1) {
            this.state.medicinedetails.pop(this.state.medicinedetails.length - 1);
        }
        this.setState({});
    };

    handleInput = (event) => {
        var keyname = event.target.name;
        var value = event.target.value;
        var index = event.target.getAttribute("data-index");
        this.state.medicinedetails[index][keyname] = value;
        this.setState({});
        console.log(this.state.medicinedetails);
    };

    AddItem = () => {
        var item = {
            salt_name: "",
            salt_qty: "",
            salt_qty_type: "",
            description: "",
        };

        this.state.medicinedetails.push(item);
        this.setState({});
    };

    render() {
        return (
            < div className="main-panel" >
                <div className="content-wrapper">
                    <div className="page-header"><h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-view-list"></i></span> MANAGE MEDICINE</h3></div>
                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add Medicine</h4>
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
                                            <label htmlFor="exampleInputName1">Medicine Type</label>
                                            <input
                                                type="text"
                                                id="medical_typ"
                                                name="medical_typ"
                                                className="form-control"
                                                placeholder="Enter Medicine Type"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Buy Price</label>
                                            <input
                                                type="text"
                                                id="buy_price"
                                                name="buy_price"
                                                className="form-control"
                                                placeholder="Enter Buy Price"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Sell Price</label>
                                            <input
                                                type="text"
                                                id="sell_price"
                                                name="sell_price"
                                                className="form-control"
                                                placeholder="Enter Sell Price"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">C GST</label>
                                            <input
                                                type="text"
                                                id="c_gst"
                                                name="c_gst"
                                                className="form-control"
                                                placeholder="Enter C-GST"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">S GST</label>
                                            <input
                                                type="text"
                                                id="s_gst"
                                                name="s_gst"
                                                className="form-control"
                                                placeholder="Enter S-GST"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Batch No.</label>
                                            <input
                                                type="text"
                                                id="batch_no"
                                                name="batch_no"
                                                className="form-control"
                                                placeholder="Enter Batch No"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Shelf No.</label>
                                            <input
                                                type="text"
                                                id="shelf_no"
                                                name="shelf_no"
                                                className="form-control"
                                                placeholder="Enter Shelf No"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_address">Expire Date</label>
                                            <div className="form-line">
                                                <input
                                                    type="date"
                                                    id="expire_date"
                                                    name="expire_date"
                                                    className="form-control"
                                                    placeholder="Enter Expire Date"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email_address">Mfg Date</label>
                                            <div className="form-line">
                                                <input
                                                    type="date"
                                                    id="mfg_date"
                                                    name="mfg_date"
                                                    className="form-control"
                                                    placeholder="Enter Mfg Date"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Description.</label>
                                            <input
                                                type="text"
                                                id="description1"
                                                name="description1"
                                                className="form-control"
                                                placeholder="Enter Description"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">In Stock Total</label>
                                            <input
                                                type="text"
                                                id="in_stock_total"
                                                name="in_stock_total"
                                                className="form-control"
                                                placeholder="Enter Description"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Qty. in Strip</label>
                                            <input
                                                type="text"
                                                id="qty_in_strip"
                                                name="qty_in_strip"
                                                className="form-control"
                                                placeholder="Enter Description"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Company.</label>
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
                                        <div className="form-group">
                                            <div className="col-lg-6">
                                                <button
                                                    className="btn btn-inverse-success btn-fw"
                                                    onClick={this.AddItem}
                                                    type="button"
                                                >
                                                    Add Details
                                                </button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button
                                                    className="btn btn-inverse-danger btn-fw"
                                                    style={{ margin: "-64px 0px 0px 200px" }}
                                                    type="button"
                                                    onClick={this.RemoveItems}
                                                >
                                                    Remove Details
                                                </button>
                                            </div>
                                        </div>
                                        {this.state.medicinedetails.map((item, index) => (
                                            <div className="form-group row" key={index}>
                                                <div className="col-lg-3">
                                                    <label htmlFor="email_address">Salt Name</label>
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="salt_name"
                                                            name="salt_name"
                                                            className="form-control"
                                                            placeholder="Enter Salt name"
                                                            onChange={this.handleInput}
                                                            data-index={index}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <label htmlFor="email_address">Salt Qty</label>
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="salt_qty"
                                                            name="salt_qty"
                                                            className="form-control"
                                                            placeholder="Enter Salt Qty"
                                                            onChange={this.handleInput}
                                                            data-index={index}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <label htmlFor="email_address">Salt Qty Type</label>
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="salt_qty_type"
                                                            name="salt_qty_type"
                                                            className="form-control"
                                                            placeholder="Enter Salt Qty Type"
                                                            onChange={this.handleInput}
                                                            data-index={index}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <label htmlFor="email_address">Description</label>
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="description"
                                                            name="description"
                                                            className="form-control"
                                                            placeholder="Enter Description"
                                                            onChange={this.handleInput}
                                                            data-index={index}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Add Medicine"
                                                : "Adding Medicine Please Wait.."}
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
                </div>
            </div>
        );
    }
}

export default MedicineAddComponent
