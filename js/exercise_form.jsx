import React from 'react';
import merge from 'lodash/merge';

class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);
    this.exData = [
      {
        question: "Comment vous vous appelez?",
        response: "[BLANK] Michel",
        answers: ["Je m'appelle"]
      },
      {
        question: "Vous avez quel âge?",
        response: "[BLANK] 25 [BLANK]",
        answers: ["J'ai", "ans"]
      }
    ];
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
    };
  }


  question() {
    this.exData.map( (problem, idx) => {
      return <div>{ problem.question }</div>;
    })
  }

  render() {

    return (
      <form onSubmit={ this.handleSubmit }>


      </form>
    );
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

}

export default ExerciseForm;
