import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../actions';
import Loader from '../presentationals/Loader';
import GameCard from '../presentationals/GameCard';
import Alert from '../presentationals/Alert';

const TopGames = () => {
    const games = useSelector((state) => state.twitch.top);
    const { twAccessToken } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        twAccessToken && dispatch(actions.topGamesApi(60, 0));
    }, [twAccessToken]);

    const { status } = games;
    const gameCardItems = games.list.map((item) => <GameCard key={item.id} game={item} />);
    return (
        <div className="main">
            <h3 className="text-center text-muted mb-3">Top Games on Twitch</h3>
            {
                {
                    loading: <Loader />,
                    success: <div className="gs-games">{gameCardItems}</div>,
                    error: (
                        <div>
                            <Alert error={status} />
                        </div>
                    ),
                }[status]
            }
        </div>
    );
};

export default TopGames;
