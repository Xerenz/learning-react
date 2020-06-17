import React,{Component} from 'react';
import Seller from './Seller'
import Buyer from './Buyer'
import Transporter from './Transporter'
import SelectUserForm from './SelectUserForm'
import web3 from './web3.js'
import POD from './POD'
import './App.css';

import Navbar from './components/Navbar';


class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      user : '',
      seller: '',
      buyer: '',
      transporter: '',
      arbitrator: '',
      attestaionAuthority: '',
      contractStates: [
        'waitingForVerificationbySeller',
        'waitingForVerificationbyTransporter',
        'waitingForVerificationbyBuyer',
        'MoneyWithdrawn',
        'PackageAndTransporterKeyCreated',
        'ItemOnTheWay',
        'PackageKeyGivenToBuyer',
        'ArrivedToDestination',
        'buyerKeysEntered',
        'PaymentSettledSuccess',
        'DisputeVerificationFailure',
        'EtherWithArbitrator',
        'CancellationRefund',
        'Refund',
        'Aborted',
        'Waiting'
      ],
      contractStateIndex: 15,
      itemPrice: ''
    }
    this.selectUser = this.selectUser.bind(this)
    this.SignTermsAndConditions = this.SignTermsAndConditions.bind(this)
    this.reRender = this.reRender.bind(this)
  }

  selectUser(selectedUser){
    this.setState({
      user: selectedUser
    })
  }
  async SignTermsAndConditions(address){
    console.log((parseFloat(this.state.itemPrice)*2).toString())
    await POD.methods.SignTermsAndConditions().send({
      from: address,
      value: web3.utils.toWei((parseFloat(this.state.itemPrice)*2).toString(),'ether')
    })
    console.log("contract signed by",address)
    this.setState({
      contractStateIndex: await POD.methods.state().call()
    })
    console.log(this.contractStateIndex)
    console.log(this.state.contractStates[this.state.contractStateIndex])
  }
  async componentDidMount(){
    const seller = await POD.methods.seller().call();
    const buyer = await POD.methods.buyer().call();
    const transporter = await POD.methods.transporter().call();
    const arbitrator = await POD.methods.arbitrator().call();
    const attestaionAuthority = await POD.methods.attestaionAuthority().call();
    const state = await POD.methods.state().call();
    const itemPrice = web3.utils.fromWei(await POD.methods.itemPrice().call(),'ether').toString();
    console.log(itemPrice)

    this.setState({
      seller: seller,
      buyer: buyer,
      transporter: transporter,
      arbitrator: arbitrator,
      attestaionAuthority: attestaionAuthority,
      contractStateIndex: state,
      itemPrice: itemPrice
    })
  }

  async reRender(){
    console.log('Rerendering');
    this.setState({
      contractStateIndex: await POD.methods.state().call()
    })
  }

  render(){
    let displayUser;
    if(this.state.user === 'Seller'){
      displayUser = <Seller
        address={this.state.seller}
        state={this.state.contractStates[this.state.contractStateIndex]}
        price={this.state.itemPrice}
        SignTermsAndConditions={this.SignTermsAndConditions}
        index={this.state.contractStateIndex}
        reRender={this.reRender}

      />
    }else if (this.state.user === 'Buyer') {
      displayUser = <Buyer
        address={this.state.buyer}
        state={this.state.contractStates[this.state.contractStateIndex]}
        price={this.state.itemPrice}
        SignTermsAndConditions={this.SignTermsAndConditions}
        index={this.state.contractStateIndex}
        reRender={this.reRender}
      />
    }else if (this.state.user === 'Transporter') {
      displayUser = <Transporter
        address={this.state.transporter}
        state={this.state.contractStates[this.state.contractStateIndex]}
        price={this.state.itemPrice}
        SignTermsAndConditions={this.SignTermsAndConditions}
        index={this.state.contractStateIndex}
        reRender={this.reRender}
      />
    }else{
      displayUser=null
    }

    return(
      <React.Fragment>
        <Navbar/>
          {displayUser === null ? <SelectUserForm selectUser={this.selectUser}/> : displayUser}
      </React.Fragment>
    )
  }
}

// byte32 = 0x7465737400000000000000000000000000000000000000000000000000000000
//1000000000000000000000000000000000000000000000000000000000000000000000000

export default App;
