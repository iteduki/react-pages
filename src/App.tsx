import React, { useState } from "react";
import { TwitterIcon, TwitterShareButton } from "react-share";

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [clear, setClear] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);

  const initialData = "あみはむ";
  const [randomData, setRandomData] = useState(initialData.split(""));
  const [clearCheck, setClearCheck] = useState(initialData);
  const [clearText, setClearText] = useState("はむぅ！");
  const [gameState, setGameState] = useState({
    randomData,
    clearCheck,
    clearText,
  });

  const getRandom = (data: string[]): string => {
    const index = Math.floor(Math.random() * Math.floor(data.length));
    return data[index];
  };

  const handleClick = () => {
    if (text.endsWith(gameState.clearCheck)) {
      setClear(true);
      setText(text + " " + gameState.clearText);
      return;
    }
    setText(text + getRandom(gameState.randomData));
  };

  const sleep = async (second: number) => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve();
      }, second * 1000);
    });
  };

  const handle10Click = async () => {
    setAutoPlaying(true);

    let currentText: string = text;
    for (let i: number = 0; i < 10; i++) {
      currentText = currentText.concat(getRandom(gameState.randomData));
      setText(currentText);
      if (currentText.endsWith(gameState.clearCheck)) {
        setClear(true);
        setText(`${currentText} ${gameState.clearText}`);
        return;
      }
      await sleep(0.02);
    }
    setAutoPlaying(false);
  };

  const handleReset = () => {
    setText("");
    setClear(false);
    setAutoPlaying(false);
  };

  const pageUrl = "https://kjfsm.github.io/react-pages/";
  const tweetText = () => {
    const threshold = 140 - pageUrl.length - clearCheck.length - clearText.length - 5;
    if (text.length < threshold) {
      return text;
    }

    const endLength = text.length - clearCheck.length - clearText.length - 1;
    return `${text.substr(0, 10)}...この間(${endLength - 10}文字)...${text.substr(endLength)}`;
  };

  return (
    <>
      <div>
        出てくる文字(コンマ区切り)<br />
        <input type="text" value={randomData}
          onChange={(event) => setRandomData(event.target.value.split(","))}
        />
      </div>
      <div>
        当たり<br />
        <input type="text" value={clearCheck}
          onChange={(event) => setClearCheck(event.target.value)}
        />
      </div>
      <div>
        当たりのときに出る文字<br />
        <input type="text" value={clearText}
          onChange={(event) => setClearText(event.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            setGameState({
              randomData,
              clearCheck,
              clearText,
            });
            setText("");
            setClear(false);
            setAutoPlaying(false);
          }}
        >
          決定
        </button>
      </div>
      <div>
        <button onClick={handleClick} disabled={clear || autoPlaying} >{`${gameState.clearCheck}ボタン`}</button>
        <button onClick={handle10Click} disabled={clear || autoPlaying} >{`${gameState.clearCheck}10連ボタン`}</button>
        <button onClick={handleReset} >リセット</button>
        <div>{text}</div>
        <div>いま{text.length}文字</div>
        <TwitterShareButton　title={tweetText()} url={pageUrl} disabled={!clear}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </>
  );
};

export default App;
