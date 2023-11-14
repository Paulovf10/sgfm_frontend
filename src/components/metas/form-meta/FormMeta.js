import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../../sidebar/Sidebar';
import './FormMeta.css';

// Adicione uma constante para as opções de unidade de medida
const UNIDADE_MEDIDA_OPTIONS = {
    1: 'Unidades',
    2: 'Reais',
    3: 'Porcentagem',
    4: 'Horas',
    5: 'Dias',
    6: 'Projetos',
};

function FormMeta({ isEditMode }) {
    const [gestores, setGestores] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        tipoMeta: 1,
        valorAlvo: '',
        progressoAtual: '0', // Valor padrão 0
        unidadeMedida: '',
        dataInicio: '',
        dataFim: '',
        ativo: false,
    });

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/meta/retrieve/${id}/`);
                if (response.data) {
                    setFormData({ ...formData, ...response.data });
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes da meta", error);
                if (error.response) {
                    console.error('Detalhes do erro:', error.response.data);
                }
            } finally {
                setIsLoading(false);
            }
        };
        if (isEditMode) {
            fetchMeta();
        } else {
            setIsLoading(false);
        }
    }, [id, isEditMode]);

    useEffect(() => {
        const fetchGestores = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/list`);
                if (response.data) {
                    // Supondo que 'type_user: 2' é para gestores
                    setGestores(response.data.results.filter(user => user.type_user === 2));
                }
            } catch (error) {
                console.error("Erro ao buscar gestores", error);
            }
        };

        fetchGestores();
    }, []); // Dependências vazias para rodar apenas na montagem
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = isEditMode 
                ? await axios.put(`http://localhost:8000/meta/update/${id}/`, formData)
                : await axios.post('http://localhost:8000/meta/create/', formData);

            if (response.status === 200 || response.status === 201) {
                console.log("Meta criada com sucesso!");
                navigate(`/metas`);
            } else {
                console.error("Erro ao criar meta:", response);
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
    };

    if (isLoading) return <p>Carregando...</p>;

    return (
        <div>
            <Sidebar />
            <div className="content">
                <div className="form">
                    <h1>{isEditMode ? 'Editar Meta' : 'Criar Meta'}</h1>
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
            <label htmlFor="gestor">Gestor:</label>
            <select
                name="gestor"
                value={formData.gestor}
                onChange={handleChange}
                required
            >
                <option value="">Selecione um gestor</option>
                {gestores.map((gestor) => (
                    <option key={gestor.id} value={gestor.id}>
                        {gestor.name}
                    </option>
                ))}
            </select>
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
                                name="tipoMeta"
                                value={formData.tipoMeta}
                                onChange={handleChange}>
                                <option value={1}>Colaborador</option>
                                <option value={2}>Equipe</option>
                            </select>
                        </div>
                        
                        {/* Campo Valor Alvo */}
                        <div className="form-group">
                            <label htmlFor="valorAlvo">Valor Alvo:</label>
                            <input
                                type="text"
                                placeholder="Valor Alvo"
                                name="valorAlvo"
                                value={formData.valor_alvo}
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Campo Progresso Atual */}
                        <div className="form-group">
                            <label htmlFor="progressoAtual">Progresso Atual:</label>
                            <input
                                type="text"
                                placeholder="Progresso Atual"
                                name="progressoAtual"
                                value={formData.progresso_atual}
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Campo Unidade de Medida */}
                        <div className="form-group">
                            <label htmlFor="unidadeMedida">Unidade de Medida:</label>
                            <select
                                name="unidadeMedida"
                                value={formData.unidade_medida}
                                onChange={handleChange}
                            >
                                {Object.entries(UNIDADE_MEDIDA_OPTIONS).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Campo Data Início */}
                        <div className="form-group">
                            <label htmlFor="dataInicio">Data de Início:</label>
                            <input
                                type="date"
                                name="dataInicio"
                                value={formData.data_inicio}
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Campo Data Fim */}
                        <div className="form-group">
                            <label htmlFor="data_fim">Data de Fim:</label>
                            <input
                                type="date"
                                name="dataFim"
                                value={formData.data_fim}
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Botão de Envio */}
                        <button type="submit">{isEditMode ? 'Atualizar' : 'Criar'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormMeta;
