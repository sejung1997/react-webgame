import React, { useRef, useState, useCallback } from "react";
import Try from "./Try";
// PureComponent : 클라스 컴포넌트에서 state가 바뀌거나 props가 바뀌었을때만 렌더링 되게 한다.
// shouldComponentUpdate: 클라스 컴포넌트에서 update 될때를 지정함
// memo: 함수 컴포넌트에에서 state가 바뀌거나 props가 바뀌었을때만 렌더링 되게 한다.(부모 컴포넌트가 바꿨을 때는 X)
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = () => {
  const [answer, setAnswer] = useState(getNumbers); // lazy init
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (value === answer.join("")) {
        setTries((t) => [
          ...t,
          {
            try: value,
            result: "홈런!",
          },
        ]);
        setResult("홈런!");
        alert("게임을 다시 실행합니다.");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        const answerArray = value.split("").map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`); // state set은 비동기
          alert("게임을 다시 시작합니다.");
          setValue("");
          setAnswer(getNumbers());
          setTries([]);
          inputEl.current.focus();
        } else {
          console.log("답은", answer.join(""));
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === answer[i]) {
              console.log("strike", answerArray[i], answer[i]);
              strike += 1;
            } else if (answer.includes(answerArray[i])) {
              console.log(
                "ball",
                answerArray[i],
                answer.indexOf(answerArray[i])
              );
              ball += 1;
            }
          }
          setTries((t) => [
            ...t,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ]);
          setValue("");
          inputEl.current.focus();
        }
      }
    },
    [value, answer]
  );

  const onChangeInput = useCallback((e) => setValue(e.target.value), []);

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default NumberBaseball;
