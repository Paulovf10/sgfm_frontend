import React, { useState } from 'react';

function GestorForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    dtNascimento: '',
    endereco: '',
    telefone: '',
    empresa: '',
    cargo: '',
    equipe: '',
    foto: null
  });

  const handleChange = (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria um objeto FormData para enviar arquivos
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/gestor/create/', {
            method: 'POST',
            body: data
        });
        
        if (response.status === 201) {
            console.log("Gestor criado com sucesso!");
        } else {
            console.error("Erro ao criar gestor:", await response.text());
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nome"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
      />
      <input 
        type="email" 
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input 
        type="password" 
        placeholder="Senha"
        name="senha"
        value={formData.senha}
        onChange={handleChange}
      />
      <input 
        type="date" 
        name="dtNascimento"
        value={formData.dtNascimento}
        onChange={handleChange}
      />
      <input 
        type="text" 
        placeholder="Endereço"
        name="endereco"
        value={formData.endereco}
        onChange={handleChange}
      />
      <input 
        type="tel" 
        placeholder="Telefone"
        name="telefone"
        value={formData.telefone}
        onChange={handleChange}
      />
      <input 
        type="text" 
        placeholder="Empresa"
        name="empresa"
        value={formData.empresa}
        onChange={handleChange}
      />
      <input 
        type="text" 
        placeholder="Cargo"
        name="cargo"
        value={formData.cargo}
        onChange={handleChange}
      />
      <input 
        type="text" 
        placeholder="Equipe"
        name="equipe"
        value={formData.equipe}
        onChange={handleChange}
      />
      <input 
        type="file" 
        name="foto"
        onChange={handleChange}
      />
      <button type="submit">Criar</button>
    </form>
  );
}

export default GestorForm;
