import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import {connect} from 'react-redux';
import {db} from '../../api/firebase'
class Balance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      deposits: 0,
      withdrawals: 0,
      toDeposit: null,
      towithdrawals: null,
      modalDeposit: false,
      modalWithdrawals: false,
      data: []
    }

    this.deposit = this.deposit.bind(this)
    this.showDeposit = this.showDeposit.bind(this)
    this.hideDeposit = this.hideDeposit.bind(this)
    this.showWithdrawals = this.showWithdrawals.bind(this)
    this.hideWithdrawals = this.hideWithdrawals.bind(this)
  }

  componentDidMount() {
    const $this = this
    db.ref(`/balance/${this.props.auth.user.uid}`).on('value', snap => {
      if (snap.val()) {
        $this.setState({balance: snap.val().balance})
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
        $this.setState({data: rows})
      }
    })
  }

  showDeposit(){
    this.setState({toDeposit: null, modalDeposit: true, modalWithdrawals: false})
  }
  hideDeposit(){
    this.setState({toDeposit: null, modalDeposit: false, modalWithdrawals: false})
  }

  showWithdrawals(){
    this.setState({toDeposit: null, modalDeposit: false, modalWithdrawals: true})
  }
  hideWithdrawals(){
    this.setState({toDeposit: null, modalDeposit: false, modalWithdrawals: false})
  }

  deposit(e){
    e.preventDefault()
    if(this.state.toDeposit){
      console.log("")
    }
  }


  render() {
    const {data, balance, deposits, withdrawals, toDeposit, modalDeposit, modalWithdrawals} = this.state;
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>

        {this.props.auth.user.profile === 1 ? <h1>Admin</h1> :

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
              <br/>
              <h3>Transacciones</h3>
              <br/>
              <button className="btn btn-info" onClick={this.showDeposit}>Deposito</button>
              &nbsp;&nbsp;
              <button className="btn btn-success" onClick={this.showWithdrawals}>Solicitud de Retiro</button>

              {modalDeposit ?
                <div className="deposit-content">
                  <form>
                    <input/>
                    <button>Guardar</button>
                    <button onClick={this.hideDeposit}>Cancelar</button>
                  </form>
                </div> 
              : null}

              {modalWithdrawals ?
                <div className="withdrawals-content">
                  <form>
                    <input/>
                    <button>Guardar</button>
                    <button onClick={this.hideWithdrawals}>Cancelar</button>
                  </form>
                </div> 
              : null}

              <br/>
              <br/>
              
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
                <TableHeaderColumn dataField='Com_FechaEmision ' isKey={true} dataSort={true}>Fecha</TableHeaderColumn>
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
