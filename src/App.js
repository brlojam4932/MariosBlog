import "./styles.css";
import Navbar from "./NavBar";
import Home from "./Home";

export default function App() {
  //const person = { name: " ", age: ' ' };
  // person = key name, key age

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Home />
      </div>
    </div>
  );
}
