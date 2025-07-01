import React from 'react';

function EducationForm({educations, setEducations}) {
    const handleChange = (index, e) => {
        const {name, value} = e.target;
        const updated = [...educations];
        updated[index][name] = value;
        setEducations(updated);
    };

    const addEducation = () => {
        setEducations([
            ...educations,
            {curso: '', instituicao: '', conclusao: ''}
        ]);
    };

    const removeEducation = (index) => {
        const updated = educations.filter((_,i) => i !== index);
        setEducations(updated);
    };

    return (
        <div>
            <h2>Formação Acadêmica</h2>

            {educations.map((edu, index) =>(
                <div key={index} style={{marginBottom: '1rem', padding: '10px', border: '1px solid #ccc'}}>
                    <label>Nome do Curso:</label>
                    <input 
                     type="text"
                     name="curso"
                     value={edu.curso}
                     onChange={(e)=> handleChange(index,e)} 
                    />
                    <br />
                    <label>Instituição:</label>
                    <input 
                     type="text"
                     name="instituicao"
                     value={edu.instituicao}
                     onChange={(e)=> handleChange(index,e)} 
                    />
                    <br />
                    <label>Conclusão:</label>
                    <input 
                     type="month"
                     name="conclusao"
                     value={edu.conclusao}
                     onChange={(e)=> handleChange(index,e)} 
                    />
                    <br />
                    <button type="button" onClick={() => removeEducation(index)}>
                        Remover
                    </button>
                </div>
            ))}

            <button type="button" onClick={addEducation}>
                Adicionar Formação +
            </button>
        </div>
    );

}

export default EducationForm;