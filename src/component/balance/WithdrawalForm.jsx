import React, {Component} from 'react'
import { Link } from 'react-router'
import TextFieldGroup from '../common/TextFieldGroup'
import ValidateInput from '../../validations/Withdrawal'
import { connect } from 'react-redux'
class WithdrawalForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			montoRetiro: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this)
		this.submit = this.submit.bind(this)
	}

	submit(e) {
		e.preventDefault()
		this.props.withdrawal(this.state)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		const { montoRetiro, errors, } = this.state;

		return (
			<form method="post" onSubmit={this.submit}>
				<label>Monto a Retirar:</label>
				{errors.form &&
	                <div className="alert alert-danger" role="alert">
	                    {errors.form}
	                </div>
				}
				<TextFieldGroup
					field='montoRetiro'
					placeholder='Monto'
					value={montoRetiro}
					error={errors.montoRetiro}
					onChange={this.onChange}
				/>
				<button className="btn btn-sm btn-success">Solicitar</button>&nbsp;&nbsp;
				<button type="button" className="btn btn-sm btn-danger" onClick={this.props.hideWithdrawals}>Cancelar</button>
			</form>
		)
	}
}

WithdrawalForm.propTypes = {
	hideWithdrawals: React.PropTypes.func.isRequired,
	withdrawal: React.PropTypes.func.isRequired
}

export default WithdrawalForm;