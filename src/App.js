import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import QuizInterface from './QuizInterface';
import ExampleRetriever from './ExampleRetriever';
//import TestCode from './TestCode';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/asqb/ExampleRetriever' element={<ExampleRetriever />} />
          {/* <Route path='/database'><ExampleRetriever /></Route> */}
        </Routes>
      </BrowserRouter>
      <ExampleRetriever /> 
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
