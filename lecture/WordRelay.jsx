// 컴포넌트 분리할때 마다 가져와줘야함
const React = require("react");
const { useState } = require("react");

const WordRelay = () => {
  const [word, setWord] = useState("제로초!");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = React.useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
      setValue("");
      inputEl.current.focus();
    } else {
      setResult("땡");
      setValue("");
      inputEl.current.focus();
    }
  };

  return (
    <>
      <div>{word}</div>
      fdf
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};
// 노드의 모듈 시스템, 다른 파일에서 불러올 수 있음.
module.exports = WordRelay;
