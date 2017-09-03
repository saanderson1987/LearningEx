import React from 'react';
import CompleteForm from './complete_form.jsx';

class NewForm0 extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleResponseInput = this.handleResponseInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBlank = this.addBlank.bind(this);
    this.state = {
      problems: [
        {
          question: '',
          response: [''],
          answers: []
        }
      ],
    };

  }

  renderResponse(problemIdx) {
    let problem = this.state.problems[problemIdx];
    let respBlankCount = -1;
    return problem.response.map( (part, idx) => {
      if (part === '[BLANK]') {
        respBlankCount ++;
        return (
          <input
            key={ idx }
            name={ respBlankCount }
            value={ problem.answers[respBlankCount] }
            onChange={ this.handleResponseInput('answers', problemIdx) }
          />
        );
      } else {
        return (
          <input
            key={ idx }
            name={ idx }
            value={ problem.response[idx] }
            onChange={ this.handleResponseInput('response', problemIdx) }
          />
        );
      }
    });
  }

  renderProblems() {
    return this.state.problems.map( (problem, idx) => {
      return (
        <div key={idx}>
          Question:
          <input
            name='question'
            value={ this.state.problems[idx].question }
            onChange={ this.handleInputChange(idx) }
          />
          Response:
          {this.renderResponse(idx)}
          <button onClick={ this.addBlank(idx) }>Add Blank</button>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          { this.renderProblems() }
        </form>
        <br/>
        <button onClick={ this.showForm }>Generate Form</button>
        <CompleteForm problems={ this.state.problems }  />
      </div>
    );
  }

  addBlank(problemIdx) {
    return (event) => {
      const problems = Object.assign([], this.state.problems);
      problems[problemIdx].answers.push('');
      problems[problemIdx].response.push('[BLANK]');
      this.setState({ problems });
    };
  }

  showForm() {

  }

  handleInputChange(problemIdx) {
    return (event) => {
      const name = event.target.name;
      const value = event.target.value;
      const problems = Object.assign([], this.state.problems);
      problems[problemIdx].question = value;
      this.setState( { problems });
    };
  }

  handleResponseInput(valType, problemIdx) {
    return (event) => {
      const idx = event.target.name;
      const value = event.target.value;
      const problems = Object.assign([], this.state.problems);
      problems[problemIdx][valType][idx] = value;
      this.setState({ problems });
    };
  }

  handleSubmit(event) {
    event.preventDefault();

  }

}

export default NewForm0;
