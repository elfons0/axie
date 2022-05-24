import Header from "./components/Header";
import CardExplorer from "./components/CardExplorer";
import RuneExplorer from "./components/RuneExplorer";
import CurseCardExplorer from "./components/CurseCardExplorer";
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
            <Route path="/axiedatabase/" element={<Blank />} />
            <Route path="/axiedatabase/cards" element={<CardExplorer lang={lang}/>} />
            <Route path="/axiedatabase/runes" element={<RuneExplorer lang={lang} />} />
            <Route path="/axiedatabase/charms" element={<Blank />} />
            <Route path="/axiedatabase/curses" element={<CurseCardExplorer lang={lang}/>} />
            <Route path="/axiedatabase/tools" element={<ToolCardExplorer lang={lang}/>} />
            <Route path="/axiedatabase/effects" element={<Blank />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
