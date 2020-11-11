import React from 'react';

class Gameboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: 30,
    }
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

  render() {
    const { timer } = this.state;
    return(
      <div className="game-container">
        <div className="question">
          <span className="timer">
            {timer > 0 ? `Time: ${timer}` : `Time's Up`}
          </span>
          <div className="question-category">Category: </div>
          <div className="question-text">Question text</div>
        </div>
        <div className="answers">
          Buttons for answers
        </div>
      </div>
    )
  }
} 

export default Gameboard;