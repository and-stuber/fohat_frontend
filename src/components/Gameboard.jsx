import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, scoreFunction } from '../actions';
import { Redirect } from 'react-router-dom';
import './styles/Gameboard.css';
class Gameboard extends React.Component {
  constructor(props) {
    super(props)
    this.decodeHTML = this.decodeHTML.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.state = {
      stop: false,
      timer: 30,
      counter: 0,
      randomNumber: 0,
    }
  }

  componentDidMount() {
    this.random();
    const { questionFetch } = this.props;
    const miliseconds = 1000;
    questionFetch();
    this.timerID = setInterval(() => this.timerFunction(), miliseconds);
  }

  timerFunction() {
    const { timer, stop } = this.state;
    if (timer > 0 && !stop) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      this.setState({ stop: true });
    }
  }

  decodeHTML(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  random() {
    const four = 4;
    this.setState({
      randomNumber: Math.floor(Math.random() * (four - 0)) + 0,
    });
  }

  shuffle(array) {
    const { randomNumber } = this.state;
    [array[0], array[randomNumber]] = [array[randomNumber], array[0]];
    return array;
  }

  nextQuestion() {
    const { counter } = this.state;
    this.setState({
      stop: false,
      counter: counter + 1,
      timer: 30,
    });
    this.random();
  }

  render() {
    const { counter, timer, stop } = this.state;
    const { results, isFetching, scoreSum } = this.props;

    if (isFetching) {
      return <div className="container-game loading">Loading questions...</div>;
    }

    const questionAmount = 5;
    if (counter === questionAmount) {
      return <Redirect to="/scoreboard" />;
    }

    return (
      <div className="game-container">
        <div className="game">
          <div className="question">
            <span className="timer">
              {timer > 0 ? `Time: ${timer}` : `Time's Up`}
            </span>
            <div className="question-category" data-testid="question-category">
              Category: [{this.decodeHTML(results[counter].category)}]
            </div>
            <div className="question-text" data-testid="question-text">
              {this.decodeHTML(results[counter].question)}
            </div>
            <button
              type="button"
              className="btn btn-warning mt-4"
              style={stop ? { display: 'block' } : { display: 'none' }}
              onClick={this.nextQuestion}
            >
              Next
          </button>
          </div>
          <div className="answers">
            {this.shuffle([(
              <button
                data-testid="correct-answer"
                key="correct"
                style={{ border: `${stop ? '3' : '0'}px solid rgb(6, 240, 15)` }}
                type="button"
                className="btn btn-secondary mt-4 ml-2 mr-2"
                onClick={
                  () => { scoreSum(timer, counter); this.setState({ stop: true }); }
                }
                disabled={stop}
              >
                { this.decodeHTML(results[counter].correct_answer)}
              </button>),
            ...results[counter].incorrect_answers.map((answer, index) => (
              <button
                data-testid="wrong-answer"
                key={`incorrect-${index}`}
                style={{ border: `${stop ? '3' : '0'}px solid rgb(255, 0, 0)` }}
                type="button"
                className="btn btn-secondary mt-4 ml-2 mr-2"
                onClick={() => { this.setState({ stop: true }); }}
                disabled={stop}
              >
                { this.decodeHTML(answer)}
              </button>))])}
          </div>
        </div>
        <div className="next-question">
        </div>
      </div>
    )
  }
}

Gameboard.propTypes = {
  questionFetch: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(Object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  scoreSum: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.game.isFetching,
  results: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  questionFetch: () => dispatch(fetchApi()),
  scoreSum: (timer, counter) => dispatch(scoreFunction(timer, counter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);
