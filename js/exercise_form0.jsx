import React from 'react';
import merge from 'lodash/merge';

class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);
    this.exData = [
      {
        question: "Comment vous vous appelez?",
        response: "[BLANK] Michel.",
        answers: ["Je m'appelle"]
      },
      {
        question: "Vous avez quel âge?",
        response: "[BLANK] 25 [BLANK] .",
        answers: ["J'ai", "ans"]
      }
    ];
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      blanks: []
    };
    this.makeResps();
  }

  makeResps() {
    let blanks = [];
    this.resps = this.exData.map( (problem) => {
      let respArr = problem.response.split(' ');
      let newResps = respArr.map( (segment, idx) => {
        if (segment === '[BLANK]') {
          blanks.push('');
          let lastBlank = blanks.length - 1;
          return (
            <input
              key={ idx }
              name={ lastBlank }
              onChange={ this.handleInputChange }
              value={ this.state.blanks[lastBlank]}
              />
          );
        } else {
          return <div key={ idx }>{segment}</div>;
        }
      });
      this.state = { blanks: blanks};
      return newResps;
    });
  }

  questions() {
    return this.exData.map( (problem, idx) => {
      return (
        <div key={idx}>
          <div>{idx+1}. { problem.question }</div>
          <div>{ this.resps[idx]}</div>
        </div>
      );
    });
  }

  render() {
    debugger;
    return (
      <form onSubmit={ this.handleSubmit }>
        {this.questions()}
      </form>
    );
  }

  handleInputChange(event) {

    const idx = Number(event.target.name);
    const value = event.target.value;
    let newBlanks = Object.assign([], this.state.blanks);
    newBlanks[idx] = value;
    this.setState( {blanks: newBlanks});
  }

}

export default ExerciseForm;
