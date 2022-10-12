import Header from "./components/Header";
import Ronin from "./components/Ronin";
import CardExplorer from "./components/CardExplorer";
import RuneExplorer from "./components/RuneExplorer";
import CharmExplorer from "./components/CharmExplorer";
import CurseCardExplorer from "./components/CurseCardExplorer";
import ToolCardExplorer from "./components/ToolCardExplorer";
import EffectExplorer from "./components/EffectExplorer";
import SummonExplorer from "./components/SummonExplorer";
import TeamExplorer from "./components/TeamExplorer";

import { Routes, Route, MemoryRouter } from "react-router-dom";
import "./App.css";


function App() {
  const lang = window.navigator.language;

  return (
    <div className="App">
      <MemoryRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Ronin />} />
            <Route path="/axiedatabase/cards" element={<CardExplorer lang={lang}/>} />
            <Route path="/axiedatabase/runes" element={<RuneExplorer lang={lang} />} />
            <Route path="/axiedatabase/charms" element={<CharmExplorer lang={lang} />} />
            <Route path="/axiedatabase/curses" element={<CurseCardExplorer lang={lang}/>} />
            <Route path="/axiedatabase/tools" element={<ToolCardExplorer lang={lang}/>} />
            <Route path="/axiedatabase/effects" element={<EffectExplorer lang={lang} />} />
            <Route path="/axiedatabase/summons" element={<SummonExplorer lang={lang} />} />            
            <Route path="/axiedatabase/team" element={<TeamExplorer lang={lang} />} />
          </Routes>
        </div>
      </MemoryRouter>
    </div>
  );
}

export default App;
