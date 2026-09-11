import React from "react";

function Student(props) {
  return (
    <div>
      <h2>Student Name: {props.name}</h2>
      <h3>Course: {props.course}</h3>
    </div>
  );
}

export default Student;