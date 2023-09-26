import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../../sidebar/Sidebar';
import './FormGestor.css';

function FormGestor({ isEditMode }) {
    console.log('isEditMode', isEditMode);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
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

    useEffect(() => {
        const fetchGestor = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/gestor/retrieve/${id}/`);
                if (response.data) {
                    setFormData(response.data)
                }
                console.error(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do gestor", error);
                if (error.response) {
                    console.error('Detalhes do erro:', error.response.data);
                }
            }
        };
        if (isEditMode) {
            fetchGestor();
        }
        setIsLoading(false);
    }, [id]);

    const handleChange = (e) => {
        console.log('e: ', e);
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        console.log('value', value);
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData()
        for (let key in formData) {
            data[key] = formData[key];
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

    if (isLoading) return <p>Carregando...</p>;

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="content">
                <div className="form">
                    <h1>Formulário de Cadastro</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                placeholder="Nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Senha:</label>
                            <input
                                type="password"
                                placeholder="Senha"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dataNascimento">Data de Nascimento:</label>
                            <input
                                type="date"
                                name="dtNascimento"
                                value={formData.dtNascimento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endereco">Endereço:</label>
                            <input
                                type="text"
                                placeholder="Endereço"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefone">Telefone:</label>
                            <input
                                type="tel"
                                placeholder="Telefone"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="empresa">Nome da Empresa:</label>
                            <input
                                type="text"
                                placeholder="Empresa"
                                name="empresa"
                                value={formData.empresa}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cargo">Cargo:</label>
                            <input
                                type="text"
                                placeholder="Cargo"
                                name="cargo"
                                value={formData.cargo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="equipe">Equipe:</label>
                            <input
                                type="text"
                                placeholder="Equipe"
                                name="equipe"
                                value={formData.equipe}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="foto">Foto:</label>
                            <input
                                type="file"
                                name="foto"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Criar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormGestor;
