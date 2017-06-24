import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { connect } from 'react-redux'
import DepositForm from './DepositForm'
import WithdrawalForm from './WithdrawalForm'
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
      data: []
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
      if (snap.val()) {
        $this.setState({ balance: snap.val().balance })
      }
    })

    db.ref(`/deposits/${this.props.auth.user.uid}`).on('value', snap => {
      if (snap.val()) {
        $this.setState({ deposits: snap.val().deposits })
      }
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
  }

  showDeposit() {
    this.setState({ toDeposit: null, modalDeposit: true, modalWithdrawals: false })
  }
  hideDeposit() {
    this.setState({ toDeposit: null, modalDeposit: false, modalWithdrawals: false })
  }

  showWithdrawals() {
    this.setState({ toDeposit: null, modalDeposit: false, modalWithdrawals: true })
  }
  hideWithdrawals() {
    this.setState({ toDeposit: null, modalDeposit: false, modalWithdrawals: false })
  }

  getTime() {

  }

  deposit(state) {    
    const key = db.ref().child('transactions').push().key
    var updates = {}
    updates[`/transactions/${this.props.auth.user.uid}/` + key] = { 
      ammount: state.montoDeposito,
      type: 1,
      approved: 1,
      note: "",
      created: "",
      updated: ""
    }
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
    const key = db.ref().child('transactions').push().key
    var updates = {}
    updates[`/transactions/${this.props.auth.user.uid}/` + key] = { 
      ammount: state.montoRetiro,
      type: 2,
      approved: 2,
      note: "",
      created: "",
      updated: ""
    }
    db.ref().update(updates)
  }

  //  {  
  //       "deposit": "100",4
  //       "type": 1,
  //       "approved": 3,
  //       "createdAt": "2017-05-10T17:42:22.579Z",
  //       "updatedAt": "2017-05-10T22:07:58.728Z",  
  //       "notes": ""
  //     },

  render() {
    const { data, balance, deposits, withdrawals, toDeposit, modalDeposit, modalWithdrawals } = this.state;
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>

        {this.props.auth.user.profile === 1 ? 
        
          <div className="balance-main row">
            <div className="balance-transactions col-lg-12 col-xs-12">
              <br />
              <h3>Solicitud de Retiros</h3>
              <br />

              <BootstrapTable data={data} striped hover remote={true} tableContainerclassName='table-sm '
                pagination
                options={{
                  sizePerPage: 20,
                  paginationSize: 5,
                  paginationShowsTotal: false,//this.renderPaginationShowsTotal,
                  prePage: '<',
                  nextPage: '>',
                  firstPage: '<<',
                  lastPage: '>>'
                }}>
                <TableHeaderColumn dataField='key' isKey={true} dataSort={true}>Usuario</TableHeaderColumn>
                <TableHeaderColumn dataField='Com_Transaccion'>Transacción</TableHeaderColumn>
                <TableHeaderColumn dataField='ammount'>Monto</TableHeaderColumn>
                <TableHeaderColumn dataField='Com_Fecha'>Fecha</TableHeaderColumn>
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

              {modalDeposit ?
                <div className="deposit-content">
                  <DepositForm hideDeposit={this.hideDeposit} deposit={this.deposit} />
                </div>
                : null}

              {modalWithdrawals ?
                <div className="withdrawals-content">
                  <WithdrawalForm hideWithdrawals={this.hideWithdrawals} withdrawal={this.withdrawal} />
                </div>
                : null}

              <br />
              <br />

              <BootstrapTable data={data} striped hover remote={true} tableContainerclassName='table-sm '
                pagination
                options={{
                  sizePerPage: 20,
                  paginationSize: 5,
                  paginationShowsTotal: false,//this.renderPaginationShowsTotal,
                  prePage: '<', nextPage: '>', firstPage: '<<', lastPage: '>>'
                }}>
                <TableHeaderColumn dataField='key' isKey={true} dataSort={true}>Usuario</TableHeaderColumn>
                <TableHeaderColumn dataField='type'>Transacción</TableHeaderColumn>
                <TableHeaderColumn dataField='ammount'>Monto</TableHeaderColumn>
                <TableHeaderColumn dataField='approved'>Estado</TableHeaderColumn>
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
