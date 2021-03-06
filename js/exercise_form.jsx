import React from 'react';

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
    this.genBlanks();
  }

  genBlanks() {
    let blanks = [];
    this.resps = this.exData.map( (problem) => {
      let respArr = problem.response.split(' ');
      let newResps = respArr.map( (segment, idx) => {
        if (segment === '[BLANK]') {
          blanks.push('');
        }
      });
      // Alternatively, you could push '' to blanks the number of times there are answers, or have this number calculated in the database and send it with the other info;
    });
    let newState = Object.assign({}, this.state, { blanks });
    this.state = newState;
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        {this.questions()}
      </form>
    );
  }

  questions() {
    return this.exData.map( (problem, idx) => {
      return (
        <div key={idx}>
          <div>{idx+1}. { problem.question }</div>
          <div>{ this.responses()[idx]}</div>
        </div>
      );
    });
  }

  responses() {
    let blanksCount = -1;
    let resps = this.exData.map( (problem) => {
      let respArr = problem.response.split(' ');
      let newResps = respArr.map( (segment, idx) => {
        if (segment === '[BLANK]') {
          blanksCount += 1;
          return (
            <input
              key={ idx }
              name={ blanksCount }
              onChange={ this.handleInputChange }
              value={ this.state.blanks[blanksCount]}
            />
          );
        } else {
          return <div key={ idx }>{segment}</div>;
        }
      });
      return newResps;
    });
    return resps;
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
