import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import AvaliacaoInicial from "./pages/AvaliacaoInicial";
import Conteudos from "./pages/Conteudos";
import AvaliacaoFinal from "./pages/AvaliacaoFinal";
import Resultado from "./pages/Resultado";
import Feedback from "./pages/Feedback";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/avaliacao-inicial" element={<AvaliacaoInicial />} />
        <Route path="/conteudos" element={<Conteudos />} />
        <Route path="/avaliacao-final" element={<AvaliacaoFinal />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
