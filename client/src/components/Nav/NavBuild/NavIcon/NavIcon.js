import React, {Component} from "react";
import "./NavIcon.css";


const Modal = ({ show, hide }) => (
  <div style={{ display: show ? 'block' : 'none' }} className='menu-pnl pnl'>
    <p> friggin' yes </p>
  </div>
)

class NavIcon extends React.Component {
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

		<div className="nav-icon" onClick= {this.handleOpenModal} >
			<a onClick={this.handleModalDisplay}>

		 		<button className="nav-brand-icon" type="button">
		         {this.props.name[0]}
		        </button>
		 	</a>

			<Modal className="menu-pnl pnl" show={this.state.displayModal} hide={this.handleModalDisplay} />
		</div>

    )
  }
}



export default NavIcon;
