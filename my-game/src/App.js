import { useEffect, useState, useCallback, useRef } from "react";
function App() {
  const [numbers, setNumbers] = useState([]);
  const [time, setTime] = useState(3000);
  const [value, setValue] = useState("");
  const [record, setRecord] = useState(0);
  const inputEl = useRef(null);

  const setGame = () => {
    const temp = [1, 1].map((el) => Math.floor(Math.random() * 10));
    setNumbers(temp);
  };
  const startTimer = useCallback(() => {
    console.log("실행", time);
    setTimeout(() => {
      setTime((prev) => prev - 100);
    }, 100);
  }, []);

  useEffect(() => {
    setGame();
    startTimer();
    inputEl.current.focus();
  }, []);

  useEffect(() => {
    if (time === 0) return;
    startTimer();
    return () => clearInterval();
  }, [time]);

  const submit = (e) => {
    // e.preventDefault();
    // e.target.value = "";
    console.log("dd");
    if (numbers[0] * numbers[1] === Number(value)) {
      setValue("");
      setRecord((prev) => prev + 1);
      setGame();
      inputEl.current.focus();
    }
  };
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h3>구구단</h3>
        <h1>{`${numbers[0]} x ${numbers[1]}`}</h1> <div>남은시간 {time}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around ",
            width: "100%",
          }}
        >
          <input
            ref={inputEl}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={() => submit}
          />
          <button onClick={submit}>Enter</button>
        </div>
        총 맞춘 개수: {record} 개
      </div>
    </div>
  );
}

export default App;
