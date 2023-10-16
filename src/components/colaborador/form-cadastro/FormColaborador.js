import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../../sidebar/Sidebar';
import './FormColaborador.css';

function Formcolaborador({ isEditMode }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        birth_date: '',
        addres: '',
        phone: '',
        foto: null,
        cpf: ''
    });

    useEffect(() => {
        const fetchcolaborador = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/retrieve/${id}/`);
                if (response.data) {
                    setFormData(response.data)
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes do colaborador", error);
                if (error.response) {
                    console.error('Detalhes do erro:', error.response.data);
                }
            }
        };
        console.log(isEditMode)
        if (isEditMode) {
            console.log(isEditMode)
            fetchcolaborador();
        }
        setIsLoading(false);
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiData = {
            identifier: formData.email,
            type_user: 3,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            birth_date: formData.birth_date,
            addres: formData.addres,
            phone: formData.phone,
            cpf: formData.cpf
        };

        try {
            console.log(apiData)
            const response = isEditMode 
                ? await axios.put(`http://localhost:8000/user/update/${id}/`, JSON.stringify(apiData), {
                    headers: { 'Content-Type': 'application/json' }
                })
                : await axios.post('http://localhost:8000/user/create/', JSON.stringify(apiData), {
                    headers: { 'Content-Type': 'application/json' }
                });

            if (response.status === 200 || response.status === 201) {
                console.log("colaborador criado com sucesso!");
            } else {
                console.error("Erro ao criar colaborador:", response);
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        } finally {
            navigate(`/colaborador`);
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
                                name="name"
                                value={formData.name}
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="CPF">CPF:</label>
                            <input
                                type="cpf"
                                placeholder="cpf"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dtNascimento">Data de Nascimento:</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endereco">Endereço:</label>
                            <input
                                type="text"
                                placeholder="Endereço"
                                name="addres"
                                value={formData.addres}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefone">Telefone:</label>
                            <input
                                type="tel"
                                placeholder="Telefone"
                                name="phone"
                                value={formData.phone}
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
                        <button type="submit" >{isEditMode ? 'Editar' : 'Criar'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Formcolaborador;
