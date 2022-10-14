import React, { useState } from 'react';
import { createContext } from 'react';

export const ThemeContext = createContext(null);
function App() {
  const [calc, setCalc] = useState("");
  const [result, setRESULT] = useState("");
  const [theme, setTheme] = useState("light")

  const ops = ['/', '*', '+', '-', '.'];

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  const updateCalc = value => {
    if (ops.includes(value) && calc === '') {
      return;
    }
    if (ops.includes(calc.slice(-1)) && ops.includes(value)) {
      const temp = calc.slice(0, -1).toString();
      setCalc(temp + value);
      return;
    }
    setCalc(calc + value);
    if (!ops.includes(value)) {
      setRESULT(eval((calc + value).toString()));
    }
  }

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
      )
    }
    return digits;
  }

  const calculate = () => {
    setCalc(eval(calc).toString());
  }

  const deleteLast = () => {
    if (calc === '') {
      return;
    }
    setRESULT(eval(calc.slice(0, ops.includes(calc.slice(-2, -1)) ? -2 : -1).toString()));
    setCalc(calc.slice(0, -1).toString());
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <div className="calculator">
          <div className="display">
            {calc ? <span>({result})</span> : ''}
            {calc || "0"}
          </div>
          <div className="operators">
            <button onClick={() => updateCalc('/')}>/</button>
            <button onClick={() => updateCalc('*')}>*</button>
            <button onClick={() => updateCalc('+')}>+</button>
            <button onClick={() => updateCalc('-')}>-</button>
            <button onClick={deleteLast}>DEL</button>
          </div>
          <div className="digits">
            {createDigits()}
            <button onClick={() => updateCalc('0')}>0</button>
            <button onClick={() => updateCalc('.')}>.</button>
            <button onClick={calculate}>=</button>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
export default App;
