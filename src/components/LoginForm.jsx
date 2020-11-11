import React from 'react';
import { Link } from 'react-router-dom';

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
    return (
      <div className="login-form-container">
        Login form
        <div className="form-group">
          <label htmlFor="email">Gravatar Email</label>
          <input
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
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={ this.handleChange }
          />
        </div>
        <Link
          to='/game'
          onClick={"#"}
        >
          <button
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

export default LoginForm;