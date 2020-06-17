import React,{Component} from 'react';
import web3 from './web3.js'
import POD from './POD'

import { ButtonContainer } from "./components/Button";

class Buyer extends Component {
  constructor(props){
    super(props)
    this.state = {
      signed:false,
      key:'0',
      showKey:false,
      transporterKey:'0'
    }
    
    this.sign = this.sign.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.update = this.update.bind(this)
    this.tick= this.tick.bind(this)
    this.requestPackageKey= this.requestPackageKey.bind(this)
    this.verifyKeyBuyer= this.verifyKeyBuyer.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  sign = (event) => {
    this.setState({
      signed:true
    })
    this.props.SignTermsAndConditions(this.props.address)
  }

  async requestPackageKey(){
    await POD.methods.requestPackageKey().send({
      from: this.props.address
    })
  }

  async verifyKeyBuyer(evt){
    evt.preventDefault()
    console.log("verify");
    await POD.methods.verifyKeyBuyer(this.state.transporterKey,this.state.key).send({
      from: this.props.address
    })
  }

  async tick() {
    console.log("tick",this.props.index)
    if(this.props.index !== await POD.methods.state().call()){
      this.props.reRender();
    }
    let keyb = await POD.methods.returnKey().call({
      from: this.props.address
    })
    if(this.state.key !== keyb){
      this.setState({
        key: keyb
      })
    }
  }
  async update(){
    console.log("update",this.props.index)
    const interval = setInterval( () => {
      this.tick()
    }, 3000);
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
          <img className="img-rounded" src="buyer.jpg" />
        </div>
        <div className="d-flex justify-content-center">
          <h1 className="text-uppercase text-title">buyer</h1>
       </div>
       <div className="d-flex justify-content-center">
    <p>Adderss: {this.props.address.slice(0, 4)}...{this.props.address.slice(25, 29)}</p>
       </div>
       <div className="d-flex justify-content-center">
       <h3>
         {this.props.state==="waitingForVerificationbyBuyer"?"Please sign the Terms and Conditions":"Please wait..."}
         {this.props.state==="ItemOnTheWay"?"Your package is on the way!":null}
      </h3> 
       </div>
       <div className="d-flex justify-content-center py-5">
          <h3>Price: {this.props.price}</h3>
       </div>        
        <div className="d-flex justify-content-center">
          {this.props.state==='waitingForVerificationbyBuyer' ?  <ButtonContainer onClick={this.sign}>Agree terms and conditions</ButtonContainer>:null}
          {this.props.state==='ItemOnTheWay'? <ButtonContainer cart="true" onClick={this.createPackageAndKey}>Get Verification Key</ButtonContainer>:null}
        </div>
        <div className="d-flex justify-content-center py-5">
        {this.state.key !== '0' ?
          (
            this.state.showKey ?
            <div>
              <h4>Your Key: 
                {this.state.key}
              </h4>
              <button className="btn btn-warning" onClick={() => {this.setState({showKey: !this.state.showKey})}}>Hide Key</button>
            </div>
            :<button className="btn btn-primary" onClick={() => {this.setState({showKey: !this.state.showKey})}}>Show Key</button>
          )
          :null}

          {this.props.state === "ArrivedToDestination"  ?
            <form onSubmit={this.verifyKeyBuyer}>
              <div className="form-group">
              <label htmlFor='key'>Enter Transporter key: </label>
              <input
                className="form-control"
                type='text'
                name='transporterKey'
                value={this.state.transporterKey}
                onChange={this.handleChange}
                id='transporterKey'
              />
              </div>
              {this.state.transporterKey !== '0' && this.state.transporterKey !== '' ? <button className="btn">Verify</button> : null}
            </form>
          : null}

        </div>
      </div>

    )
  }
}
// {(this.props.state==='waitingForVerificationbySeller' && !this.props.buyClicked) ? <button onClick={this.buy}>Buy</button>:null}

export default Buyer;
