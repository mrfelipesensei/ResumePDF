import React from "react";

function PersonalInfo({personalData, setPersonalData}) {
    const handleChange = (e) => {
        const {name, value} = e.target;
        setPersonalData({...personalData, [name]:value});
    };

    return (
        <div className="personal-info">
            <h2>Informações Pessoais</h2>
            
            <label>Nome:</label>
            <input 
             type="text"
             name="nome"
             placeholder="Nome Sobrenome"
             value={personalData.nome}
             onChange={handleChange}
            />
            <br />
            <label>Email:</label>
            <input 
             type="email"
             name="email"
             placeholder="seuemail@email.com"
             value={personalData.email}
             onChange={handleChange}
            />
            <br />
            <label>Telefone:</label>
            <input
             type="tel"
             name="telefone"
             placeholder="(XX) XXXXX-XXXX"
             value={personalData.telefone}
             onChange={handleChange}
            />
            <br />
            <label>Endereço (opcional):</label>
            <input
             type="text"
             name="endereco"
             placeholder="Rua, Número, Bairro, Cidade"
             value={personalData.endereco}
             onChange={handleChange}
            />
        </div>
    );
}

export default PersonalInfo;