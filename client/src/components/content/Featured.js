import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Loader from '../presentationals/Loader';
import StreamCard from '../presentationals/StreamCard';
import Alert from '../presentationals/Alert';

class Featured extends Component {
  componentDidMount() {
    console.log('Featured Component mounted');
    this.props.fetchRequest();
    this.props.featuredApi(100);
    this.props.toggleActive('featured');
  }

  componentDidUpdate() {
    console.log('Featured Component updated');
    // this.props.fetchSuccess();
  }

  render() {
    const ftProps = this.props.featured;
    const status = ftProps.status;
    const streamCardItems = ftProps.featured.map(ft => (
      <StreamCard
        key={ft.stream._id}
        ebdStream={ft}
        streamCover={ft.stream.preview.medium}
        title={ft.title}
        text={ft.text}
        logo={ft.stream.channel.logo}
        name={ft.stream.channel.name}
        game={ft.stream.game}
      />
    ));
    const error = ftProps.error;
    console.log('streamCardItems', streamCardItems);
    return (
      <div className="main">
      <h3 className="text-center text-muted">Featured Streams</h3>
        {status === 'loading' ? (
          <Loader />
        ) : status === 'success' ? (
          <div className="stream-cards">{streamCardItems}</div>
        ) : status === 'error' ? (
          <div>
            <Alert error={error} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

function mapStateToProps({ featured }) {
  return { featured };
}

export default connect(mapStateToProps, actions)(Featured);
