newQuestionMod() {
  if (this.state.displayNewQuestion) {
    return (
      <div>
        <input
          onChange={this.handleInputChange}
          name='newQuestion'
          value={this.state.newQuestion}
          />
        <button onClick={this.newBlank}>Add Blank</button>
        <button onClick={this.addQuestion}>Add Question</button>
      </div>
    );
  }
}

newQuestion(event) {
  event.preventDefault();
  this.setState({displayNewQuestion: true});
}

newBlank(event){
  event.preventDefault();
  let newQuestion = this.state.newQuestion + ' [BLANK] ';
  this.setState({newQuestion});
}

addQuestion(event) {
  event.preventDefault();
  this.convertNewQuestion();
  this.setState({
    displayNewQuestion: false,
    newQuestion: ''
  });
}

convertQuestions() {
  this.state.questions.forEach( (question, qIdx) => {
    question.forEach( (part, idx) => {
      if (part === ' [BLANK] ') {
        let newState = merge({}, this.state, { questionBlanks: {
          [qIdx]: {
            [idx]: "hello"
          } } }
        );
        this.setState({newState});
      }
    });
  });
  let convertedQuestions = this.state.questions.map( (question, idx) => {
    return this.convertQuestion(question, idx);
  });
  this.setState({ convertedQuestions: convertedQuestions });
}

convertQuestion(question, qIdx) {
  return question.map( (part, idx) => {
    if (part === ' [BLANK] ') {
      return (
        <input
          onChange={this.handleInputChange}
          name={`${qIdx}-${idx}`}
          value={this.state.questionBlanks[qIdx][idx]}
        />
      );
    } else {
      return <p>{part}</p>;
    }
  });
}
