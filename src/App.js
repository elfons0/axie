import Header from "./components/Header";
import CardExplorer from "./components/CardExplorer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const lang = window.navigator.language;

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<CardExplorer lang={lang}/>} />
            <Route path="/runes" element={<CardExplorer lang={lang} />} />
            <Route path="/charms" element={<CardExplorer lang={lang} />} />
            <Route path="/curses" element={<CardExplorer lang={lang} />} />
            <Route path="/tools" element={<CardExplorer lang={lang} />} />
            <Route path="/effects" element={<CardExplorer lang={lang} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
