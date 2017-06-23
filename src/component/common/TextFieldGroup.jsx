import React from 'react';
import classnames from 'classnames';
//import { Loc } from 'redux-react-i18n';
const TextFieldGroup = ({ field, value, label, error, type, onChange, onBlur, placeholder, readOnly, autoComplete, required, onKeyDown}) => {

    return (
        <div className={classnames('form-group', { 'has-danger': error })}>
            {label && <label className="control-label">{label}</label>}
            <input
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                type={type}
                name={field}
                className="form-control"
                placeholder={placeholder}
                readOnly={readOnly}
                autoComplete=""
                required = {required}
                id={field}
                onKeyDown={onKeyDown}
            />
            {error && error}
        </div>  );
}

TextFieldGroup.propTypes = {
    field: React.PropTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    error: React.PropTypes.string,
    readOnly: React.PropTypes.string,
    autoComplete: React.PropTypes.string,
    type: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    required: React.PropTypes.string
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;