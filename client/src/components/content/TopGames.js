import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Loader from '../presentationals/Loader';
import GameCard from '../presentationals/GameCard';
import Alert from '../presentationals/Alert';

class TopGames extends Component {
  componentDidMount() {
    console.log('TopGames Component mounted');
    this.props.fetchTopRequest();
    this.props.topGamesApi(60, 60);
    this.props.toggleActive('top');
  }

  render() {
    const topGamesProps = this.props.topGames;
    const status = topGamesProps.status;
    const gameCardItems = topGamesProps.games.map((tg, i) => (
      <GameCard
        key={tg.game._id}
        game={tg}
        name={tg.game.name}
        box={tg.game.box.large}
        logo={tg.game.logo.medium}
        viewers={tg.viewers}
        channels={tg.channels}
        spanChannels={true}
        cardType={'game-card col' + (i > 116 ? ' gs-hidden' : '')}
        cardCover={'stream-cover'}
        logoArt={true}
      />
    ));
    const error = topGamesProps.error;
    return (
      <div className="main">
        <h3 className="text-center text-muted">Top Games on Twitch</h3>
        {status === 'loading' ? (
          <Loader />
        ) : status === 'success' ? (
          <div className="stream-cards">{gameCardItems}</div>
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

function mapStateToProps({ topGames }) {
  return { topGames };
}

export default connect(mapStateToProps, actions)(TopGames);
