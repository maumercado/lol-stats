import React from "react";
import moment from "moment";

const Match = ({ match }) => {
    console.log(match);
    let result = match.me.win ? "Win" : "Lose";
    return (
        <tr>
            <td>{match.gameMode}</td>
            <td>{Math.floor(match.gameDuration / 60, -1)}</td>
            <td>
                {moment(match.gameCreation)
                    .startOf("day")
                    .fromNow()}
            </td>
            <td>
                {match.me.kills}/{match.me.deaths}/{match.me.assists}
            </td>
            <td>{result}</td>
        </tr>
    );
};

export default Match;
