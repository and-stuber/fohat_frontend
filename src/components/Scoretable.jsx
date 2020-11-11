import React from 'react';
import PropTypes from 'prop-types';
import './styles/Scoretable.css';
import BtnPlayAgain from './BtnPlayAgain';

const Scoretable = (props) => {
  const { score, asserts } = props;

  const PlayerScore = () => {
    return (
      <span className="score-container">
        <span className="score-info">
          Your score:
        <span className="total-score" data-testid="feedback-total-score"> {score} </span>
        </span>
        <span className="score-info">
          Your assertions:
        <span className="total-score" data-testid="feedback-total-question"> {asserts} </span>
        </span>
      </span>
    )
  }

  const Perfect = () => {
    return (
      <div className="feedback-field">
        <p className="perfect feedback">You Rule! Perfect!</p>
        <div className="score-field">
          <PlayerScore />
        </div>
      </div>
    )
  }

  const Win = () => {
    return (
      <div className="feedback-field">
        <p className="win feedback">You win!</p>
        <div className="score-field">
          <PlayerScore />
        </div>
      </div>
    )
  }

  const Gameover = () => {
    return (
      <div className="feedback-field">
        <p className="gameover feedback">Sorry...</p>
        <div className="score-field">
          <PlayerScore />
        </div>
      </div>
    )
  }

  const Feed = () => {
    if (asserts === 5) { return (<Perfect />) }
    if (asserts >= 3) { return (<Win />) }
    if (asserts < 3) { return (<Gameover />) }
  }

  return (
    <div>
      <Feed />
      <BtnPlayAgain />
    </div>
  )
}

Scoretable.propTypes = {
  asserts: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
}

export default Scoretable;