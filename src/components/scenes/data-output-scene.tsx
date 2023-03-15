import { useCallback } from "react";
import {
  DataContextActionType,
  useDispatch,
  useNoisySignal,
  useSmoothSignal,
  useSourceSignal,
} from "../../store/data";
import { colors } from "../signal-line/constants";
import { MultiSignalLine } from "../signal-line/multi-signal-line";

type DataOutputSceneProps = {
  onNextScene: () => void;
};

const signalColors = [colors.smooth, colors.source, colors.noisy];

export const DataOutputScene = ({ onNextScene }: DataOutputSceneProps) => {
  const dispatch = useDispatch();
  const sourceSignal = useSourceSignal();
  const noisySignal = useNoisySignal();
  const smoothSignal = useSmoothSignal();

  const onStartOver = useCallback(() => {
    dispatch({
      type: DataContextActionType.RESET_DATA,
      payload: [],
    });
    onNextScene();
  }, [onNextScene]);

  return (
    <>
      <div className="data-canvas-container">
        <MultiSignalLine
          data={[smoothSignal, sourceSignal, noisySignal]}
          colors={signalColors}
        />
      </div>
      <button onClick={onStartOver}>Start over</button>
    </>
  );
};
