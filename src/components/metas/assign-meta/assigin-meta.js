import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../../sidebar/Sidebar';
import './assigin-meta.css'; // Certifique-se de que o nome do arquivo está correto

function AssignMeta() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [metas, setMetas] = useState([]);
    const [colaboradores, setColaboradores] = useState([]);
    const [equipes, setEquipes] = useState([]);
    const [selectedMeta, setSelectedMeta] = useState('');
    const [selectedColaboradores, setSelectedColaboradores] = useState([]);
    const [selectedEquipe, setSelectedEquipe] = useState([]);

    // Funções para buscar colaboradores e equipes
    const fetchColaboradores = async () => {
        const colaboradorUrl = 'http://127.0.0.1:8000/user/list/';
        try {
            const colaboradorResponse = await axios.get(colaboradorUrl);
            const colaboradoresFiltrados = colaboradorResponse.data.results.filter(
                colaborador => colaborador.type_user === 3
            );
            setColaboradores(colaboradoresFiltrados);
        } catch (error) {
            console.error("Erro ao buscar colaboradores", error);
        }
    };

    const fetchEquipes = async () => {
        const equipeUrl = 'http://127.0.0.1:8000/equipe/list/';
        try {
            const equipeResponse = await axios.get(equipeUrl);
            setEquipes(equipeResponse.data.results);
        } catch (error) {
            console.error("Erro ao buscar equipes", error);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        Promise.all([fetchColaboradores(), fetchEquipes()]).then(() => {
            setIsLoading(false);
        });

        const fetchMetas = async () => {
            const metaUrl = 'http://127.0.0.1:8000/meta/list/';
            try {
                const metaResponse = await axios.get(metaUrl);
                setMetas(metaResponse.data.results);
            } catch (error) {
                console.error("Erro ao buscar metas", error);
            }
        };
        
        fetchMetas();
    }, []);

    useEffect(() => {
        // Limpa seleções anteriores quando a meta selecionada mudar
        setSelectedColaboradores([]);
        setSelectedEquipe('');
    }, [selectedMeta]);

    const handleMetaChange = (e) => {
        setSelectedMeta(e.target.value);
    };

    const handleColaboradorChange = (e) => {
        const value = e.target.value;
        setSelectedColaboradores(
            e.target.checked
                ? [...selectedColaboradores, value]
                : selectedColaboradores.filter(colabId => colabId !== value)
        );
    };

    const handleEquipeChange = (e) => {
        setSelectedEquipe(e.target.value); // Agora é apenas um valor, não um array
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const apiData = {
            colaboradores: selectedColaboradores,
            equipe: selectedEquipe ? [selectedEquipe] : [] // Garante que equipe seja um array com o valor de selectedEquipe
        };

        const updateUrl = `http://127.0.0.1:8000/meta/update/${selectedMeta}/`;

        try {
            const response = await axios.put(updateUrl, apiData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                console.log("Meta atualizada com sucesso!");
                navigate('/metas');
            } else {
                console.error("Erro ao atualizar meta:", response);
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
    };

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <Sidebar />
            <div className="content">
                <div className="form">
                    <h1>Atribuir Meta</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="meta">Meta:</label>
                            <select
                                name="meta"
                                value={selectedMeta}
                                onChange={handleMetaChange}
                                required
                            >
                                <option value="">Selecione uma meta</option>
                                {metas.map((meta) => (
                                    <option key={meta.id} value={meta.id}>{meta.nome}</option>
                                ))}
                            </select>
                        </div>
                        {metas.find(meta => meta.id.toString() === selectedMeta)?.tipoMeta === 1 && (
                            <div className="form-group">
                                <label>Colaboradores:</label>
                                {colaboradores.map((colaborador) => (
                                    <div key={colaborador.id}>
                                        <input
                                            type="checkbox"
                                            id={`colab-${colaborador.id}`}
                                            value={colaborador.id}
                                            checked={selectedColaboradores.includes(colaborador.id.toString())}
                                            onChange={handleColaboradorChange}
                                        />
                                        <label htmlFor={`colab-${colaborador.id}`}>{colaborador.name}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                        {metas.find(meta => meta.id.toString() === selectedMeta)?.tipoMeta === 2 && (
                            <div className="form-group">
                                <label htmlFor="equipe">Equipe:</label>
                                <select
                                    name="equipe"
                                    value={selectedEquipe}
                                    onChange={handleEquipeChange}
                                    required
                                >
                                    <option value="">Selecione uma equipe</option>
                                    {equipes.map((equipe) => (
                                        <option key={equipe.id} value={equipe.id}>{equipe.nome}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <button type="submit">Atribuir Meta</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AssignMeta;
