import React from 'react';
import ExerciseForm from './exercise_form.jsx';
import NewForm from './new_form.jsx';

const Exercise = (props) => {
  return (
    <div>
      <header>
        <h1>Exercise {props.number}</h1>
      </header>
      <ExerciseForm />
      New Form:
      <NewForm />
    </div>
  );

};

export default Exercise;
