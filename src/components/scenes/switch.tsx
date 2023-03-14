import { memo, useMemo } from "react";
import { AppScene } from "../../constants/scenes";
import { DataOutputScene } from "./data-output-scene";
import { DataSetupScene } from "./data-setup-scene";
import { TrainingScene } from "./training-scene";

type SceneSwitchProps = {
  scene: AppScene;
  onNextScene: () => void;
};

export const SceneSwitch = memo(({ scene, onNextScene }: SceneSwitchProps) => {
  switch (scene) {
    case AppScene.DATA_SETUP:
      return <DataSetupScene onNextScene={onNextScene} />;
    case AppScene.OUTPUT:
      return <DataOutputScene onNextScene={onNextScene} />;
    case AppScene.TRAINING:
      return <TrainingScene onNextScene={onNextScene} />;
  }
});
