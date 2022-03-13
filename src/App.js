import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
//import QuizInterface from './QuizInterface';
import ExampleRetriever from './ExampleRetriever';
import QuizInterface from './QuizInterface';
import SwipeTest from './SwipeTest';
import QuizInterfaceMobileTest from './QuizInterfaceMobileTest';
import TestVirtualize from './TestVirtualize';
import SRSBuilder from './SRSBuilder';
import Menu from './Menu';
import QuizInterfaceNoUpdate from './QuizInterfaceNoUpdate';
//import TestUpdateQB from './TestUpdateQB';
//import TestCode from './TestCode';

function App() {
  return (
    <div className="App">
      {/* <QuizInterface /> */}
      {/* <TestVirtualize />
      <QuizInterfaceMobileTest />
      <SwipeTest /> */}
      {/* <TestUpdateQB /> */}
      <HashRouter>
        <Routes>
          <Route exact path='/ExampleRetriever' element={<ExampleRetriever />} />
          <Route exact path='/SRSBuilder' element={<SRSBuilder />} />
          <Route exact path='/QuizInterface' element={<QuizInterface />} />
          <Route exact path='/QuizInterfaceNoUpdate' element={<QuizInterfaceNoUpdate />} />
          <Route exact path='/Menu' element={<Menu /> } />
          {/* 
          <Route path='/ExampleRetriever'><ExampleRetriever /></Route>
          <Route path='/asqb/ExampleRetriever' exact component={ExampleRetriever} />
          <Route path='/asqb/ExampleRetriever' element={<ExampleRetriever />} />
          <Route path='/database'><ExampleRetriever /></Route> */}
        </Routes>
      </HashRouter>
      {/* <ExampleRetriever />  */}
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
