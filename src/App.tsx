import { useCallback, useState } from "react";
import "./App.css";
import { SceneSwitch } from "./components/scenes/switch";
import { AppScene, nextScene } from "./constants/scenes";
import { SignalDataProvider } from "./store/data";

function App() {
  const [scene, setScene] = useState(AppScene.DATA_SETUP);

  const goToNextScene = useCallback(() => setScene(nextScene), []);

  return (
    <SignalDataProvider>
      <div className="container">
        <div className="scene-container">
          <SceneSwitch scene={scene} onNextScene={goToNextScene} />
        </div>
      </div>
    </SignalDataProvider>
  );
}

export default App;
