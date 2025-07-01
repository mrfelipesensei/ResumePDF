import { useState } from "react";
import PersonalInfo from "./components/PersonalInfo";

function App() {
  const [personalData, setPersonalData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  });

  return (
    <div>
      <h1>Gerador de Currículos</h1>
      <p>Bem-vindo ao Gerador de Currículo!</p>
      <p>É muito fácil: basta digitar suas informações que geramos seu currículo em PDF!</p>
      <p>Prático e Rápido, confira:</p>

      <PersonalInfo 
        personalData={personalData}
        setPersonalData={setPersonalData}
      />

    </div>
  );
}

export default App;