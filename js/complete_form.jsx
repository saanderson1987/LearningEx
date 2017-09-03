import React from 'react';

class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    let blanks = this.genBlanks(this.props);
    this.state = {
      blanks
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   let blanks = this.genBlanks(nextProps);
  //   this.setState({ blanks });
  // }

  genBlanks(props) {
    let blanks = [];
    if (props.problems) {
      props.problems.forEach( problem => {
        problem.answers.forEach( answer => {
          blanks.push('');
        });
      });
    }
    return blanks;
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        {this.renderProblems()}
      </form>
    );
  }

  renderProblems() {
    return this.props.problems.map( (problem, idx) => {
      return (
        <div key={idx}>
          <div>{idx+1}. { problem.question }</div>
          <div>{ this.renderResponse(idx) }</div>
        </div>
      );
    });
  }

  renderResponse(problemIdx) {
    let problem = this.props.problems[problemIdx];
    let respBlankCount = -1;
    return problem.response.map( (part, idx) => {
      if (part === '[BLANK]') {
        respBlankCount ++;
        return (
          <input
            key={ idx }
            name={ respBlankCount }
            value={ this.state.blanks[respBlankCount] }
            onChange={ this.handleInputChange }
          />
        );
      } else {
        return <div key={ idx }>{ part }</div>;
      }
    });
  }

  handleInputChange(event) {
    const idx = Number(event.target.name);
    const value = event.target.value;
    let newBlanks = Object.assign([], this.state.blanks);
    newBlanks[idx] = value;
    this.setState({ blanks: newBlanks });
  }

}

export default ExerciseForm;
