import React from "react";
import "./Meetup.css";

const Modal = ({ show, hide }) => (
  <div style={{ display: show ? 'block' : 'none' }} className='meetup-pnl pnl'>
    <p> Your Social Events  </p>
  </div>
)

class Meetup extends React.Component {
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
      <div className="meetup-comp" onClick= {this.handleOpenModal} >
			<a onClick={this.handleModalDisplay} >
				<div className="meetup-div">
					<i class="fa fa-meetup" aria-hidden="true"></i>
					<button className="meetup-btn" type="button">
						Meetup
					</button>
				</div>
			</a>

			<Modal className="meetup-pnl pnl" show={this.state.displayModal} hide={this.handleModalDisplay} />
		</div>
    )
  }
}



export default Meetup;
