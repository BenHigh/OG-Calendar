import React, {Component} from "react";
import "./CalendarWeek.css";
// import Day from "../CalendarMonth/CalendarBuild/Day.js";


const Modal = ({ show, hide }) => (
  <div style={{ display: show ? 'flex' : 'none' }} className='calendar-week-pnl pnl'>
    <p> did it work? </p>
  </div>
)

class CalendarWeek extends React.Component {
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

      <div>
        <div className="calendar-week-comp" onClick= {this.handleOpenModal}>
          <a onClick={this.handleModalDisplay} >
            <p> Week </p>
          </a>
        </div>


      <div className="my-modal">
        <div className="throw-modal">
          <Modal className="calendar-week-pnl pnl" show={this.state.displayModal} hide={this.handleModalDisplay} />
        </div>
      </div>

      </div>
    )
  }
}



export default CalendarWeek;
