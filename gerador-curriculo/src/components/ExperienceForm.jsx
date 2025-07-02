import React from "react";

function ExperienceForm({experiences, setExperiences}) {
    const handleChange = (index, e) => {
        const {name, value} = e.target;
        const updated = [...experiences];
        updated[index][name] = value;
        setExperiences(updated);
    };

    const addExperience = () => {
        setExperiences([
            ...experiences,
            {cargo: '', empresa: '', periodo: '', descricao: ''}
        ]);
    };

    const removeExperience = (index) => {
        const updated = experiences.filter((_,i) => i !== index);
        setExperiences(updated);
    };

    return (
        <div>
            <h2>Experiência Profissional</h2>

            {experiences.map((exp, index) =>(
                <div key={index} style={{marginBottom: '1rem', padding: '10px', border: '1px solid #ccc'}}>
                    <label>Cargo:</label>
                    <input 
                     type="text"
                     name="cargo"
                     value={exp.cargo}
                     onChange={(e)=> handleChange(index,e)} 
                    />
                    <br />
                    <label>Empresa:</label>
                    <input 
                     type="text" 
                     name="empresa"
                     value={exp.empresa}
                     onChange={(e)=> handleChange(index,e)} 
                    />
                    <br />
                    <label>Período (ex: Jan/2020 - Dez/2022):</label>
                    <br />
                    <input 
                     type="text" 
                     name="periodo" 
                     value={exp.periodo}
                     onChange={(e)=> handleChange(index,e)} 
                    />
                    <br />
                    <label>Descrição:</label>
                    <br />
                    <textarea 
                     name="descricao"
                     value={exp.descricao}
                     onChange={(e)=> handleChange(index,e)}
                     maxLength="140"
                     placeholder="Descreva em até 140 caracteres"
                     rows="4"
                    >
                    </textarea>
                    <br />
                    <button type="button" onClick={()=> removeExperience(index)}>
                     Remover
                    </button>   
                </div>
            ))}

            <button type="button" onClick={addExperience}>
             Adicionar Experiência +
            </button>
        </div>
    );
}

export default ExperienceForm;