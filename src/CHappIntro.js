import React from 'react';
import './App.css';
import {Divider, Container, Button} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

class CHappIntro extends React.Component{
    //constructor - set state
    constructor(props){
        super(props);
        this.state = {
            redirect : false
        };
    }

    //set redirect to game
    setRedirect(b){
        this.setState({redirect:b});
    }

    //should it redirect to game?
    checkRedirect(){
        if(this.state.redirect){
            return <Redirect to={this.props.link}/>;
        }
    }

    //gives intro to what the game is
    render(){
        return (
        <div>
            <Divider></Divider>
            <Container id="msg">
                Learn Chinese By Sound is an interactive site to help learn chinese. This site follows the same material as my
                university class and will be updated as I am introduced to these words!
            </Container>
            <br></br>
            <br></br>
            <div id='play'>
                <Button primary onClick={()=>this.setRedirect(true)}>Begin!</Button>
            </div>
            <br></br>
            <br></br>
            <Divider></Divider>
            {this.checkRedirect()}
        </div>
        );
    }
};

export default CHappIntro;