import { useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import EducationForm from "./components/EducationForm";
import ExperienceForm from "./components/ExperienceForm";

function App() {
  const [personalData, setPersonalData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  });

  const [educations, setEducations] = useState([
    {curso: '', instituicao: '', conclusao: ''}
  ]);

  const [experiences, setExperiences] = useState([
    {cargo: '', empresa: '', periodo: '', descricao: ''}
  ]);

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

      <EducationForm
        educations={educations}
        setEducations={setEducations}
      />

      <ExperienceForm
       experiences={experiences}
       setExperiences={setExperiences}
      />

    </div>
  );
}

export default App;