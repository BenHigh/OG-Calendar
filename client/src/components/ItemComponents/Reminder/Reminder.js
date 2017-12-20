import React from "react";
import "./Reminder.css";
import ToDoList from "./ToDoList/ToDoList.js";


const Modal = ({ show, hide }) => (
  <div style={{ display: show ? 'block' : 'none' }} className='reminder-pnl pnl'>
    <ToDoList />
  </div>
)

class Reminder extends React.Component {
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
      	<div className="reminder-comp">
			<a onClick={this.handleModalDisplay}>
				<div className="reminder-div">
					<i class="fa fa-bell-o" aria-hidden="true"></i>
					<button className="reminder-btn" type="button"> 
						Reminder
					</button>
				</div>
			</a>

			<Modal className="reminder-pnl pnl" show={this.state.displayModal} hide={this.handleModalDisplay} />
		</div>
    )
  }
}



export default Reminder;