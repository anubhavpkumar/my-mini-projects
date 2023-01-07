import logo from './logo.svg';
import './App.css';
import TopNav from './components/topnav';
import ImageText from './components/image-text';
function App() {
  return (
    <div className="App">
      <TopNav />
      <ImageText />
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
