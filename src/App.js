import React from 'react';
import logo from './logo.svg';
import './App.css';

class MyThing extends React.Component {
  constructor(props) {
    super(props);
    this.showEditor = this.showEditor.bind(this);
    this.state = {
	currentValue: "Bye",
	toggled: false

    };
  }
  showEditor() {
	this.setState({toggled: true});	
  }
  render() {
    let field;
    if (!this.state.toggled) { field = <span>{this.state.currentValue}</span> }
    if (this.state.toggled) {  field = <input type="text"></input> }
    return (
	<div onClick={this.showEditor}>
	    {field}
	 </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Redeploy3 <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
	<MyThing></MyThing>
      </header>
    </div>
  );
}

export default App;
