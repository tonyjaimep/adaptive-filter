import { useCallback, useRef, useState } from "react";
import { useSourceDataSetter } from "../../store/data";
import { SignalLine } from "../signal-line/signal-line";

type DataSetupSceneProps = {
  onNextScene: () => void;
};

export const DataSetupScene = ({ onNextScene }: DataSetupSceneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const captureInterval = useRef<number>();
  const rerenderInterval = useRef<number>();
  const dataRef = useRef<number[]>([]);
  const [data, setData] = useState<number[]>([]);
  const sourceDataSetter = useSourceDataSetter();

  const resetState = () => {
    setData([]);
    dataRef.current = [];
  };

  const submit = () => {
    console.log("Setting data to", data);
    sourceDataSetter(data);
    onNextScene();
  };

  const startCapturingValues = useCallback(() => {
    const captureLastValue = () => {
      if (inputRef.current === null) return;

      const newValue = parseFloat(inputRef.current.value);
      dataRef.current.push(newValue);
    };

    const rerender = () => {
      setData([...dataRef.current]);
    };

    captureInterval.current = setInterval(() => captureLastValue(), 5);
    rerenderInterval.current = setInterval(() => rerender(), 100);
  }, []);

  const stopCapturingValues = useCallback(() => {
    clearInterval(captureInterval.current);
    clearInterval(rerenderInterval.current);
    setData([...dataRef.current]);
  }, []);

  return (
    <>
      <div className="data-setup-container">
        <div className="data-canvas-container">
          <SignalLine data={data} />
        </div>
        <input
          type="range"
          min="-1"
          max="1"
          orient="vertical"
          defaultValue="0"
          ref={inputRef}
          step="0.001"
          className="data-setup-slider"
          onMouseDown={startCapturingValues}
          onMouseUp={stopCapturingValues}
        />
      </div>
      <p className="source-signal-length">{data.length}</p>
      <button onClick={resetState}>Reset state</button>
      <button onClick={submit}>Done</button>
    </>
  );
};
