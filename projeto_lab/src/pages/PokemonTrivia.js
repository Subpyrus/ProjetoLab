import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import Loading from '../components/layout/Loading';
import { trivia } from '../components/Quizz';
import { connect } from 'react-redux';
import { addTriviaResult } from '../store/actions/triviaActions';

class PokemonTrivia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: trivia,
            ready: false,
            arrayRandom: [],
            correctAnswers: 0,
            incorrectAnswers: 0,
            ObjectQuestion: [],
            question: "",
            answers: [],
            randomized: false,
            questionNumber: 0,
            btnColorCorrect: false,
            btnColorWrong: false
        }
    }

    randomizeAnswers = () => {
        var answersArray = [];
        var repeated, number;
        var arrayInput = [];
        for (let i = 0; i < 4; i++) {
            if (arrayInput.length === 0) {
                arrayInput.push(Math.floor((Math.random() * 4)) - 1)
            } else {
                do {
                    repeated = 0;
                    number = Math.floor((Math.random() * 4) - 1)
                    for (let x = 0; x < arrayInput.length; x++) {
                        if (number === arrayInput[x]) {
                            repeated++;
                        }
                    }
                } while (repeated !== 0)
                arrayInput.push(number);
            }
        }
        for (var x = 0; x < arrayInput.length; x++) {
            if (arrayInput[x] === -1) {
                answersArray.push({ answer: this.state.ObjectQuestion.correct_answer, res: 'correct' })
            } else {
                answersArray.push({ answer: this.state.ObjectQuestion.incorrect_answers[arrayInput[x]], res: 'incorrect' })
            }
        }
        this.setState({ question: this.state.ObjectQuestion.question, randomized: true, answers: answersArray })
    }

    correctAnswer = () => {
        this.setState({ btnColorCorrect: true, btnColorWrong: true})
        var changeQuestion = this.state.questionNumber + 1;
        var correct = this.state.correctAnswers + 1;
        if (changeQuestion === 10) {
            this.props.addTriviaResult({ correctAnswers: this.state.correctAnswers, wrongAnswers: this.state.incorrectAnswers })
        }
        setTimeout(() => { this.setState({ randomized: false, correctAnswers: correct, ObjectQuestion: this.state.questions[this.state.arrayRandom[changeQuestion]], questionNumber: changeQuestion, btnColorCorrect: false, btnColorWrong: false }) }, 3000)
    }

    incorrectAnswer = () => {
        this.setState({ btnColorWrong: true, btnColorCorrect: true })
        var changeQuestion = this.state.questionNumber + 1;
        if (changeQuestion === 10) {
            this.props.addTriviaResult({ correctAnswers: this.state.correctAnswers, wrongAnswers: this.state.incorrectAnswers })
        }
        var incorrect = this.state.incorrectAnswers + 1;
        setTimeout(() => { this.setState({ randomized: false, incorrectAnswers: incorrect, ObjectQuestion: this.state.questions[this.state.arrayRandom[changeQuestion]], questionNumber: changeQuestion, btnColorWrong: false, btnColorCorrect: false }) }, 3000)
    }

    start = () => {
        var repeated, number;
        var arrayInput = [];
        for (let i = 0; i < 10; i++) {
            if (arrayInput.length === 0) {
                arrayInput.push(Math.floor(Math.random() * 47))
            } else {
                do {
                    repeated = 0;
                    number = Math.floor(Math.random() * 47)
                    for (let x = 0; x < arrayInput.length; x++) {
                        if (number === arrayInput[x]) {
                            repeated++;
                        }
                    }
                } while (repeated !== 0)
                arrayInput.push(number);
            }
        }
        this.setState({ ready: true, arrayRandom: arrayInput, ObjectQuestion: this.state.questions[arrayInput[0]] })
    }

    render() {
        const changeColorCorrect = this.state.btnColorCorrect ? 'success' : 'warning';
        const changeColorWrong = this.state.btnColorWrong ? 'danger' : 'warning';

        if (this.state.ready === false) {
            return (
                <Row className='justify-content-between'>
                    <h1 className='col-12'>PokéTrivia</h1>
                    <Col xs='12' md='8' lg='6'>
                        <p>Do you think you know your fair share of knowledge of the Pokémon universe? How about to play the Trivia that we provided for you in order to determine your what Pokémon you would be based on your intelligence. Are you an intellectual like Alakazam or Metagross or are you as oblivious as Slowpoke or Magikarp? To find the answer just starting playing and check out your profile when you're done to find out what pokémon are you! Good luck!</p>
                        <Col xs='12' className='px-0 py-2 d-flex'>
                            <Button color='warning' className='w-50 mx-auto' onClick={this.start}>Start Trivia</Button>
                        </Col>
                    </Col>
                    <Col className='text-center' xs='12' md='4' lg='5'>
                        <img className='img-fluid py-2 py-md-0' src='' alt='alakazamTrivia' />
                    </Col>
                </Row>
            )
        } else {
            if ((this.state.randomized === false) && (this.state.ObjectQuestion !== undefined)) {
                this.randomizeAnswers();
                return (<Loading height='68vh' />);
            } else {
                if ((this.state.randomized === true) && (this.state.ObjectQuestion !== undefined)) {
                    return (
                        <Row className='justify-content-center text-center'>
                            <h1 className='col-12'>Question {this.state.questionNumber + 1}</h1>
                            <h2 className='col-11 col-md-10 pb-2 pb-md-3'>{this.state.question}</h2>
                            <Col xs='11' md='10'>
                                {this.state.answers.map((index, key) =>
                                    index.res === 'correct' ?
                                        (<Button className='my-3' key={key} block outline color={changeColorCorrect} onClick={() => { this.correctAnswer() }}>{index.answer}</Button>) :
                                        (<Button className='my-3' key={key} block outline color={changeColorWrong} onClick={() => { this.incorrectAnswer() }}>{index.answer}</Button>)
                                )}
                            </Col>
                        </Row>
                    )
                } else {
                    return (
                        <Row>
                            <h1 className='col-12 text-center'>PokéTrivia Results</h1>
                            <Col className='d-flex justify-content-center py-2 py-md-0' xs='12' md='6'>
                                <Button className='w-50' disabled color='success'>Correct Answers:<b>{this.state.correctAnswers}</b></Button>
                            </Col>
                            <Col className='d-flex justify-content-center py-2 py-md-0' xs='12' md='6'>
                                <Button className='w-50' disabled color='danger'>Incorrect Answers:
                                <b>{this.state.incorrectAnswers}</b></Button>
                            </Col>
                            <Col className='d-flex justify-content-center py-3' xs='12'>
                                <Button color="warning" className='w-75' onClick={() => window.location.reload()}>Play Again</Button>
                            </Col>
                        </Row>
                    )
                }
            }
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTriviaResult: (currentResult) => dispatch(addTriviaResult(currentResult))
    }
}

const mapStateToProps = (state) => {
    return {
        updateTrivia: state.trivia.updateTriviaResult
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonTrivia);