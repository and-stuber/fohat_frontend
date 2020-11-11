import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { enterUser } from '../actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      name: '',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  checkFields() {
    const { email, name } = this.state;
    let check = true;
    if (email !== '' && name !== '') {
      check = false;
    } return check;
  }

  render() {
    const { name, email } = this.state;
    const { fetchUserData } = this.props;
    return (
      <div className="login-form-container">
        <div className="form-group">
          <label htmlFor="email">Gravatar Email</label>
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            className="form-control"
            value={email}
            onChange={ this.handleChange }
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={ this.handleChange }
          />
        </div>
          <Link
            to='/game'
            onClick={ () => {
              fetchUserData(name,email);
            }}
          >
            <button
              data-testid="btn-play"
              className="btn btn-success btn-login"
              type="button"
              disabled={ this.checkFields() }
            >
            Play
            </button>
          </Link>
      </div>
    )
  }
}

const mapDispatchtoProps = (dispatch) => ({
  fetchUserData: (name, email) => dispatch(enterUser(name, email)),
})

LoginForm.propTypes = {
  fetchUserData: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchtoProps)(LoginForm);