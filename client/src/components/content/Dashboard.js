import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import AnonDash from './AnonDash';
import Loader from '../presentationals/Loader';
import StreamCard from '../presentationals/StreamCard';
import GameCard from '../presentationals/GameCard';
import Alert from '../presentationals/Alert';

class Dashboard extends Component {
    componentDidMount() {
        const { authenticated } = this.props.auth;
        if (authenticated) {
            this.props.topGamesApi(12);
        }
    }

    renderDash() {
        const { auth, dashboard, featured, top } = this.props;
        if (!auth.authenticated) return <AnonDash />;
        const { status, streams, games } = dashboard;
        const streamCardStreams = streams.map((bc) => <StreamCard key={bc.id} stream={bc} />);
        const streamCardGames = games.map((gm) => <GameCard key={gm.id} game={gm} />);
        const Dashboard = (
            <>
                <h3 className="text-center text-muted mb-3">Recommended Channels</h3>
                <div className="row">{streamCardStreams}</div>
                <hr className="mt-0 mb-4" />
                <h3 className="text-center text-muted mb-3">Recommended Games</h3>
                <div className="row">{streamCardGames}</div>
            </>
        );
        return (
            <div className="main">
                {
                    {
                        loading: <Loader />,
                        success: Dashboard,
                        error: <Alert />,
                    }[status]
                }
            </div>
        );
    }

    render() {
        return <>{this.renderDash()}</>;
    }
}

function mapStateToProps({ auth, twitch: { dashboard, featured, top } }) {
    return { auth, dashboard, featured, top };
}

export default connect(mapStateToProps, actions)(Dashboard);
