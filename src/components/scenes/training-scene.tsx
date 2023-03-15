import { useCallback, useEffect, useRef } from "react";
import {
  DataContextActionType,
  useDispatch,
  useNoisySignal,
  useSourceSignal,
} from "../../store/data";
import { colors } from "../signal-line/constants";
import { MultiSignalLine } from "../signal-line/multi-signal-line";

const NOISE_INTENSITY = 0.2;
const SAMPLE_SIZE = 3;
const LEARNING_RATE = 0.3;

let weights = Array(SAMPLE_SIZE)
  .fill(0)
  .map(() => Math.random());

const activation = Math.tanh;

type TrainingSceneProps = {
  onNextScene: () => void;
};

const lineColors = [colors.source, colors.noisy];

export const TrainingScene = ({ onNextScene }: TrainingSceneProps) => {
  const dispatch = useDispatch();
  const sourceSignal = useSourceSignal();
  const noisySignal = useNoisySignal();

  const train = useCallback(
    (source: number[]) => {
      const result = source.slice(0, SAMPLE_SIZE);

      for (let i = SAMPLE_SIZE; i < source.length; i++) {
        const v = weights.reduce((previous, current, weightIndex) => {
          return previous + current * source[i - (SAMPLE_SIZE - weightIndex)];
        }, 0);

        const output = activation(v);

        result.push(output);

        const expected = source[i];

        weights = weights.map(
          (weight, index) =>
            weight +
            LEARNING_RATE *
              (expected - output) *
              source[i - (SAMPLE_SIZE - index)]
        );
      }

      dispatch({
        type: DataContextActionType.SET_SMOOTH_DATA,
        payload: result,
      });
    },
    [dispatch]
  );

  useEffect(() => {
    const newNoisyData = sourceSignal.map(
      (value) => value + NOISE_INTENSITY * (Math.random() - 0.5)
    );
    dispatch({
      type: DataContextActionType.SET_NOISY_DATA,
      payload: newNoisyData,
    });

    train(newNoisyData);
  }, [dispatch, train, sourceSignal]);

  return (
    <div className="data-canvas-container">
      <MultiSignalLine data={[sourceSignal, noisySignal]} colors={lineColors} />
      <button onClick={onNextScene}>See output</button>
    </div>
  );
};
