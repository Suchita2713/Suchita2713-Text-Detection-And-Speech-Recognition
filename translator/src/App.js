import React,{Component} from 'react';
import Sigin from './Components/Signin/Signin';
import Particles from 'react-particles-js';
import './App.css';
import SigninForm from './Components/SigninForm/SigninForm';
import LoginForm from './Components/LoginForm/LoginForm';
import User from './Components/User/User'
import Box from './Components/Test/box'



class App extends Component{
	constructor(){
		super();
		this.state={
			inputvalue:'', 
			url:'',
			box:{}, 
			status:"login",
			userstate:1,
			user:{
				id:'',
				name:'',
				email:'',
				entries:'',
				joined:''

			}
		}
	}

	search=(event)=>{
		this.setState({inputvalue:event.target.value})	
	}

	logedin=()=>{
		this.setState({status:"logedin"})
		this.off()	
	}

	logedout=()=>{
		this.setState({status:"logedout"})
		this.on()
	}
	login=()=>
	{
		this.setState({status:"login"})
		this.on()
	}

	on=()=>{
		this.setState({userstate:1})
	}

	off=()=>{
		this.setState({userstate:0})
	}

	setuser=(user)=>{
		this.setState({user:user})
	}

	render(){ 
    
		if (this.state.status==="logedout") {
			return(
				<div>
					<Particles className="particles"
				params={{
					"particles": {
						"number": {
							"value": 50
					}
					,
						"size": {
							"value": 3
						}
					}
				}} />
					<Sigin userstate={this.state.userstate}logedin={this.logedin} logedout={this.logedout}login={this.login} />
					<SigninForm login={this.login}/>
				</div>
			);
			}
		else if(this.state.status==="login")
		{
			return(
				<div>
					<Particles className="particles"
				params={{
					"particles": {
						"number": {
							"value": 50
					}
					,
						"size": {
							"value": 3
						}
					}
				}} />
					<Sigin userstate={  this.state.userstate} logedin={this.logedin} logedout={this.logedout} login={this.login}/>
					<LoginForm logedout={this.logedout} logedin={this.logedin} setuser={this.setuser}/>
				</div>
			);

		}
		else if(this.state.status==="logedin")
		{
			return(
				<div>
					<Particles className="particles"
				params={{
					"particles": {
						"number": {
							"value": 50
					}
					,
						"size": {
							"value": 3
						}
					}
				}} />
			<Sigin userstate={this.state.userstate} logedin={this.logedin} logedout={this.logedout} login={this.login}/>
			<User user={this.state.user}/>
			<Box/>
				</div>
			);
		}
		}
	}
export default App;
