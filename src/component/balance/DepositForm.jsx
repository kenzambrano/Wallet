import React, { Component } from 'react'
import { Link } from 'react-router'
import TextFieldGroup from '../common/TextFieldGroup'
import ValidateInput from '../../validations/Deposit'
import { connect } from 'react-redux'

class DepositForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			montoDeposito: '',
			errors: {}
		}
		this.onChange = this.onChange.bind(this)
		this.submit = this.submit.bind(this)
	}

	submit(e) {
		e.preventDefault()
		this.props.deposit(this.state)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { montoDeposito, errors, } = this.state;

		return (
			<form method="post" onSubmit={this.submit}>
				<label>Monto a Depositar:</label>
				{errors.form &&
					<div className="alert alert-danger" role="alert">
						{errors.form}
					</div>
				}
				<TextFieldGroup
					field='montoDeposito'
					placeholder='Monto'
					value={montoDeposito}
					error={errors.montoDeposito}
					onChange={this.onChange}
				/>
				<button className="btn btn-sm btn-success">Depositar</button>&nbsp;&nbsp;
				<button type="button" className="btn btn-sm btn-danger" onClick={this.props.hideDeposit}>Cancelar</button>
			</form>
		)
	}
}

DepositForm.propTypes = {
	hideDeposit: React.PropTypes.func.isRequired,
	deposit: React.PropTypes.func.isRequired
}

export default DepositForm;