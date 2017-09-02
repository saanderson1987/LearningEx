import React from 'react';

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnswerInput = this.handleAnswerInput.bind(this);
    this.handleResponseInput = this.handleResponseInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBlank = this.addBlank.bind(this);
    this.state = {
      question: '',
      response: [''],
      answers: []
    };

  }

  response() {
    let blankCount = this.state.answers.length -1;
    return this.state.response.map( (part, idx) => {
      if (part === '[BLANK]') {
        return (
          <input
            key={ idx }
            name={ blankCount }
            value={ this.state.answers[blankCount] }
            onChange={ this.handleAnswerInput }
          />
        );
      } else {
        return (
          <input
            key={ idx }
            name={ idx }
            value={ this.state.response[idx] }
            onChange={ this.handleResponseInput }
          />
        );
      }
    });
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        Question:
        <input
          name='question'
          value={ this.state.question }
          onChange={ this.handleInputChange }
        />
        Response:
        {this.response()}
      <button onClick={ this.addBlank }>Add Blank</button>
    </form>
    );
  }

  addBlank(event) {
    let newAnswers = Object.assign([], this.state.answers);
    newAnswers.push('');
    this.setState({ answers: newAnswers });
    let newResponse = Object.assign([], this.state.response);
    newResponse.push('[BLANK]');
    this.setState({ response: newResponse });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState( { [name]: value });
  }

  handleAnswerInput(event) {
    const idx = event.target.name;
    const value = event.target.value;
    const newAnswers = Object.assign([], this.state.answers);
    newAnswers[idx] = value;
    this.setState({ answers: newAnswers });
  }

  handleResponseInput(event) {
    const idx = event.target.name;
    const value = event.target.value;
    const newResponse = Object.assign([], this.state.response);
    newResponse[idx] = value;
    this.setState({ response: newResponse });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

}

export default NewForm;
