import React, {Component} from 'react';
import {Link} from 'react-router';
import TextFieldGroup from '../common/TextFieldGroup';
import ValidateInput from '../../validations/Signin';
import {connect} from 'react-redux';
import {signin} from '../../actions/AuthActions';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      remember: false,
      loading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const {errors, isValid} = ValidateInput(this.state);
    if (!isValid) this.setState({errors})
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    //this.state.setState({loading: true})
    if (this.isValid()) {
      this.setState({errors: {}});
      this.props.signin(this.state).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({errors: {form: err.code}/*, loading: false*/})
      );
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {email, password, errors,} = this.state;

    return (
      <form className="form-signin" method="post" onSubmit={this.onSubmit}>
        {errors.form &&
        <div className="alert alert-danger" role="alert">
          {errors.form === 'auth/user-not-found' ? 'Usuario no encontrado' : errors.form == 'auth/wrong-password' ? 'Contraseña incorrecta' : 'Error en el sistema'}
        </div>
        }

        <TextFieldGroup
          field="email"
          placeholder="Email"
          value={email}
          error={errors.email}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          placeholder="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="checkbox">
          <label>
            <input type="checkbox" id="rememberMe" name="rememberMe"/> Remember me
          </label>
        </div>

        <button className="btn btn-lg btn-success btn-block" type="submit" disabled={this.state.loading}>Sign in
        </button>
      </form>
    );
  }
}

SigninForm.propTypes = {
  signin: React.PropTypes.func.isRequired
}

SigninForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default SigninForm;