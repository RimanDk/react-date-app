import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>One.com Code Challenge</h1>
      </header>
      <p>
        Extend this application with functionality that can calculate the difference in days between to dates given by the user.
        The result should be something that you would think of as production ready. 
      </p>
      <p>
        <b>Example:</b>
      </p>
      <p>
        Start date: 2021-01-01
        <br />
        End date: 2022-01-01
        <br />
        Result: 365
      </p>
      <p><b>Rules:</b></p>
      <ul>
        <li>It is not allowed to use built-in date functionality</li>
        <li>The start day <strong>should</strong> be included in the result</li>
        <li>The end day <strong>should not</strong> be included in the result</li>
        <li>Styling is optional</li>
        <li>Be creative with the solution</li>
      </ul>
    </div>
  );
}

export default App;
