import React from 'react';
import PropTypes from 'prop-types';
import Scoretable from '../../components/Scoretable';
import Header from '../../components/Header';
import { connect } from 'react-redux';

const Scoreboard = (props) => {
  const { assertions, score } = props;
  return(
    <div>
      <Header />
      <Scoretable asserts={assertions} score={score} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  assertions: state.game.gameBoard.assertions,
  score: state.game.gameBoard.score,
});

Scoreboard.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Scoreboard);
