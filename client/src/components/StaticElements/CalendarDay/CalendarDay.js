import React, {Component} from "react";
import "./CalendarDay.css";
// import Day from "../CalendarMonth/CalendarBuild/Day.js";


const Modal = ({ show, hide }) => (
  <div style={{ display: show ? 'block' : 'none' }} className='calendar-day-pnl pnl'>
    <p> YAY LETS GET THIS RESPONSIVE NOW</p>
  </div>
)

class CalendarDay extends React.Component {
  constructor() {
    super()
    this.state = { displayModal: false }
    this.handleModalDisplay = this.handleModalDisplay.bind(this)
  }
  handleModalDisplay(e) {
    console.log("you made a click");
    e.preventDefault()
    this.setState({ displayModal: !this.state.displayModal })
  }
  render() {
    const display = this.state.displayModal.toString()
    return (
      <div>

        <div className="calendar-day-comp" onClick= {this.handleOpenModal}>
          <a onClick={this.handleModalDisplay} >
            <p> Day </p>
          </a>
        </div>


        <div className="throw-modal">
          <Modal className="calendar-day-pnl pnl" show={this.state.displayModal} hide={this.handleModalDisplay} />
        </div>

      </div>
    )
  }
}


export default CalendarDay;
