import React from 'react';
import './App.css';
import {Button, Label, Header, Menu} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

//const vars
const list = 0;
const play = 1;

//word => { pos_eng, pos_pin, pos_chi, pos_aud                 }
//word => { hello,   ni hao,  你好,    [new Audio("你好.mp3")]] }
const pos_eng = 0;
const pos_pin = 1;
const pos_chi = 2;
const pos_aud = 3;

class Game extends React.Component{
    //constructor - set state
    constructor(props){
        super(props);

        this.state = {
            shouldRedirect:false,
            mode: list,
            currentWord:0,
            currentSound:0,
            showAnswer:false,
            lesson: this.props.lesson.substring(1),
            numLessons: 0,
            words: [],
            selectedWords:[],
        };
    }

    //call mountstuff
    componentDidMount(){
        this.mountStuff();
    }

    //fetch word list and options
    mountStuff(){
        let w = [
            ["you", "ni", "你", []],
            ["good", "hao", "好", []],
            ["hello", "ni hao", "你好", []],
        ];
        let wIndices = [];
        for (let i = 0; i < w.length; i++){
            wIndices.push(i);
        }
        this.setState({ //TODO fetch these values from db
            numLessons : 2, 
            //{eng, pingying, chinese, sound}
            words : w,
            selectedWords : wIndices,
        });
    }

    //play the sound of the word
    playSound(i){
        try{
            this.state.words[this.state.selectedWords[i]][pos_aud][this.state.currentSound].play();
        }
        catch(e){
            console.log("audio error: " + e.code);
        }
    }

    //randomize the current word and set show word to false
    //param wordlist - the list of words
    newRandomWord(){
        let last = this.state.currentWord;
        let newNumber = last;
        while(last === newNumber){
            newNumber = Math.floor(Math.random() * this.state.selectedWords.length);
        }
        let newSound = Math.floor(Math.random() * this.state.words[this.state.selectedWords[newNumber]][pos_aud].length);

        this.setState({
            currentWord: newNumber,
            currentSound: newSound,
            showAnswer:false
        });
    }

    unstarAll(){
        this.setState({
            selectedWords : [],
        });
    }

    starAll(){
        let wIndices = [];
        for (let i = 0; i < this.state.words.length; i++){
            wIndices.push(i);
        }
        this.setState({
            selectedWords : wIndices,
        });
    }

    toggleStar(i){
        console.log(i);
        let newWords = this.state.selectedWords;
        let index = newWords.indexOf(i);
        if(index > -1){
            newWords.splice(index, 1);
        }
        else{
            newWords.push(i);
        }
        this.setState({
            selectedWords : newWords
        });
    }

    //list out all words
    list(){
        let wordList = [];
        let stared = 'star';
        for(let i = 0; i < this.state.words.length; i++){
            if(this.state.selectedWords.indexOf(i) > -1){
                stared = "star";
            }
            else{
                stared = 'star outline';
            }
            wordList.push(
                <Label key={i} color='blue' size='massive'>
                    <Button color='blue' size='big' onClick={()=>{this.playSound(i)}}>
                        {this.state.words[i][pos_eng] + ": " + this.state.words[i][pos_pin] + ": " + this.state.words[i][pos_chi]}
                    </Button>
                    <Button color='blue' icon={stared} onClick={()=>{this.toggleStar(i)}}></Button>
                </Label>
            );
        }

        return (
            <div>
                <Header size='large'>Lesson: {this.state.lesson}</Header>
                <br></br>
                <Button secondary onClick={()=>{this.starAll()}}> Star All </Button>
                <Button secondary onClick={()=>{this.unstarAll()}}>Unstar All</Button>
                <br></br>
                <br></br>
                {wordList}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div id='play'>
                    <Button color='green' size='massive' onClick={()=>{this.setState({mode:play})}}>Start</Button> 
                </div>
            </div>);
    }

    //show the answer if b is true
    //param b - boolean
    //      i - word pos in word list
    showAnswer(b, i){
        if(b){
            return this.state.words[this.state.selectedWords[i]][pos_eng] + 
              ": " + this.state.words[this.state.selectedWords[i]][pos_pin] + 
              ": " + this.state.words[this.state.selectedWords[i]][pos_chi];
        }
        return '';
    }

    //The actual game
    play(){
        let i = this.state.currentWord;
        return (
            <div>
                <Label key={i} color='blue' onClick={()=>{this.playSound(i)}} size='massive'>
                    {this.showAnswer(this.state.showAnswer, i)}
                </Label>
                <br></br>
                <br></br>
                <div>
                    <Button size='massive' color='green' onClick={()=>this.setState({showAnswer:true})}>Show</Button>
                </div>
                <div id='play'>
                    <Button size='large' color='green' onClick={()=>this.newRandomWord(this.state.selectedWords)}>Next</Button>
                    <Button size='large' color='red' onClick={()=>this.setState({mode:list})}>List</Button>
                </div>
            </div>
        );
    }

    //redirect to this page with new lesson value
    //param i - the new lesson value
    redirect(i){
        this.setState({
            shouldRedirect:true,
            lesson:i,
            mode:list
        });
    }

    //should it redirect to game?
    checkRedirect(){
        if(this.state.shouldRedirect){
            return <Redirect to={'/game:' + this.state.lesson}/>;
        }
    }

    //set the mode
    mode(m){
        if(m === list){
            return this.list();
        }
        else if(m === play){
            if(this.state.selectedWords.size < 1){
                this.starAll();
            }
            return this.play();
        }
        return <div/>;
    }

    //render
    render(){
        let items = [];
        for(let i = 0; i < this.state.numLessons; i++){
            items.push(<Button key={i} value={i} active={i === this.state.lesson-1} onClick={()=>this.redirect(i)}>lesson: {i+1}</Button>);
        }

        return (
            <div>
                <Menu items={items}/>
                <br></br>
                {this.mode(this.state.mode)}
                {this.checkRedirect()}
            </div>
        );
    }
};

export default Game;