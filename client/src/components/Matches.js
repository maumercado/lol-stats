import React, { Component } from "react";
import Match from "./Match";
import { connect } from "react-redux";
import moment from "moment";

class Matches extends Component {
    renderSummoner = () => {
        if (this.props.summoner) {
            let revisionDate = moment(this.props.summoner.revisionDate)
                .startOf("day")
                .fromNow();

            return (
                <div className="row">
                    <h4>Champion information</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>{this.props.summoner.name}</th>
                                <th>
                                    <img
                                        src={this.props.summoner.profileIconUrl}
                                        width="45px"
                                        height="45px"
                                    />
                                </th>
                                <th>
                                    Level {this.props.summoner.summonerLevel}
                                </th>
                                <th>Last played: {revisionDate}</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            );
        }
        return null;
    };
    renderMatches = () => {
        if (this.props.matches) {
            let matches = this.props.matches.map((match, i) => {
                return <Match key={i} match={match} />;
            });
            return (
                <div className="row">
                    <h4>Matches</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Game Mode</th>
                                <th>Game Duration</th>
                                <th>Game Created: </th>
                                <th>K/D/A</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        {matches}
                    </table>
                </div>
            );
        }

        return null;
    };

    renderSearchValue = () => {
        if (this.props.loading) {
            return (
                <h5>{`Searching results for "${
                    this.props.searchedValues.search
                }" in NA`}</h5>
            );
        }
        if (
            this.props.searchedValues &&
            this.props.submitted &&
            !this.props.summoner
        ) {
            return (
                <h5>{`No results found for "${
                    this.props.searchedValues.search
                }" in NA`}</h5>
            );
        }
        return null;
    };

    render() {
        return (
            <div>
                {this.renderSearchValue()}
                {this.renderSummoner()}
                {this.renderMatches()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { summoner, matches, submitted, loading } = state.results;
    let { values } = state.form.search;
    return {
        summoner,
        matches,
        searchedValues: values,
        submitted,
        loading
    };
};

export default connect(mapStateToProps, null)(Matches);
