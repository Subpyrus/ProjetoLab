import React, {Component} from 'react'
import { Row } from 'reactstrap';
import { trivia } from './Quizz';

class PokemonTrivia extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            questions : trivia,
            ready: false,
            arrayRandom: [],
            correctAnswers: 0,
            incorrectAnswers: 0,
            ObjectQuestion: [],
            question: "",
            answers: [],
            randomized: false,
            questionNumber: 0
        }
    }

    randomizeAnswers = () => {
        var answersArray = [];
        var repeated,number;
        var arrayInput = [];
        for(let i = 0; i < 4; i++) {
            if(arrayInput.length === 0) {
                arrayInput.push(Math.floor((Math.random() * 4)) - 1)
            }else {
                do{
                    repeated = 0;
                    number = Math.floor((Math.random() * 4) -1)
                    for(let x = 0; x < arrayInput.length; x++) {
                        if(number === arrayInput[x]) {
                            repeated++;
                        }
                    }
                }while(repeated != 0)
                arrayInput.push(number);
            }
        }
        for(var x = 0; x < arrayInput.length; x++) {
            if(arrayInput[x] === -1) {
                answersArray.push({answer : this.state.ObjectQuestion.correct_answer, res:'correct'})
            }else {
                answersArray.push({answer : this.state.ObjectQuestion.incorrect_answers[arrayInput[x]], res:'incorrect'})
            }
        }
        this.setState({question: this.state.ObjectQuestion.question, randomized: true, answers: answersArray})
    }

    correctAnswer = () => {
        var changeQuestion = this.state.questionNumber + 1;
        var correct = this.state.correctAnswers + 1;
        this.setState({randomized:false, correctAnswers: correct, ObjectQuestion: this.state.questions[this.state.arrayRandom[changeQuestion]], questionNumber: changeQuestion})
    }

    incorrectAnswer = () => {
        var changeQuestion = this.state.questionNumber + 1;
        var incorrect = this.state.incorrectAnswers + 1;
        this.setState({randomized:false, incorrectAnswers: incorrect, ObjectQuestion: this.state.questions[this.state.arrayRandom[changeQuestion]], questionNumber: changeQuestion})
    }

    start = () => {
        var repeated,number;
        var arrayInput = [];
        for(let i = 0; i < 10; i++) {
            if(arrayInput.length === 0) {
                arrayInput.push(Math.floor(Math.random() * 47))
            }else {
                do{
                    repeated = 0;
                    number = Math.floor(Math.random() * 47)
                    for(let x = 0; x < arrayInput.length; x++) {
                        if(number === arrayInput[x]) {
                            repeated++;
                        }
                    }
                }while(repeated != 0)
                arrayInput.push(number);
            }
        }
        this.setState({ready: true, arrayRandom: arrayInput, ObjectQuestion: this.state.questions[arrayInput[0]]})
    }

    render() {
        if(this.state.ready === false) {
            return(<>
                <h1>Welcome to the PokéTrivia</h1>
                <p>Here you can test your Pokémon Knowledge</p>
                <p>Press the Button when you are ready to test yourself...</p>
                <button onClick={this.start}>Start</button>
            </>)
        }else {
            if((this.state.randomized === false) && (this.state.ObjectQuestion != undefined)) {
                this.randomizeAnswers()
                return(<></>)
            }else {
                if((this.state.randomized === true) && (this.state.ObjectQuestion != undefined)) {
                    return(<>
                        <h1>Question {this.state.questionNumber + 1}</h1>
                        <h2>{this.state.question}</h2>
                        {this.state.answers.map((index, key) => {
                            if(index.res === 'correct') {
                                return(
                                    <>
                                        <button onClick={this.correctAnswer}>{index.answer}</button>
                                        <br></br>
                                    </>
                                )
                            }else {
                                return(
                                    <>
                                        <button onClick={this.incorrectAnswer}>{index.answer}</button>
                                        <br></br>
                                    </>
                                )
                            }
                            
                        })}
                    </>)
                }else {
                    return(<>
                        <h1>PokéTrivia Results</h1>
                        <p>Correct Answers: {this.state.correctAnswers}</p>
                        <p>Incorrect Answers: {this.state.incorrectAnswers}</p>
                    </>)
                }
            }
        }
    }
}

export default PokemonTrivia;