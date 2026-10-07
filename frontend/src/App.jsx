import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import AvaliacaoInicial from "./pages/AvaliacaoInicial";
import Conteudos from "./pages/Conteudos";
import ConteudoDetalhe from "./pages/ConteudoDetalhe";
import AvaliacaoFinal from "./pages/AvaliacaoFinal";
import Resultado from "./pages/Resultado";
import Feedback from "./pages/Feedback";
import AvaliacaoRedirect from "./pages/AvaliacaoRedirect";
import EtapaDetalhe from "./pages/EtapaDetalhe";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/avaliacao-inicial" element={<AvaliacaoInicial />} />
        <Route path="/avaliacao" element={<AvaliacaoRedirect />} />

        <Route path="/conteudos" element={<Conteudos />} />
        <Route path="/conteudos/:id" element={<ConteudoDetalhe />} />
        <Route path="/conteudos/:id/etapas/:etapaId" element={<EtapaDetalhe />} />

        <Route path="/avaliacao-final" element={<AvaliacaoFinal />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
