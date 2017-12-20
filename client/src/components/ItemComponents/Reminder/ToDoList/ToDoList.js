import React, {Component} from "react";
import "./ToDoList.css";

class Item extends React.Component {
  constructor(props){
    super(props);
    this.changeCheck = this.changeCheck.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  
  changeCheck(){
    this.props.changeCheck(this.props.id);
  }
  
  deleteItem(){
    this.props.deleteItem(this.props.id);
  }
  
  render(){
    const id = "item"+ this.props.id;
    const checked = this.props.checked === true ? "checked" : "not-checked"; 
    const checkClass = "circle " + checked;
    
    const name = this.props.name;
    const outputName = name.length > 22 ? name.substring(0,24) + "..." : name;
    return(
      <div className="item" id={id}>
        <div className={checkClass} onClick={this.changeCheck}></div>
        <h2>{outputName}</h2>
        <button className="delete-btn" onClick={this.deleteItem}><i class="fa fa-times" aria-hidden="true"></i></button>
      </div>
    );
  }
}


class ItemList extends React.Component {
  constructor(props){
    super(props);
    this.changeCheck = this.changeCheck.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  
  changeCheck(value){
    this.props.changeCheck(value);
  }
  deleteItem(value){
    this.props.deleteItem(value);
  }
  
  render(){
    var item = this.props.items.map(item => (
      <Item name={item.text} id={item.id} checked={item.checked} changeCheck={this.changeCheck} deleteItem={this.deleteItem} />
    ));
    return(<ul className="itemList">{item}</ul>);
  }
}


class ToDoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [
        {text:"Wake up", id: "001", checked: true },
        {text:"Gym", id: "002", checked: false },
        {text:"Lunch", id: "003", checked: false  },
        {text:"Meal prep", id: "004", checked: false },
        ],
      inputValue : ''
    }
    this.checkItem = this.checkItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submitValue = this.submitValue.bind(this);
  }
  
  checkItem(value){
    var array = this.state.items;
    var index;
    array.map(item => (
      item.id == value ? index = array.indexOf(item) : ''
    ));
    var item = this.state.items[index];
    var newCheck = item.checked == true ? false : true;
    item.checked = newCheck;
    this.setState({items: array});

  }
  
  deleteItem(value){
    var array = this.state.items;
    var index;
    array.map(item => (
      item.id == value ? index = array.indexOf(item) : ''
    ));
    array.splice(index, 1);
    this.setState({ items : array });
  }
  
  inputChange(e){
    this.setState({inputValue: e.target.value});
  }
  
  submitValue(e){
    e.preventDefault();
    console.log(this.state.inputValue);
    var value = {text: this.state.inputValue, id: Date.now()};
    var newItems = this.state.items.concat(value);
    this.setState({
      items: newItems,
      inputValue: ''
    });
    
  }
  
  render(){
    return(
      <div className="to-do-list">
        <h1>Add a new reminder: </h1>
        <form onSubmit={this.submitValue}>
          <input type="text" value={this.state.inputValue} onChange={this.inputChange} placeholder="add new todo"/>
          <button className="add-btn"> <i class="fa fa-plus" aria-hidden="true"></i> </button>
        </form>
        <ItemList items={this.state.items} deleteItem={this.deleteItem} changeCheck={this.checkItem}  />
      </div>
    );
  }
}

export default ToDoList;

