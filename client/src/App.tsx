import Converter from "./components/Converter/Converter.tsx";

import "./App.css";

const App = () => {
  return (
    <main>
      <h1>Currency Converter</h1>
      <p className="description">Get real-time exchange rates and convert your currencies with ease</p>

      <Converter />
    </main>
  );
};

export default App;
