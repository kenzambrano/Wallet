import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { connect } from 'react-redux'
import DepositForm from './DepositForm'
import WithdrawalForm from './WithdrawalForm'
import ApprovedForm from './ApprovedForm'
import { db } from '../../api/firebase'
class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      deposits: 0,
      withdrawals: 0,
      modalDeposit: false,
      modalWithdrawals: false,
      modalApproved: false,
      data: [],
      dataAdmin: [],
      errors: {},
      types: {
        1: 'Deposito',
        2: 'Retiro'
      },
      status: {
        1: 'Aprobado',
        2: 'En espera',
        3: 'Rechazado'
      }, 
      approvedTypes: {
        1: 'Aprobar',
        3: 'Rechazar'
      }
    }

    this.deposit = this.deposit.bind(this)
    this.withdrawal = this.withdrawal.bind(this)
    this.showDeposit = this.showDeposit.bind(this)
    this.hideDeposit = this.hideDeposit.bind(this)
    this.showWithdrawals = this.showWithdrawals.bind(this)
    this.hideWithdrawals = this.hideWithdrawals.bind(this)
  }

  componentDidMount() {
    const $this = this
    db.ref(`/balance/${this.props.auth.user.uid}`).on('value', snap => {
      if (snap.val()) $this.setState({ balance: snap.val().balance })
    })

    db.ref(`/deposits/${this.props.auth.user.uid}`).on('value', snap => {
      if (snap.val()) $this.setState({ deposits: snap.val().deposits })
    })

    db.ref(`/withdrawals/${this.props.auth.user.uid}`).on('value', snap => {
      if (snap.val()) $this.setState({ withdrawals: snap.val().withdrawals })
    })

    db.ref(`/transactions/${this.props.auth.user.uid}`).on('value', snap => {
      if (snap.val()) {
        let rows = []
        snap.forEach((data) => {
          var last = data.val()
          last.key = data.key
          rows.push(last)
        })
        $this.setState({ data: rows })
      }
    })

    db.ref(`/transactions/${this.props.auth.user.uid}`).on('value', snap => {
        if(snap.val()){
          let rows = []
          snap.forEach((dataAdmin) => {
            var type = 2 
            var last = ""
            if(dataAdmin.val().type == 2){
               last = dataAdmin.val()
               last.key = dataAdmin.key
               rows.push(last)
            }
          })
          this.setState({ dataAdmin: rows })
        }
    })
  }

  showDeposit() {
    this.setState({ toDeposit: null, modalDeposit: true, modalWithdrawals: false })
    this.setState({ errors: {form: null}})
  }
  hideDeposit() {
    this.setState({ toDeposit: null, modalDeposit: false, modalWithdrawals: false })
    this.setState({ errors: {form: null}})
  }

  showWithdrawals() {
    this.setState({ toDeposit: null, modalDeposit: false, modalWithdrawals: true })
    this.setState({ errors: {form: null}})
  }
  hideWithdrawals() {
    this.setState({ toDeposit: null, modalDeposit: false, modalWithdrawals: false })
    this.setState({ errors: {form: null}})
  }

  deposit(state) {    
    const key = db.ref().child('transactions').push().key
    var updates = {}
    updates[`/transactions/${this.props.auth.user.uid}/` + key] = { 
      ammount: state.montoDeposito,
      type: 1,
      approved: 1,
      comment: "",
      created: "",
      updated: ""
    }
    // insert transaction
    db.ref().update(updates)
    // insert balance
    db.ref(`balance/${this.props.auth.user.uid}`).once('value', balance => {      
      if (balance.val()) {
        var total = (parseInt(balance.val().balance) + parseInt(state.montoDeposito))        
        db.ref(`balance/${this.props.auth.user.uid}`).set({ balance:  total })
      } else {
        db.ref(`balance/${this.props.auth.user.uid}`).set({ balance: state.montoDeposito })
      }
    })
    // insert deposits
    db.ref(`deposits/${this.props.auth.user.uid}`).once('value', deposits => {
      if (deposits.val()) {
        var total = (parseInt(deposits.val().deposits)) + (parseInt(state.montoDeposito))
        db.ref(`deposits/${this.props.auth.user.uid}`).set({ deposits: total })
      } else {
        db.ref(`deposits/${this.props.auth.user.uid}`).set({ deposits: state.montoDeposito })
      }
    })
  }

  withdrawal(state) {
    //alert(Date.parse(new Date()))
    const key = db.ref().child('transactions').push().key
    var updates = {}
    updates[`/transactions/${this.props.auth.user.uid}/${key}`] = { 
      ammount: state.montoRetiro,
      type: 2,
      approved: 2,
      comment: "",
      created: "",
      updated: ""
    }
    // select balance
    db.ref(`balance/${this.props.auth.user.uid}`).on('value', snap => {
        if (snap.val() && ((parseInt(snap.val().balance)) >= (parseInt(state.montoRetiro)))) {
          // insert transaction
          db.ref().update(updates)
          this.setState({ errors: {form: null}})
        } else 
          this.setState({ errors: {form: "Saldo insuficiente para esta operación."}})
    })
  }

  approvedWithdrawal(state){
    var user = "5fCFigj0zcZTK9AUuZYPvdsEg4l2"
    //var user = this.props.auth.user.uid
    var key = "-KnauuB78PjdfC_2qudl"
    var approvedValue = 1
    var comment = "Aprobada"
    var updates = {}
    alert('approvedWithdrawal')
    // approved transaction
    db.ref(`/transactions/${user}/${key}`).on('value', transactions => {
      if (transactions.val() && (parseInt(transactions.val().type) == 2 && parseInt(transactions.val().approved) == 2)) {
        alert(JSON.stringify(transactions.val()))
        db.ref(`/balance/${user}`).once('value', balance => {
          if(balance.val() && (parseInt(balance.val().balance) >= parseInt(transactions.val().ammount))){
            alert(JSON.stringify(balance.val()))
            if(approvedValue == 1){
              var total = parseInt(balance.val().balance) - parseInt(transactions.val().ammount)
              // balance
              db.ref(`balance/${user}`).set({ balance:  total })
              // withdrawals
              db.ref(`withdrawals/${user}`).once('value', withdrawals => {
                if (withdrawals.val()) {
                  var total = (parseInt(withdrawals.val().withdrawals)) + parseInt(transactions.val().ammount)
                  db.ref(`withdrawals/${user}`).set({ withdrawals: total })
                } else 
                  db.ref(`withdrawals/${user}`).set({ withdrawals: parseInt(transactions.val().ammount) })
              })
            }
            updates[`/transactions/${user}/${key}`] = { 
              ammount: parseInt(transactions.val().ammount),
              type: 2, //Retiro
              approved: approvedValue,
              comment: comment,
              created: "",
              updated: ""
            }
            // update transaction
            db.ref().update(updates)
          }
        })
      } 
    })
  }

  enumFormatter(cell, row, enumObject){
    return enumObject[cell];
  }

  render() {
    const { 
      data, dataAdmin, balance, deposits, withdrawals, toDeposit, 
      modalDeposit, modalWithdrawals, errors, types, status, approvedTypes, 
      cellEditProps = { mode: 'click', blurToSave: true }, } = this.state;

    var row_editable = {
          type: "select",
          options:{
          values: [1, 3]
          }
      };

      var options = {
        ignoreEditable: true
      }

    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>

        {this.props.auth.user.profile === 2 ? 
          <div className="balance-main row">
            <div className="balance-transactions col-lg-12 col-xs-12">
              <br />
              <h3>Solicitud de Retiros</h3>
              <br />
              <div className="deposit-content">
                <ApprovedForm />
              </div>
              <br />
              <BootstrapTable 
                data={dataAdmin} striped hover 
                remote={true} 
                cellEdit={cellEditProps}
                tableContainerclassName='table-sm'
                pagination
                options={{
                  sizePerPage: 20,
                  paginationSize: 5,
                  paginationShowsTotal: false,
                  prePage: '<',
                  nextPage: '>',
                  firstPage: '<<',
                  lastPage: '>>'
                }}>
                <TableHeaderColumn dataField='key' hidden={true} isKey={true} dataSort={true}>Usuario</TableHeaderColumn>
                <TableHeaderColumn dataField='type' dataFormat={this.enumFormatter} formatExtraData={types} options={options}>Transacción</TableHeaderColumn>
                <TableHeaderColumn dataField='ammount'>Monto</TableHeaderColumn>
                <TableHeaderColumn dataField='approved' dataFormat={this.enumFormatter} formatExtraData={status}>Estado</TableHeaderColumn>
                <TableHeaderColumn dataField='updated'>Fecha</TableHeaderColumn>
                <TableHeaderColumn dataField='comment'>Comentario</TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.enumFormatter} formatExtraData={approvedTypes} editable={row_editable}>Acciones</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        :
          <div className="balance-main row">
            <div className="balance-detail col-lg-3 col-xs-12">
              <ul>
                <li>
                  <h4>Saldo</h4>
                  <h1>{balance === 0 ? '...' : balance}</h1>
                </li>
                <li>
                  <h4>Depositos</h4>
                  <h1>{deposits === 0 ? '...' : deposits}</h1>
                </li>
                <li>
                  <h4>Retiros</h4>
                  <h1>{withdrawals === 0 ? '...' : withdrawals}</h1>
                </li>
              </ul>
            </div>
            <div className="balance-transactions offset-lg-1 col-lg-8 col-xs-12">
              <br />
              <h3>Transacciones</h3>
              <br />
              <button className="btn btn-info" onClick={this.showDeposit}>Deposito</button>
              &nbsp;&nbsp;
              <button className="btn btn-success" onClick={this.showWithdrawals}>Solicitud de Retiro</button>
              <br />
              <br />
              
              {errors.form &&
                <div className="alert alert-danger" role="alert">
                    {errors.form}
                </div>
              }
				
              { modalDeposit ?
                  <div className="deposit-content">
                    <DepositForm hideDeposit={this.hideDeposit} deposit={this.deposit} />
                  </div>
              : null}
              { modalWithdrawals ?
                  <div className="withdrawals-content">
                    <WithdrawalForm hideWithdrawals={this.hideWithdrawals} withdrawal={this.withdrawal} />
                  </div>
              : null}
              <br />
              <BootstrapTable data={data} striped hover remote={true} tableContainerclassName='table-sm '
                pagination
                options={{
                  sizePerPage: 20,
                  paginationSize: 5,
                  paginationShowsTotal: false,
                  prePage: '<', nextPage: '>', firstPage: '<<', lastPage: '>>'
                }}>
                <TableHeaderColumn dataField='type' isKey={true} dataFormat={this.enumFormatter} formatExtraData={types}>Transacción</TableHeaderColumn>
                <TableHeaderColumn dataField='ammount'>Monto</TableHeaderColumn>
                <TableHeaderColumn dataField='approved' dataFormat={this.enumFormatter} formatExtraData={status}>Estado</TableHeaderColumn>
                <TableHeaderColumn dataField='updated'>Fecha</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        }

      </ReactCSSTransitionGroup>
    );
  }

}

Balance.propTypes = {
  auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(Balance);