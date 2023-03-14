export enum AppScene {
  DATA_SETUP,
  TRAINING,
  OUTPUT,
}

export const nextScene = (scene: AppScene) => {
  console.log(scene);
  switch (scene) {
    case AppScene.DATA_SETUP:
      return AppScene.TRAINING;
    case AppScene.TRAINING:
      return AppScene.OUTPUT;
    case AppScene.OUTPUT:
      return AppScene.DATA_SETUP;
  }
};
