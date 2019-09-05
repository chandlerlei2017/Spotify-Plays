import React from 'react';

class LoginButton extends React.Component {
  render() {
    return (
      <button className="btn btn-primary" onClick={this.props.onClick}>Click Here</button>
    );
  }
}

export default LoginButton;
