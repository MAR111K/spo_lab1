import BinaryMethod from "./components/BinaryMethod";
import HashPowMethod from "./components/HashPowMethod";
import LogSearch from "./components/LogSearch";
import SimpleMethod from "./components/SimpleMethod";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
      <SimpleMethod />
      <BinaryMethod />
      <LogSearch />
      <HashPowMethod/>
    </div>
  );
}

export default App;
