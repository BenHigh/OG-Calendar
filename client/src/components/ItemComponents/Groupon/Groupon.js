import React from "react";
import "./Groupon.css";


const Modal = ({ show, hide }) => (
  <div style= {{ display: show ? 'block' : 'none' }} className='groupon-pnl pnl'>
    <p> New deals from groupon: <br /> Visit <a href="#"> groupon.com </a> to checkout deals now. </p>
  </div>
)

class Groupon extends React.Component {
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
      	<div className="groupon-comp">
			<a onClick={this.handleModalDisplay}>
				<div className="groupon-div">
					<i class="fa fa-users" aria-hidden="true"></i>
					<button className="groupon-btn" type="button"> 
						Groupon 
					</button>
				</div>
			</a>


			<Modal className="groupon-pnl pnl" show={this.state.displayModal} hide={this.handleModalDisplay} />
		</div>
    )
  }
}


export default Groupon;