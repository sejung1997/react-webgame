const React = require("react");
const { useState } = React;

const WordRelay = () => {
  const [word, setWord] = useState("제로초");
  const [result, setResult] = useState("");
  const inputEl = React.useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    // e.target.children.word.value = e.target[0].value
    if (word[word.length - 1] === e.target.children[0].value[0]) {
      setResult("딩동댕");
      setWord(e.target.children[0].value);
      e.target.children[0].value = "";
      console.log(e.target.children);

      inputEl.current.focus();
    } else {
      setResult("땡");
      e.target.children[0].value = "";
      inputEl.current.focus();
    }
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
