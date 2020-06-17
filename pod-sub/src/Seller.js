import React,{Component} from 'react';
import web3 from './web3.js'
import POD from './POD'

import { ButtonContainer } from './components/Button';

var keyT=null;

class Seller extends Component{
  constructor(props){
    super(props)
    this.state = {
      signed:false,
      Key:'0'
    }
    this.sign = this.sign.bind(this)
    this.update = this.update.bind(this)
    this.tick= this.tick.bind(this)
    this.createPackageAndKey=this.createPackageAndKey.bind(this)
  }
  sign = (event) => {
    this.setState({
      signed:true
    })

    this.props.SignTermsAndConditions(this.props.address)
  }

  async createPackageAndKey(){
    await POD.methods.createPackageAndKey().send({
      from: this.props.address
    })
  }

  async tick() {
    console.log("tick",this.props.index)
    if(this.props.index !== await POD.methods.state().call() ){
      this.props.reRender();
    }

    let keyt = await POD.methods.returnKey().call({
      from: this.props.address
    })
    console.log(keyt);
    if(this.state.key !== keyt){
      this.setState({
        key: keyt
      })
    }
  }
  async update(){
    console.log("update",this.props.index)
    const interval = setInterval( () => {
      this.tick()
    }, 3500);
  }
  componentDidUpdate(prevProps, prevState) {
    this.update()
  }
  componentDidMount(prevProps, prevState) {
    this.update()
  }
  render(){
    return(

      <div className="container">
        <div className="d-flex justify-content-center py-5">
          <img className="img-rounded" src="art_seller.png" />
        </div>
        <div className="d-flex justify-content-center">
          <h1 className="text-uppercase text-title">seller</h1>
       </div>
       <div className="d-flex justify-content-center">
    <p>Adderss: {this.props.address.slice(0, 4)}...{this.props.address.slice(25, 29)}</p>
       </div>
       <div className="d-flex justify-content-center">
       <h3>
         {this.props.state==="waitingForVerificationbySeller"?"Please agree the Terms and Conditions":"Please wait..."}
         {this.props.state==="MoneyWithdrawn"?"Collateral deposited!":null}
         {this.props.state==="PackageAndTransporterKeyCreated"?"Package is ready to be delivered!":null}
      </h3>
       </div>
       <div className="d-flex justify-content-center py-5">
          <h3>Price: {this.props.price}</h3>
       </div>        
        <div className="d-flex justify-content-center">
          {this.props.state==='waitingForVerificationbySeller' ?  <ButtonContainer onClick={this.sign}>Agree terms and conditions</ButtonContainer>:null}
          {this.props.state==='MoneyWithdrawn'? <ButtonContainer cart="true" onClick={this.createPackageAndKey}>Create Package And Key</ButtonContainer>:null}
          {this.props.state==='PackageAndTransporterKeyCreated'?
            <h3>Transporter Key: {this.state.key}</h3>
          :null}
        </div>
      </div>

    )
  }
}

export default Seller;
