import HashPowMethod from "./components/HashPowMethod";
import SimpleMethod from "./components/SimpleMethod";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h1>Маннанов Марат ИВТ-424</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
        <SimpleMethod />
        <HashPowMethod />
      </div>
    </div>
  );
}

export default App;
