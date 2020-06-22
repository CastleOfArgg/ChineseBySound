import React from 'react';
import './App.css';
import {Header} from 'semantic-ui-react';
import CHapp from './CHapp';

//main - has header and CHapp
function App() {
  return (
    <div className="App">
      <Header size='huge'>Learn Chinese By Sound</Header>
      <br></br>
      <CHapp/>
    </div>
  );
}

export default App;
