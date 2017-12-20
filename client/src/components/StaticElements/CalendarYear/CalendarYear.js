import React, {Component} from "react";
import "./CalendarYear.css";
// import Day from "../CalendarMonth/CalendarBuild/Day.js";


const Modal = ({ show, hide }) => (
  <div style={{ display: show ? 'block' : 'none' }} className='calendar-year-pnl pnl'>
    <p> did it work? </p>
  </div>
)

class CalendarYear extends React.Component {
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
        <div className="calendar-year-comp" onClick= {this.handleOpenModal}>
          <a onClick={this.handleModalDisplay} >
            <p> Year </p>
          </a>
        </div>


        <div className="throw-modal">
          <Modal className="calendar-year-pnl pnl" show={this.state.displayModal} hide={this.handleModalDisplay} />
        </div>

      </div>
      
    )
  }
}




export default CalendarYear;
