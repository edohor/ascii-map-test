import React, {useState, useEffect} from "react";
import Results from './components/Results';
import MapPicker from './components/MapPicker';
import MapDisplay from './components/MapDisplay';

function App() {
  const [selectedMap, setSelectedMap] = useState();

  useEffect(() => {

  }, [selectedMap])

  return (
    <div className="App">
      <MapPicker setMapToDisplay={(map) => setSelectedMap(map)}/>
      <MapDisplay map={selectedMap} />
      <Results  map={selectedMap}/>
    </div>
  );
}

export default App;
