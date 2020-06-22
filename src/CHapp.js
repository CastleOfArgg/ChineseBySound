import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import CHappIntro from './CHappIntro';
import Game from './Game';

class CHapp extends React.Component{

    //render everything -> is router
    //main page redirects to intro page
    //intro - see CHappIntro.js
    //game - see Game.js
    render(){
        const intro = () => (
            <CHappIntro link={"/game:1"}/>
        );
        const game = ({match}) => (
            <Game lesson={match.params.lesson}/>
        );

        return (
            <div id="CHapp">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/intro"/>
                        </Route>
                        <Route exact path="/intro" component={intro}/>
                        <Route exact path="/game:lesson" component={game}/>
                    </Switch>
                </Router>
            </div>
        );
    }
};

export default CHapp;