import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import CustomReduxForm from "./common/CustomForm";
import Matches from "./Matches";

class Welcome extends Component {
    generateFields = () => {
        return [
            {
                name: "search",
                label: "Search by Summoner Name",
                type: "text",
                className: "form-control"
            }
        ];
    };

    handleFormSubmit = ({ search }) => {
        this.props.search({ search });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <CustomReduxForm
                        formName="search"
                        validate={validate}
                        fields={this.generateFields()}
                        onSubmit={this.handleFormSubmit}
                        submitButtonText="Search"
                    />
                </div>
                <div className="container">
                    <Matches />
                </div>
            </div>
        );
    }
}

const validate = values => {
    let errors = {};

    // validate inputs from values object
    if (!values.search) {
        errors.search = "Enter a search value!";
    }

    return errors;
};

export default connect(null, actions)(Welcome);
