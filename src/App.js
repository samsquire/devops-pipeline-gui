import React from 'react';
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

var components = {
	components: [
	{name: 'terraform/vault'},
	{name: 'terraform/bastion'},
	{name: 'terraform/private'},
	{name: 'terraform/prometheus'},
	{name: 'packer/ubuntu-java'},
	{name: 'packer/authenticated-ami'},
	{name: 'packer/source-ami'}
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
		var items = this.props.components.components.map((item, index) => {
			return (
		 <Card style={{ width: '15rem' }}>
		  <Card.Body>
			<Card.Title>{ item.name }</Card.Title>
			<Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
			<Card.Text>
			  Some quick example text to build on the card title and make up the bulk of
			  the card's content.
			</Card.Text>
			<Card.Link href="#">Card Link</Card.Link>
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



function App() {
  return (
  <div className="App">
   <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">devops-pipeline</a>
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
          <div class="sidebar-sticky">
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
		 
	
		  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h2 class="h2">Components</h2>
         </div>
		 
		

          
          <div class="table-responsive">
           <ComponentList components={components} />
          </div>
        </main>
      </div>
    </div>
	</div>
	
	
  );
}

export default App;
