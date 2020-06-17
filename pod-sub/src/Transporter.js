import React,{Component} from 'react';
import web3 from './web3.js'
import POD from './POD'

import { ButtonContainer } from './components/Button';

class Transporter extends Component{
  constructor(props){
    super(props)
    this.state = {
      signed:false,
      key:'0',
      keySubmitted:false,
      keyGenerated:false,
      showKey: false,
      buyerKey: '0'
    }
    this.sign = this.sign.bind(this)
    this.update = this.update.bind(this)
    this.tick= this.tick.bind(this)
    this.setKey = this.setKey.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deliverPackage = this.deliverPackage.bind(this)
    this.verifyTransporter = this.verifyTransporter.bind(this)
  }
  sign = (event) => {
    this.setState({
      signed:true
    })

    this.props.SignTermsAndConditions(this.props.address)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  setKey(evt){
    evt.preventDefault();
    this.setState({
      keySubmitted: !this.state.keySubmitted
    })
  }

  async deliverPackage(){
    await POD.methods.deliverPackage().send({
      from: this.props.address
    })
  }

  async verifyTransporter(evt){
    evt.preventDefault()
    await POD.methods.verifyTransporter(this.state.key,this.state.buyerKey).send({
      from: this.props.address
    })
  }


  async tick() {
    console.log("tick",this.props.index)
    if(this.props.index !== await POD.methods.state().call()){
      this.props.reRender();
    }
    let keyt = await POD.methods.returnKey().call({
      from: this.props.address
    })
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
          <img className="img-rounded" src="owl.jpg" />
        </div>
        <div className="d-flex justify-content-center">
          <h1 className="text-uppercase text-title">transporter</h1>
       </div>
       <div className="d-flex justify-content-center">
    <p>Adderss: {this.props.address.slice(0, 4)}...{this.props.address.slice(25, 29)}</p>
       </div>
       <div className="d-flex justify-content-center">
       <h3>
         {this.props.state==="waitingForVerificationbyTransporter"?"Please agree the Terms and Conditions":"Please wait..."}
         {this.props.state==="PackageAndTransporterKeyCreated"?"Package is ready to be delivered!":null}
      </h3>
       </div>
       <div className="d-flex justify-content-center py-5">
          <h3>Price: {this.props.price}</h3>
       </div>        
        <div className="d-flex justify-content-center">
          {this.props.state==='waitingForVerificationbyTransporter' ?  <ButtonContainer onClick={this.sign}>Agree terms and conditions</ButtonContainer>:null}
        </div>
        <div className="d-flex justify-content-center py-5">
          {this.state.key !== '0' ?
            (
              this.state.showKey ?
              <div>
                <h3>key: {this.state.key}</h3>
                <button className="btn btn-warning" onClick={() => {this.setState({showKey: !this.state.showKey})}}>Hide Key</button>
              </div>
              :<button className="btn btn-primary" onClick={() => {this.setState({showKey: !this.state.showKey})}}>Show Key</button>
            )
            :null}
        </div>

        <div className="d-flex justify-content-center">
        {this.props.state === "PackageAndTransporterKeyCreated" ?
          
            <ButtonContainer onClick={this.deliverPackage}>Start Package Delivery</ButtonContainer>
    
        : null}
        </div>

          {this.props.state === "PackageKeyGivenToBuyer"  ?
            <form onSubmit={this.verifyTransporter}>
              <div className="form-group">
              <label htmlFor='key'>Enter Buyer key: </label>
                <input
                  className="form-control"
                  type='text'
                  name='buyerKey'
                  value={this.state.buyerKey}
                  onChange={this.handleChange}
                  id='buyerKey'
                />
              </div>
              {this.state.buyerKey !== '0' && this.state.buyerKey !== '' ? <button className="btn">Submit</button> : null}
            </form>
          : null}


        </div>
      
    )
  }
}

export default Transporter;
