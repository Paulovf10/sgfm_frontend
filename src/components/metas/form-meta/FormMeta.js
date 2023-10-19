import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../../sidebar/Sidebar';
import './FormMeta.css';

function FormMeta({ isEditMode }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        tipo_meta: 1,
        ativo: false,
    });

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/meta/retrieve/${id}/`);
                if (response.data) {
                    setFormData(response.data)
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes da meta", error);
                if (error.response) {
                    console.error('Detalhes do erro:', error.response.data);
                }
            }
        };
        console.log(isEditMode)
        if (isEditMode) {
            console.log(isEditMode)
            fetchMeta();
        }
        setIsLoading(false);
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
        console.log('Valor de tipo_meta:', value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiData = {
            nome: formData.nome,
            descricao: formData.descricao,
            tipo_meta: formData.tipo_meta,
            ativo: formData.ativo
        };

        try {
            console.log(apiData)
            const response = isEditMode 
                ? await axios.put(`http://localhost:8000/meta/update/${id}/`, JSON.stringify(apiData), {
                    headers: { 'Content-Type': 'application/json' }
                })
                : await axios.post('http://localhost:8000/meta/create/', JSON.stringify(apiData), {
                    headers: { 'Content-Type': 'application/json' }
                });

            if (response.status === 200 || response.status === 201) {
                console.log("Meta criada com sucesso!");
            } else {
                console.error("Erro ao criar meta:", response);
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        } finally {
            navigate(`/metas`);
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
                            <label htmlFor="nome">Descrição:</label>
                            <input
                                type="text"
                                placeholder="Descrição"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ativo">Ativo:</label>
                            <input
                                type='checkbox'
                                name="ativo"
                                value={formData.ativo}
                                onChange={() => setFormData({
                                ...formData,
                                ativo: !formData.ativo
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ativo">Tipo:</label>
                            <select
                                name="tipo_meta"
                                value={formData.tipo_meta}
                                onChange={handleChange}>
                                <option value={1}>Colaborador</option>
                                <option value={2}>Equipe</option>
                            </select>
                        </div>
                        <button type="submit" >{isEditMode ? 'Editar' : 'Criar'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormMeta;
