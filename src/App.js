import Header from "./components/Header";
import CardExplorer from "./components/CardExplorer";
import RuneExplorer from "./components/RuneExplorer";
import ToolCardExplorer from "./components/ToolCardExplorer";

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
            <Route path="/axiedatabase/cards" element={<CardExplorer lang={lang}/>} />
            <Route path="/axiedatabase/runes" element={<RuneExplorer lang={lang} />} />
            <Route path="/axiedatabase/charms" element={<Blank />} />
            <Route path="/axiedatabase/curses" element={<Blank />} />
            <Route path="/axiedatabase/tools" element={<ToolCardExplorer />} />
            <Route path="/axiedatabase/effects" element={<Blank />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
