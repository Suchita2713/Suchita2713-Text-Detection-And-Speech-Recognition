import { Button,ButtonGroup,Card,Form } from 'react-bootstrap';
import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import App2 from './audio';
import './audio.css';
import Camera, { FACING_MODES, IMAGE_TYPES,ImagePreview } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class Box extends Component{
	constructor(){
		super();
		this.state={
            page:"one",
            case:"off",
            dataUri:"",
            value:'',
            translatedtext:"Hello World"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange=(event)=> {
        var a=event.target.value
        this.setState({value:a})
      }
    
      handleSubmit=(event)=> {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }


	one=()=>{
		this.setState({page:"one"})	
    }

	two=()=>{
		this.setState({page:"two"})	
	}

	three=()=>{
		this.setState({page:"three"})
    }
    

    on=()=>{
		this.setState({case:"on"})	
    }

	off=()=>{
        console.log("off trigerred")
		this.setState({case:"off"})	
    }
    
    handleTakePhotoAnimationDone= (dataUri)=> {
        console.log('takePhoto');
        this.setState({uri:dataUri})
      }


    isFullscreen = false;


    onSubmitText = () => {
        console.log(this.state.value)
        fetch('http://localhost:3000/text', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            data:this.state.value
          })
        })
        .then(response => response.json())
          .then(outcome => {
              console.log(outcome.data)
              this.setState({translatedtext:outcome.data})
            
          })
    }


	render(){ 
    
		if (this.state.page==="one") {
			return(
				<div>
                    <div className="center pa4">
                    <ButtonGroup aria-label="Basic example" >
                        <Button onClick={this.one} variant="secondary">Write</Button>
                        <Button onClick={this.two} variant="secondary">Speak</Button>
                        <Button onClick={this.three} variant="secondary">Click</Button>
                    </ButtonGroup>
                    </div>
                    <Card style={{ width: '40rem' }} className="center">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Here You Can Select your Language And Write!!</Card.Title>
                            <Form.Group controlId="exampleForm.ControlTextarea1" id="textfield">
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control as="textarea" rows={3} value={this.state.value} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1" id="textfield">
                                <Form.Label>Translated Output:</Form.Label>
                                <Form.Control as="textarea" rows={3} value={this.state.translatedtext}/>
                            </Form.Group>
                            <Card.Text>
                            Your Output Will Be Displayed Here.
                            </Card.Text>
                            <Button variant="primary" onClick={this.onSubmitText}>Submit</Button>
                        </Card.Body>
                        </Card>
				</div>
			);
			}
		else if(this.state.page==="two")
		{
			return(
                <div>
				<div className="center pa4">
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={this.one} variant="secondary">Write</Button>
                        <Button onClick={this.two} variant="secondary">Speak</Button>
                        <Button onClick={this.three} variant="secondary">Click</Button>
                    </ButtonGroup>
                </div>
                    <Card style={{ width: '40rem' }} className="center">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Here You Can Speak To get Your Audio Translated!!</Card.Title>
                            <Card.Text>
                            Your Output Will Be Displayed Here.
                            </Card.Text>
                            <App2/>
                        </Card.Body>
                        </Card>
				</div>
			);

		}
		else if(this.state.page==="three" && this.state.case==="on")
		{
			return(
				<div>
                    <div className="center pa4">
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={this.one} variant="secondary">Write</Button>
                        <Button onClick={this.two} variant="secondary">Speak</Button>
                        <Button onClick={this.three} variant="secondary">Click</Button>
                    </ButtonGroup>
                    </div>
                    <Card style={{ width: '40rem' }} className="center">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Here You Can Insert Or Take An Image To Get It Translated</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Example file input" />
                                </Form.Group>
                                </Form>
                                
                            <Card.Text>
                            Your Output Will Be Displayed Here.
                            </Card.Text>
                            <Button variant="primary">Submit</Button>
                        </Card.Body>
                        </Card>
                        <div>
                        <div>
                            {
                                (this.dataUri)
                                ? <ImagePreview dataUri={this.dataUri}
                                    isFullscreen={this.isFullscreen}
                                />
                                : <Camera onTakePhotoAnimationDone = {this.handleTakePhotoAnimationDone}
                                    isFullscreen={this.isFullscreen}
                                />
                            }
                            </div>
                    <Button onClick={this.off}>ON</Button>
				        </div>
				</div>
			);
        }
        
        else if(this.state.page==="three" && this.state.case==="off")
		{
			return(
				<div>
                    <div className="center pa4">
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={this.one} variant="secondary">Write</Button>
                        <Button onClick={this.two} variant="secondary">Speak</Button>
                        <Button onClick={this.three} variant="secondary">Click</Button>
                    </ButtonGroup>
                    </div>
                    <Card style={{ width: '40rem' }} className="center">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Here You Can Insert Or Take An Image To Get It Translated</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Example file input" />
                                </Form.Group>
                                </Form>
                                
                            <Card.Text>
                            Your Output Will Be Displayed Here.
                            </Card.Text>
                            <Button variant="primary">Submit</Button>
                        </Card.Body>
                        </Card>
                        <div>
					<Button onClick={this.on}>OFF</Button>
				</div>
				</div>
			);
		}

		}
    }
    

export default Box;