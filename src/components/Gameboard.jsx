import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../actions';
class Gameboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: 30,
      counter: 0,
    }
  }

  componentDidMount(){
    const { questionFetch } = this.props;
    questionFetch();
    const miliseconds = 1000;
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

  render() {
    const { counter, timer } = this.state;
    const { results } = this.props;
    return(
      <div className="game-container">
        <div className="question">
          <span className="timer">
            {timer > 0 ? `Time: ${timer}` : `Time's Up`}
          </span>
          <div className="question-category">
            Category: [{ this.decodeHTML(results[counter]) }]
          </div>
          <div className="question-text">Question text</div>
        </div>
        <div className="answers">
          Buttons for answers
        </div>
      </div>
    )
  }
} 

Gameboard.propTypes = {
  questionFetch: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  results: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  questionFetch: () => dispatch(fetchApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);
