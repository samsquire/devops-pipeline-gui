import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { createStore, combineReducers } from 'redux';

const INITIAL_STATE = {};
const INIT = 'INIT';
const BUILD_CHANGING = 'BUILD_CHANGING';

function buildChanging(name, process) {
	return {
		type: 'BUILD_CHANGING',
		name: name,
		process: process
	};
}

function appReducer(state = INITIAL_STATE, action) {
	switch(action.type) {
		case INIT:
			return Object.assign(state, action.state);
		case BUILD_CHANGING:
			
			return Object.assign(state, {
				components: state.components.map((item, index) => {
					if (item.name === action.name) {
						var changedItem = Object.assign({}, item);
						item.process = action.process;
						return changedItem;
					}
					return item;
				})
			});
			
		break;
		default:
		return state;
	}
}

var rootReducer = combineReducers({app: appReducer})

var store = createStore(rootReducer);

var data = {
	
	components: [
		{name: 'terraform/vault', status: 'green', process: 'ready'},
		{name: 'terraform/bastion', status: 'green', process: 'ready'},
		{name: 'terraform/private', status: 'green', process: 'ready'},
		{name: 'terraform/prometheus', status: 'red', process: 'ready'},
		{name: 'packer/ubuntu-java', status: 'green', process: 'ready'},
		{name: 'packer/authenticated-ami', status: 'green', process: 'ready'},
		{name: 'packer/source-ami', status: 'green', process: 'ready'}
	],
	latest: {
		name: "terraform/vpc",
		commands: [
			{name: 'validate', buildIdentifier: '21', progress: 100},
			{name: 'test', buildIdentifier: '21', progress: 100},
			{name: 'package', buildIdentifier: '21', progress: 60},
			{name: 'plan', buildIdentifier: '21', progress: 0},
			{name: 'run', buildIdentifier: '21', progress: 0},
			{name: 'deploy', buildIdentifier: '21', progress: 0},
			{name: 'release', buildIdentifier: '21', progress: 0},
			{name: 'smoke', buildIdentifier: '21', progress: 0}
		]
	},
	pipeline: [
		[{name: 'terraform/vault', status: 'green'},
		{name: 'terraform/bastion', status: 'green'},
		{name: 'terraform/private', status: 'green'}],
		[{name: 'terraform/prometheus', status: 'red'},
		{name: 'packer/ubuntu-java', status: 'green'}],
		[{name: 'packer/authenticated-ami', status: 'green'},
		{name: 'packer/source-ami', status: 'green'}]

	]
}

function chunk(arr, chunkSize) {
  var R = [];
  for (var i=0,len=arr.length; i<len; i+=chunkSize)
    R.push(arr.slice(i,i+chunkSize));
  return R;
}

class ComponentList extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		var items = this.props.components.map((item, index) => {
			var variant = {green: 'success', 'red': 'danger'}[item.status]
			var progressAttributes = {};
			if (item.process === "running") {
				progressAttributes.animated = true;
			}
			
			return (
		 <Card className="mb-4" style={{ width: '15rem' }}>
		  <Card.Body>
			<Card.Title><ProgressBar variant={variant} {...progressAttributes} now="100" />{ item.name }</Card.Title>
			<Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
			<Card.Text>
			  
			</Card.Text>
			<Card.Link href="#">View</Card.Link>
			<Card.Link href="#">Another Link</Card.Link>
		  </Card.Body>
		</Card>);
		});
		
		var chunks = chunk(items, 3);
		var rows = chunks.map((item, index) => {
			return (<Row>
			{ item.map((component, index) => {return (<Col>{component}</Col>); })} 
			</Row>);
		});
		
		return (<Container>
		{rows}
		</Container>)
	}
}

class LatestComponentStatus extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var items = this.props.latest.commands.map((item, index) => {
			return (
		 <Card className="mb-4" style={{ width: '10rem' }}>
		  <Card.Body>
			<Card.Title>{ item.name }</Card.Title>
			<Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
			<Card.Text>
			{item.buildIdentifier}
			<ProgressBar striped variant="success" now={item.progress} />
			
			</Card.Text>
			<Card.Link href="#">View</Card.Link>
		  </Card.Body>
		</Card>);
		});
		
		var chunks = chunk(items, 6);
		var rows = chunks.map((item, index) => {
			return (<Row>
			{ item.map((component, index) => {return (<Col className="pl-0 pr-0">{component}</Col>); })} 
			</Row>);
		});
		
		return (<div><h2>{this.props.latest.name}</h2><Container>
		{rows}
		</Container></div>)
	}
}

class EnvironmentPipeline extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var items = (this.props.pipeline.map((group, index) => {
			
			return group.map((item, index) => { 
				var variant = {green: 'success', 'red': 'danger'}[item.status]
				return  <Card className="mb-0 px-0 py-0 mx-0 my-0" style={{ width: '12rem' }}>
			  <Card.Body>
				<Card.Title></Card.Title>
				<Card.Subtitle className="mb-2 text-muted">{ item.name }</Card.Subtitle>
				<Card.Text>
				  <ProgressBar variant={variant} now="100" />
				</Card.Text>
				<Card.Link href="#">View</Card.Link>
			  </Card.Body>
			</Card>
				});
		}));
	
		var rows = items.map((item, index) => {
			var columns = item.map((cell, index) => { return (<Col className="col-sm">{cell}</Col>)});
			return (<Row>{columns}</Row>)
		});
		return (<Container className="d-flex flex-row">
		{rows}
		</Container>)
	}
}

class MyThing extends React.Component {
  constructor(props) {
    super(props);
    this.showEditor = this.showEditor.bind(this);
	this.handleUsernameChange = this.handleUsernameChange.bind(this);
	this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
		currentValue: "Bye",
		toggled: false,
		username: "",
		password: ""
    };
  }
  
  handleSubmit(event) {
	  console.log("sign in");
	  event.preventDefault();
  }
  
  showEditor() {
	this.setState({toggled: true});	
  }
	  
	handleUsernameChange(event) {
		this.setState({username: event.target.value});
	  }
	  
	    
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	  }
	  
  render() {
    return (
	<Form inline="true"  onSubmit={this.handleSubmit}>
 <Form.Group controlId="formBasicEmail">
    <Form.Control type="email" placeholder="Enter email" onChange={this.handleUsernameChange} value={this.state.username} />
    <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} />
	  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Form.Group>
  </Form>

    )
  }
}



class App extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
	  return (
	  <div className="App">
	   <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
		  <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">devops-pipeline</a>
		  <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
		  <ul class="navbar-nav px-3">
			<li class="nav-item text-nowrap">
			  <a class="nav-link" href="#">Sign out</a>
			</li>
		  </ul>
		</nav>

		<div class="container-fluid">
		  <div class="row">
			<nav class="col-md-2 d-none d-md-block bg-light sidebar">
			  <div class="sidebar-sticky pt-3">
				<ul class="nav flex-column">
				  <li class="nav-item">
					<a class="nav-link active" href="#">
					  <span data-feather="home"></span>
					  Dashboard <span class="sr-only">(current)</span>
					</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="#">
					  <span data-feather="file"></span>
					  Components
					</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="#">
					  <span data-feather="shopping-cart"></span>
					  Environments
					</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="#">
					  <span data-feather="users"></span>
					  Tasks
					</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="#">
					  <span data-feather="bar-chart-2"></span>
					  Jobs
					</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="#">
					  <span data-feather="layers"></span>
					  Tooling
					</a>
				  </li>
				</ul>

		   
				
			  </div>
			</nav>

			<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
			  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h1 class="h2">Dashboard</h1>
				
				<div class="btn-toolbar mb-2 mb-md-0">
				  <div class="btn-group mr-2">
					<button class="btn btn-sm btn-outline-secondary">Share</button>
					<button class="btn btn-sm btn-outline-secondary">Export</button>
				  </div>
				  <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
					<span data-feather="calendar"></span>
					This week
				  </button>
				</div>
				
			  </div>
			  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
			<h2 class="h2">Environment</h2>
			 </div>
			 <h3>Home</h3>
		
			  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
			<h2 class="h2">Components</h2>
			<div class="btn-toolbar mb-2 mb-md-0">
				<Form.Control type="text" placeholder="Component" />
				</div>
			 </div>
			 
			<ComponentList components={this.props.store.getState().app.components} />
			 
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h2 class="h2">Component View</h2>
			</div>
			
			<LatestComponentStatus latest={this.props.store.getState().app.latest} />
			
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h2 class="h2">Pipeline View</h2>
			</div>
			
			<EnvironmentPipeline pipeline={this.props.store.getState().app.pipeline} />
			
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h2 class="h2">Task View</h2>
			</div>
			<h3>terraform/app/test</h3>
			
			
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h2 class="h2">Component Build View</h2>
			</div>
			 
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h2 class="h2">Task Outputs</h2>
			</div>

			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h2 class="h2">Task Log File</h2>
			</div>
			
			
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h2 class="h2">Task Artifacts</h2>
			</div>
			 
			 <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
				<h2 class="h2">Broken</h2>
			</div>
			  
			  <div class="table-responsive">
			   
			  </div>
			</main>
		  </div>
		</div>
		</div>
		
		
	  );
	}
}


store.subscribe(() => {
	ReactDOM.render(<App store={store} />, document.getElementById('root'));
});

store.dispatch({type: 'INIT', state: data});

setTimeout(() => {
	store.dispatch(buildChanging('terraform/bastion', 'running'));
}, 5000);

export default App;
