import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import Logo from './components/Logo'
import {prefixes} from './prefixes'

//component
//state
//lifecysle
//ui

class Apps extends React.Component{

  constructor (props){
    super(props)

    this.state = {
      cardNumber:'',
      valid:false,
      error:'',
      type:''

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkValidity = this.checkValidity.bind(this)
  }

  

  checkValidity () {
    const {cardNumber} = this.state
    let error = ''
    if(cardNumber.length == 16){
    for(let [key,value] of prefixes){
      for(let val of value){
        if(cardNumber.startsWith(val)){
          let valLength = val.length
          console.log(valLength)
          if(cardNumber.substring(0,valLength) == val){
            this.setState({
              type:key,
              valid:true,
              error:''
            })
            return;
          } else{
            error = 'Enter valid Credit Card'
            
          }
        }else{
          error = 'Enter valid Credit Card'
          
        }
      }
    }
  }else{
    error = 'Enter 16 digits credit card number'
  }
  if(error !== ''){
    this.setState({
      error:error
    })
  }
  }

  handleChange(e) {
    let val = e.target.value;
    if(!isNaN(val) ){
      this.setState({
        cardNumber:e.target.value,
        error:''
      })
    }
  }
  handleSubmit (){
    this.setState({
      cardNumber:'',
      error:'',
      valid:false
    })
  }

  componentDidUpdate(prevState){
    if(prevState.cardNumber !== this.state.cardNumber){
      //this.checkValidity()
    }
  }
  render() {
    const {cardNumber, error, valid, type} = this.state
    return (
      <div className="container">
        <h2>Credit Card Number Validation</h2>
        <div className="insideBlk">
          <div className='inputWrapper'>
            <input 
              type ='text'
              maxLength = '16'
              value = {cardNumber}
              onChange ={this.handleChange}
              placeholder="Enter credit card number"
            />
            <button className='btn' onClick={this.handleSubmit}>Reset</button>
            
            {cardNumber.length === 16 && valid === true ? <p style={{color:'green',fontWeight:'bolder'}}>Valid ✓</p> : <p style={{color:'red'}}>{error}</p>}
          </div>
          <div className='logoWrapper'>
            <Logo name= {'visa'} activetype={type} />
          
            <Logo name= {'master'} activetype={type} />
          
            <Logo name= {'amex'} activetype={type} />
          
            <Logo name= {'discover'} activetype={type} />
          </div>

          <button className='btn' onClick={this.checkValidity}>Check</button>
        </div>

      </div>
    )
  }
}

ReactDOM.render(<Apps />, document.getElementById('app'));