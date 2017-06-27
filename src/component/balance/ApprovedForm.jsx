import React, { Component } from 'react'
import { Link } from 'react-router'
import TextFieldGroup from '../common/TextFieldGroup'
import ValidateInput from '../../validations/Deposit'
import { connect } from 'react-redux'
class ApprovedForm extends Component {
    constructor (props){
        super(props);
        this.state = {
            comment: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    submit(e){
        e.preventDefault()
        this.props.approvedWithdrawal(this.state)
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }

    render(){
        const { comment, errors, } = this.state
        return (
            <form method="post" onSubmit={this.submit}>
                <label>Aprobar transacción:</label>
                {errors.form &&
                    <div className="alert alert-danger" role="alert">
                        {errors.form}
                    </div>
                }
                <br />
                <div class="form-group">
                    <label for="select"></label>
                    <select class="form-control" id="select">
                        <option>Aprobar</option>
                        <option>Rechazar</option>
                    </select>
                </div>
                <br />
                <TextFieldGroup
                    field='comment'
                    placeholder='Comentario'
                    value={comment}
                    error={errors.comment}
                    onChange={this.onChange}
                />
                <button className="btn btn-sm btn-success">Guardar</button>&nbsp;&nbsp;
                <button type="button" className="btn btn-sm btn-danger" onClick={this.props.hideDeposit}>Cancelar</button>
            </form>
        )
    }
}

ApprovedForm.propTypes = {
    approvedWithdrawal: React.PropTypes.func.isRequires
}

export default ApprovedForm