import React from "react";
import moment from 'moment';

const Modal = ({ show, hide }) => (
  <div style={{ display: show ? 'block' : 'none' }} className='calendar-day-pnl pnl'>
    <p> YAY LETS GET THIS RESPONSIVE NOW</p>
  </div>
)

class Day extends React.Component {


//triggers the modal that shows you daily information
  handleModalDisplay(e) {
    console.log("you made a click");
    e.preventDefault()
    this.setState({ displayModal: !this.state.displayModal })
  }

  render() {
    let day = this.props.day;
    let selected = this.props.selected;
    let select = this.props.select;

    return (
      <div
        className={
          "day" +
          (day.isToday ? " today" : "") +
          (day.isCurrentMonth ? "" : " different-month") +
          (day.date.isSame(selected) ? " selected" : "") +
          (day.hasEvents ? " has-events" : "")
        }
        onClick={() => select(day)}
      >
        <div className="day-number">{day.number}</div>
      </div>
    );
  }
}

export default Day;
