import React from 'react';

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

  render() {
    const { name, email } = this.state;
    return (
      <div className="login-form-container">
        Login form
        <div className="form-group">
          <label htmlFor="Email">Gravatar Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            onChange={ this.handleChange }
          />
        </div>
      </div>
    )
  }
}

export default LoginForm;