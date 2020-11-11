import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';

class Header extends React.Component {

  render() {
    const {name, email, score, assertions} = this.props;
    const gravatarLink = 'https://www.gravatar.com/avatar/';
    const emailMD5 = MD5(email);
    localStorage.setItem('state', JSON.stringify({
      player: {name, score, gravatarEmail: email, assertions},
    }));

    return(
      <nav className="user-header">
        <div className="user-info">
          <span>
            <img
              src= { gravatarLink + emailMD5 }
              alt="user image"
              className="picture"
            />
          </span>
            <span>
              Player: { name }
            </span>
        </div>
        <div className="user-score">
          <span>
            Score: { score }
          </span>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.player.name,
  score: state.game.gameBoard.score,
  email: state.user.player.email,
  assertions: state.game.gameBoard.assertions,
});

export default connect(mapStateToProps)(Header);