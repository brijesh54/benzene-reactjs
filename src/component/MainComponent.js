import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


class MainComponent extends React.Component {
    render() {
        var Page = this.props.page;
        return (
            <React.Fragment>
                <div className="container-scroller">
                    <Navbar/>
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar activepage={this.props.activepage}/>
                        <Page {...this.props} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MainComponent;
