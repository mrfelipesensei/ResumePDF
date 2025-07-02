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

  const handleSubmit = async () => {
    const dados = {
      personalData,
      educations,
      experiences
    };

    try {
      const response = await fetch("http://localhost:5000/gerar-curriculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados)
      });

      if(!response.ok) {
        throw new Error('Erro ao gerar currículo');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'curriculo.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Erro ao gerar currículo: ' +err.message);
    }
  };

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
    
      <button type="button" onClick={handleSubmit}>
        Gerrar Currículo em PDF
      </button>
    </div>
  );
}

export default App;