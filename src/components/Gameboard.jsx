import React from 'react';

class Gameboard extends React.Component {
  render() {
    return(
      <div className="game-container">
        <div className="question">
          <p>Timer</p>
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