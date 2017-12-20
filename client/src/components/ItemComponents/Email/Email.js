import React, {Component} from "react";
import "./Email.css";


const Modal = (props) => {
  console.log(props);
  return(
  <div style={{ display: props.show ? 'block' : 'none' }} className='email-pnl pnl'>
    <p> You have recieved 3 new emails: <a href="#"> {props.email} </a> </p>
  </div>)
}

class Email extends React.Component {
  constructor() {
    super()
    this.state = { displayModal: false }
    this.handleModalDisplay = this.handleModalDisplay.bind(this)
  }
  handleModalDisplay(e) {
    e.preventDefault()
    this.setState({ displayModal: !this.state.displayModal })
  }
  render() {
    const display = this.state.displayModal.toString()
    return (
      <div className="email-comp" onClick= {this.handleOpenModal} >
			<a onClick={this.handleModalDisplay} >
				<div className="email-div">
					<i className="fa fa-envelope-o" aria-hidden="true"></i>
					<button className="email-btn" type="button">
						3 New Emails
					</button>
				</div>
			</a>

			<Modal className="email-pnl pnl" show={this.state.displayModal} hide={this.handleModalDisplay} email={this.props.email}/>
		</div>
    )
  }
}




export default Email;
