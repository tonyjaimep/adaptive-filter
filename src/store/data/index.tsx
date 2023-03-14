import React, {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

export enum DataContextActionType {
  SET_SOURCE_DATA,
  SET_NOISY_DATA,
  SET_SMOOTH_DATA,
  RESET_DATA,
}

type Signal = number[];

type SignalData = {
  source: Signal;
  noisy: Signal;
  smooth: Signal;
};

type Action = {
  type: DataContextActionType;
  payload: Signal;
};

const reducer = (state: SignalData, action: Action): SignalData => {
  switch (action.type) {
    case DataContextActionType.SET_SOURCE_DATA:
      return {
        ...state,
        source: action.payload,
      };
    case DataContextActionType.SET_NOISY_DATA:
      return {
        ...state,
        noisy: action.payload,
      };
    case DataContextActionType.SET_SMOOTH_DATA:
      return {
        ...state,
        smooth: action.payload,
      };
    case DataContextActionType.RESET_DATA:
      return {
        source: [],
        noisy: [],
        smooth: [],
      };
  }
};

const initialState: SignalData = {
  smooth: [],
  source: [],
  noisy: [],
};

const SignalDataContext = createContext<SignalData>(initialState);
const SignalDataDispatchContext = createContext<Dispatch<Action>>(() => {});

export const useDispatch = () => useContext(SignalDataDispatchContext);

export const useSourceSignal = () => {
  const { source } = useContext(SignalDataContext);
  return useMemo(() => source, [source]);
};

export const useNoisySignal = () => {
  const { noisy } = useContext(SignalDataContext);
  return useMemo(() => noisy, [noisy]);
};

export const useSmoothSignal = () => {
  const { smooth } = useContext(SignalDataContext);
  return useMemo(() => smooth, [smooth]);
};

export const useSourceDataSetter = () => {
  const dispatch = useDispatch();

  return useCallback(
    (newSignal: Signal) =>
      dispatch({
        type: DataContextActionType.SET_SOURCE_DATA,
        payload: newSignal,
      }),
    [dispatch]
  );
};

export const useNoisyDataSetter = () => {
  const dispatch = useDispatch();

  return useCallback(
    (newSignal: Signal) =>
      dispatch({
        type: DataContextActionType.SET_NOISY_DATA,
        payload: newSignal,
      }),
    [dispatch]
  );
};

export const useSmoothDataSetter = () => {
  const dispatch = useDispatch();

  return useCallback(
    (newSignal: Signal) =>
      dispatch({
        type: DataContextActionType.SET_SMOOTH_DATA,
        payload: newSignal,
      }),
    [dispatch]
  );
};

export const SignalDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SignalDataDispatchContext.Provider value={dispatch}>
      <SignalDataContext.Provider value={state}>
        {children}
      </SignalDataContext.Provider>
    </SignalDataDispatchContext.Provider>
  );
};
