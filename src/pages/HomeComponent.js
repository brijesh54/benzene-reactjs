import React from 'react'
import circle from '../assets/images/dashboard/circle.svg'
import APIHandler from "../utils/APIHandler";
import CanvasJSReact from "../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef();
    }

    state = {
        customer_request: 0,
        bill_count: 0,
        medicine_count: 0,
        company_count: 0,
        employee_count: 0,
        profit_total: 0,
        sell_total: 0,
        request_pending: 0,
        request_completed: 0,
        profit_amt_today: 0,
        sell_amt_today: 0,
        medicine_expire_serializer_data: 0,
        dataPoints: [],
        profitChartOption: {},
        sellChartOption: {},
    };

    componentDidMount() {
        this.fetchHomePage();
    }

    async fetchHomePage() {
        var apihandler = new APIHandler();
        var homedata = await apihandler.fetchHomePage();
        console.log(homedata);
        this.setState({ customer_request: homedata.data.customer_request });
        this.setState({ bill_count: homedata.data.bill_count });
        this.setState({ medicine_count: homedata.data.medicine_count });
        this.setState({ company_count: homedata.data.company_count });
        this.setState({ employee_count: homedata.data.employee_count });
        this.setState({ profit_total: homedata.data.profit_total });
        this.setState({ sell_total: homedata.data.sell_total });
        this.setState({ request_pending: homedata.data.request_pending });
        this.setState({ request_completed: homedata.data.request_completed });
        this.setState({ sell_amt_today: homedata.data.sell_amt_today });
        this.setState({ profit_amt_today: homedata.data.profit_amt_today });
        this.setState({
            medicine_expire_serializer_data:
                homedata.data.medicine_expire_serializer_data,
        });

        var profitdatalist = [];
        for (var i = 0; i < homedata.data.profit_chart.length; i++) {
            profitdatalist.push({
                x: new Date(homedata.data.profit_chart[i].date),
                y: homedata.data.profit_chart[i].amt,
            });
        }
        var selldatalist = [];
        for (var i = 0; i < homedata.data.sell_chart.length; i++) {
            selldatalist.push({
                x: new Date(homedata.data.sell_chart[i].date),
                y: homedata.data.sell_chart[i].amt,
            });
        }

        this.state.profitChartOption = {
            animationEnabled: true,
            title: {
                text: "Total Profit Chart of Medicine",
            },
            axisX: {
                valueFormatString: "DD MMMM YYYY",
            },
            axisY: {
                title: "Profit ",
                prefix: "$",
            },
            data: [
                {
                    yValueFormatString: "$#,###",
                    xValueFormatString: "DD MMMM YYYY",
                    type: "spline",
                    dataPoints: profitdatalist,
                },
            ],
        };
        this.state.sellChartOption = {
            animationEnabled: true,
            title: {
                text: "Total Sell Chart of Medicine",
            },
            axisX: {
                valueFormatString: "DD MMMM YYYY",
            },
            axisY: {
                title: "Sales ",
                prefix: "$",
            },
            data: [
                {
                    yValueFormatString: "$#,###",
                    xValueFormatString: "DD MMMM YYYY",
                    type: "spline",
                    dataPoints: selldatalist,
                },
            ],
        };
        this.setState({});
    }

    render() {
        const options = {
            animationEnabled: true,
            title: {
                text: "Monthly Sales - 2017"
            },
            axisX: {
                valueFormatString: "MMM"
            },
            axisY: {
                title: "Sales (in USD)",
                prefix: "$"
            },
            data: [{
                yValueFormatString: "$#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: [
                    { x: new Date(2017, 0), y: 25060 },
                    { x: new Date(2017, 1), y: 27980 },
                    { x: new Date(2017, 2), y: 42800 },
                    { x: new Date(2017, 3), y: 32400 },
                    { x: new Date(2017, 4), y: 35260 },
                    { x: new Date(2017, 5), y: 33900 },
                    { x: new Date(2017, 6), y: 40000 },
                    { x: new Date(2017, 7), y: 52500 },
                    { x: new Date(2017, 8), y: 32300 },
                    { x: new Date(2017, 9), y: 42000 },
                    { x: new Date(2017, 10), y: 37160 },
                    { x: new Date(2017, 11), y: 38400 }
                ]
            }]
        }
        return (
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                <i className="mdi mdi-home"></i>
                            </span> Dashboard
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item active" aria-current="page">
                                    <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="row">
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-danger card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">TOTAL REQUEST<i className="mdi mdi-chart-line mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.customer_request}</h2>
                                    <h6 className="card-text">Increased by 60%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-info card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">TOTAL SALES<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.bill_count}</h2>
                                    <h6 className="card-text">Decreased by 10%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-success card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">TOTAL MEDICINES <i className="mdi mdi-diamond mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.medicine_count}</h2>
                                    <h6 className="card-text">Increased by 5%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-danger card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">TOTAL COMPANY<i className="mdi mdi-chart-line mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.company_count}</h2>
                                    <h6 className="card-text">Increased by 60%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-info card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">TOTAL EMPLOYEE<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.employee_count}</h2>
                                    <h6 className="card-text">Decreased by 10%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-success card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">TOTAL PROFIT <i className="mdi mdi-diamond mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.medicine_count}</h2>
                                    <h6 className="card-text">Increased by 5%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-danger card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">TOTAL SALES AMOUNT<i className="mdi mdi-chart-line mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.sell_total}</h2>
                                    <h6 className="card-text">Increased by 60%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-info card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">MEDICINE EXPIRE IN WEEK<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.medicine_expire_serializer_data}</h2>
                                    <h6 className="card-text">Decreased by 10%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-success card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">COMPLETED REQUEST<i className="mdi mdi-diamond mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.request_completed}</h2>
                                    <h6 className="card-text">Increased by 5%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-danger card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">PENDING REQUEST<i className="mdi mdi-chart-line mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.request_pending}</h2>
                                    <h6 className="card-text">Increased by 60%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-info card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">TODAY SALES AMOUNT<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.sell_amt_today}</h2>
                                    <h6 className="card-text">Decreased by 10%</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-success card-img-holder text-white">
                                <div className="card-body">
                                    <img src={circle} className="card-img-absolute" alt="circle-image" />
                                    <h4 className="font-weight-normal mb-3">TODAY SALES PROFIT<i className="mdi mdi-diamond mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5">{this.state.profit_amt_today}</h2>
                                    <h6 className="card-text">Increased by 5%</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <h4 class="card-title">Profit chart</h4>
                                    <div>
                                        <CanvasJSChart options={options} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <h4 class="card-title">Sell chart</h4>
                                    <div>
                                        <CanvasJSChart options={options} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container-fluid clearfix">
                        <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © bootstrapdash.com 2020</span>
                        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Free <a href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">Bootstrap admin templates </a> from Bootstrapdash.com</span>
                    </div>
                </footer>
            </div>
        )
    }
}

export default HomeComponent
