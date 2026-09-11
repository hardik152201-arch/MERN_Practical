import React, { useState } from "react";
import Student from './component/Student';

function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1>Practical - 02</h1>

      <Student
        name="Hardik Parmar"
        course="MERN Stack Development"
      />

      <h2>Counter: {count}</h2>

      <button onClick={increase}>Increase</button>
      <br></br>
      <button onClick={decrease}>Decrease</button>
      <br/>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;