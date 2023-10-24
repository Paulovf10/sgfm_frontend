import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../../sidebar/Sidebar';
import './FormEquipe.css';

function FormEquipe({ isEditMode }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [gestores, setGestores] = useState([]);
    const [colaboradores, setColaboradores] = useState([]);
    const [formData, setFormData] = useState({
        gestor: '',
        colaboradores: [],
        nome: "",
        descricao: "",
        ativo: true
    }
    );

    useEffect(() => {
        const fetchEquipe = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/equipe/retrieve/${id}/`);
                if (response.data) {
                    setFormData(response.data)
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes da equipe", error);
                if (error.response) {
                    console.error('Detalhes do erro:', error.response.data);
                }
            }
        };

        const fetchGestor = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/list`);
                console.log('response', response);
                if (response.data) {
                    setGestores(response.data.results.filter(user => user.type_user === 2))
                    setColaboradores(response.data.results.filter(user => user.type_user === 3))
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes dos gestores", error);
                if (error.response) {
                    console.error('Detalhes do erro:', error.response.data);
                }
            }
        };
        if (isEditMode) {
            fetchEquipe();
        }
        fetchGestor();
        setIsLoading(false);
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;

        if(e.target.name === 'colaboradores'){
            if(formData.colaboradores.find(val => val == value)){
                return
            }
            setFormData({
                ...formData,
                colaboradores: [...formData.colaboradores, value]
            });
        }
        else{setFormData({
            ...formData,
            [e.target.name]: value
        });
    }
        console.log(
            formData
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let ids = []
        const colabs = formData.colaboradores.filter(colaborador => colaboradores.some(clb => clb.id === colaborador.id));
        colabs.forEach(colab => ids.push(colab.id));
        console.log(ids);
        const apiData = {
            gestor: formData.gestor,
            colaboradores: ids,
            nome: formData.nome,
            descricao: formData.descricao,
            ativo: formData.password,
        };
        

        try {
            const response = isEditMode 
                ? await axios.put(`http://localhost:8000/equipe/update/${id}/`, JSON.stringify(apiData), {
                    headers: { 'Content-Type': 'application/json' }
                })
                : await axios.post('http://localhost:8000/equipe/create/', JSON.stringify(apiData), {
                    headers: { 'Content-Type': 'application/json' }
                });

            if (response.status === 200 || response.status === 201) {
                console.log("Equipe criado com sucesso!");
            } else {
                console.error("Erro ao criar equipe:", response);
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        } finally {
            navigate(`/equipe`);
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
                            <label htmlFor="gestor">Gestor:</label>
                            <select  
                            name="gestor"
                            value={gestores.find(gestor => gestor.id === formData.gestor)?.name}
                            required
                            onChange={handleChange}>
                                {gestores.map((gestor)=> (<option key={gestor.id} value={gestor.id}>{gestor.name}</option>))}
                            </select>
                        </div>
                        {formData.colaboradores.map(colaborador => {
                                const colab = colaboradores.find(clb => clb.id == colaborador);
                                console.log('aqui', colab);
                                return colab ? (<span>{colab.name} </span>) : ''
                            })}
                        <div className="form-group">
                            <label htmlFor="colaboradores">Colaboradores:</label>
                            
                            <select  
                            name="colaboradores"
                            required
                            multiple
                            onChange={handleChange}>
                                {colaboradores.map((colaborador)=> 
                                (<option key={colaborador.id} value={colaborador.id}>{colaborador.name}</option>))}
                            </select>
                        </div>

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
                            <label htmlFor="descricao">Descricao:</label>
                            <input
                                type="text"
                                placeholder="Nome"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label  htmlFor="ativo">Ativo:</label>
                            <input
                                
                                type='checkbox'
                                name="ativo"
                                value={formData.ativo}
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

export default FormEquipe;
