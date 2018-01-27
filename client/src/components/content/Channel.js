import React, { Component } from "react";
import { connect } from "react-redux";

import TwitchEmbed from "../presentationals/TwitchEmbed";

class Channel extends Component {
  componentDidMount() {
    console.log("CHANNEL mounted", this.props);
  }

  render() {
    const { display_name, followers, name } = this.props.embed;
    return (
      <div id="gs-embed">
        <p className="h4">{display_name} | Followers: {followers}</p>
        <TwitchEmbed channel={name} />
      </div>
    );
  }
}

function mapStateToProps({ embed }) {
  return { embed };
}

export default connect(mapStateToProps)(Channel);