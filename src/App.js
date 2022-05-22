import Header from "./components/Header";
import CardExplorer from "./components/CardExplorer";
import RuneExplorer from "./components/RuneExplorer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Blank from "./components/Blank";

function App() {
  const lang = window.navigator.language;

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<CardExplorer lang={lang}/>} />
            <Route path="/runes" element={<RuneExplorer lang={lang} />} />
            <Route path="/charms" element={<Blank />} />
            <Route path="/curses" element={<Blank />} />
            <Route path="/tools" element={<Blank />} />
            <Route path="/effects" element={<Blank />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
