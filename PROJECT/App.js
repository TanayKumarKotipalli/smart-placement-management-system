import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  const name = "Padma";

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>This is an example of writing markup using JSX.</p>
      <ul>
        <li>Apple</li>
        <li>Banana</li>
        <li>Mango</li>
      </ul>
    </div>
  );
}
export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);