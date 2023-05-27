import logo from './logo.svg';
import './App.css';
import UniversityList1 from './UniversityList1';
import FavoriteUniversity from './FavoriteUniversity';

function App() {
  return (
    <div className="App">
      <header className="App-header">
    {/*   <img src={logo} className="App-logo" alt="logo" />
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
*/}

        <div>
        <UniversityList1></UniversityList1>
       {/* Comment   <FavoriteUniversity></FavoriteUniversity>*/}
        </div>

      </header>
    </div>
  );
}

export default App;
