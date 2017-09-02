import React from 'react';

class COMPONENT extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: ''
    };
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          name='name'
          value={ this.state.name }
          onChange={ this.handleInputChange }
        />
      <input type="submit" value="Submit" />
    </form>
    );
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState( { [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

}

export default COMPONENT;
