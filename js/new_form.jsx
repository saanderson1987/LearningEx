import React from 'react';
import CompleteForm from './complete_form.jsx';

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    let blankCount = -1;
    return this.state.response.map( (part, idx) => {
      if (part === '[BLANK]') {
        blankCount ++;
        return (
          <input
            key={ idx }
            name={ blankCount }
            value={ this.state.answers[blankCount] }
            onChange={ this.handleResponseInput('answers') }
          />
        );
      } else {
        return (
          <input
            key={ idx }
            name={ idx }
            value={ this.state.response[idx] }
            onChange={ this.handleResponseInput('response') }
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
    let answers = Object.assign([], this.state.answers);
    answers.push('');
    let response = Object.assign([], this.state.response);
    response.push('[BLANK]');
    this.setState({ response, answers });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState( { [name]: value });
  }

  handleResponseInput(valType) {
    return (event) => {
      const idx = event.target.name;
      const value = event.target.value;
      const newVal = Object.assign([], this.state[valType]);
      newVal[idx] = value;
      this.setState({ [valType]: newVal});
    };
  }

  handleSubmit(event) {
    event.preventDefault();

  }

}

export default NewForm;
