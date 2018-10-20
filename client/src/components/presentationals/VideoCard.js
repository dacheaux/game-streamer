import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class VideoCard extends Component {

  iframe() {
    let iframeCustom = this.props.iframe.replace(
      "tt_content=embed",
      "tt_content=embed&autoplay=false"
    );
    iframeCustom = iframeCustom.replace(
      "width='640' height='360'",
      "width='100%' height='100%'"
    );
    return { __html: iframeCustom };
  }

  render() {
    return (
    	<div className="col-lg-6 p-2">
        	<div className="gs-clip" dangerouslySetInnerHTML={this.iframe()} />
        </div>
    );
  }
}

export default connect(
  null,
  actions
)(VideoCard);
