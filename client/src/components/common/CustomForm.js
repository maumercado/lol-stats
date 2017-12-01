import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import * as actions from "../../actions";

const CustomReduxForm = props => {
    class CustomForm extends React.Component {
        renderAlert = () => {
            if (this.props.errorMessage) {
                return (
                    <div className="alert alert-danger">
                        <strong>Oops!</strong> {this.props.errorMessage}
                    </div>
                );
            }
        };
        render() {
            const { fields, handleSubmit } = this.props;
            return (
                <form
                    className="col s10"
                    onSubmit={handleSubmit(props.onSubmit)}
                >
                    {fields.map((formField, i) => renderField(formField, i))}
                    {this.renderAlert()}
                    <button className="btn btn-primary" action="submit">
                        {props.submitButtonText}
                    </button>
                </form>
            );
        }
    }

    const renderField = (customField, i) => {
        return (
            <div key={i} className="input-field col s8">
                <Field
                    label={customField.label}
                    name={customField.name}
                    className={customField.className}
                    component={renderFieldComponent}
                    type={customField.type}
                />
            </div>
        );
    };

    const renderFieldComponent = field => {
        const { meta: { touched, error } } = field;
        const className = `${touched && error ? "invalid" : "valid"}`;

        return (
            <fieldset>
                <input
                    {...field.input}
                    type={field.type}
                    className={`${field.className} ${className}`}
                />
                <label>{field.label}</label>
                <div className="error" style={{ color: "red" }}>
                    {touched ? error : ""}
                </div>
            </fieldset>
        );
    };

    const mapStateToProps = state => {
        return {
            errorMessage: state.error
        };
    };

    const WrappedForm = reduxForm({
        validate: props.validate,
        form: props.formName
    })(connect(mapStateToProps, actions)(CustomForm));

    return <WrappedForm {...props} />;
};

export default CustomReduxForm;
