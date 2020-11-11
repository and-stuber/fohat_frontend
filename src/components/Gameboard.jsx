import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../actions';
class Gameboard extends React.Component {
  constructor(props) {
    super(props)
    this.decodeHTML = this.decodeHTML.bind(this);
    this.state = {
      stop: false,
      timer: 30,
      counter: 0,
    }
  }

  componentDidMount(){
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

  shuffle(array) {
    const { randomNumber } = this.state;
    [array[0], array[randomNumber]] = [array[randomNumber], array[0]];
    return array;
  }

  render() {
    const { counter, timer, stop } = this.state;
    const { results, isFetching } = this.props;

    if (isFetching) {
      return <div className="container-game loading">Loading questions...</div>;
    }

    return(
      <div className="game-container">
        <div className="question">
          <span className="timer">
            {timer > 0 ? `Time: ${timer}` : `Time's Up`}
          </span>
          <div className="question-category">
            Category: [{ this.decodeHTML(results[counter].category) }]
          </div>
          <div className="question-text">
          { this.decodeHTML(results[counter].question) }
          </div>
        </div>
        <div className="answers">
        { this.shuffle([(
              <button
                key="correct"
                style={ { border: `${stop ? '3' : '0'}px solid rgb(6, 240, 15)` } }
                type="button"
                className="correct-answer"
                onClick={"#"}
                disabled={ stop }
              >
                { this.decodeHTML(results[counter].correct_answer) }
              </button>),
            ...results[counter].incorrect_answers.map((answer, index) => (
              <button
                key={ `incorrect-${index}` }
                style={ { border: `${stop ? '3' : '0'}px solid rgb(255, 0, 0)` } }
                type="button"
                className="wrong-answer"
                onClick={ () => { this.setState({ stop: true }); } }
                disabled={ stop }
              >
                { this.decodeHTML(answer) }
              </button>))])}
        </div>
      </div>
    )
  }
} 

Gameboard.propTypes = {
  questionFetch: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(Object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.game.isFetching,
  results: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  questionFetch: () => dispatch(fetchApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);
