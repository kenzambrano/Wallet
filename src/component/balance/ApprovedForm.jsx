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
            errors: {},
            type: 1,
            showComment: false
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

      if(e.target.name === 'type'){
        this.setState({showComment: e.target.value === "3"})
      }
    }

    render(){
        const { comment, errors, type} = this.state
        const show = this.props.show
        return (
          show ?
            <div className="deposit-content" style={{width: '300px', margin: '0 auto'}}>
            <form method="post" onSubmit={this.submit}>
              <label>Aprobar transacción:</label>
              {errors.form &&
              <div className="alert alert-danger" role="alert">
                {errors.form}
              </div>
              }
              <br />
              <div className="form-group">
                <label htmlFor="type"></label>
                <select className="form-control" id="type" name="type" onChange={this.onChange} value={type}>
                  <option value={1}>Aprobar</option>
                  <option value={3}>Rechazar</option>
                </select>
              </div>
              <br />
              {this.state.showComment ? <TextFieldGroup
                  field='comment'
                  placeholder='Comentario'
                  value={comment}
                  error={errors.comment}
                  onChange={this.onChange}
                  type='textarea'
                /> : null}

              <button className="btn btn-sm btn-success">Guardar</button>&nbsp;&nbsp;
              <button type="button" className="btn btn-sm btn-danger" onClick={this.props.hideApproved}>Cancelar</button>
            </form>
            </div>
          : null
        )
    }
}

ApprovedForm.propTypes = {
  approvedWithdrawal: React.PropTypes.func.isRequires,
  hideApproved: React.PropTypes.func.isRequires
}

export default ApprovedForm