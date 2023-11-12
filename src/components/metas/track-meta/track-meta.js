import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from '../../sidebar/Sidebar';
import './track-meta.css';

function ProgressBar({ value, max }) {
    const percentage = Math.min((value / max) * 100, 100); // Assegura que não ultrapasse 100%
    return (
        <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
        </div>
    );
}

function TrackMeta() {
    const [isLoading, setIsLoading] = useState(true);
    const [metas, setMetas] = useState([]);
    const [selectedMeta, setSelectedMeta] = useState(null);
    const [atualizacoes, setAtualizacoes] = useState([]);
    const [atualizacao, setAtualizacao] = useState({ valorAtualizacao: '', comentario: '' });
    const [showAtualizacoes, setShowAtualizacoes] = useState(false);

    useEffect(() => {
        const fetchMetas = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/meta/list/');
                console.log('Metas:', response.data.results); // Log da resposta da API
                setMetas(response.data.results);
            } catch (error) {
                console.error('Erro ao buscar metas:', error);
            }
            setIsLoading(false);
        };
        fetchMetas();
    }, []);

    const handleSelectMeta = async (metaId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/meta/retrieve/${metaId}/`);
            console.log('Meta selecionada:', response.data); // Log da resposta da API
            setSelectedMeta(response.data);
            // Reset para esconder as atualizações ao selecionar uma nova meta
            setAtualizacoes([]);
            setShowAtualizacoes(false);
        } catch (error) {
            console.error('Erro ao buscar detalhes da meta:', error);
        }
        setIsLoading(false);
    };

    const toggleAtualizacoes = async () => {
        if (!showAtualizacoes && selectedMeta) {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/meta/${selectedMeta.id}/atualizacoes/`);
                console.log('Atualizações:', response.data); // Log da resposta da API
                setAtualizacoes(response.data.results || []); // Ajuste feito aqui para acessar 'results'
            } catch (error) {
                console.error('Erro ao buscar atualizações:', error);
            }
            setIsLoading(false);
        }
        setShowAtualizacoes(!showAtualizacoes);
    };
    

    const handleSubmitAtualizacao = async (e) => {
        e.preventDefault();
        if (!selectedMeta || !atualizacao.valorAtualizacao) return;
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:8000/meta/${selectedMeta.id}/atualizar/`, {
                valorAtualizacao: atualizacao.valorAtualizacao,
                comentario: atualizacao.comentario
            });
            console.log('Atualização enviada:', response.data); // Log da resposta da API
            setAtualizacao({ valorAtualizacao: '', comentario: '' });
            await handleSelectMeta(selectedMeta.id); // Recarrega a meta para atualizar as informações na tela
        } catch (error) {
            console.error('Erro ao enviar atualização:', error);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="track-meta-container">
            <Sidebar />
            <div className="content">
                <h1>Lista de Metas</h1>
                <div className="meta-cards-container">
                    {metas.map((meta) => (
                        <div key={meta.id} className="meta-card" onClick={() => handleSelectMeta(meta.id)}>
                            <h2>{meta.nome}</h2>
                            <p>{meta.descricao}</p>
                        </div>
                    ))}
                </div>
                {selectedMeta && (
                    <div className="selected-meta-details">
                        <h2>Detalhes da Meta: {selectedMeta.nome}</h2>
                        <p>Descrição: {selectedMeta.descricao}</p>
                        <p>Valor alvo: {selectedMeta.valorAlvo}</p>
                        <p>Progresso atual: {selectedMeta.progressoAtual}</p>
                        <ProgressBar value={parseFloat(selectedMeta.progressoAtual)} max={parseFloat(selectedMeta.valorAlvo)} />
                        <form onSubmit={handleSubmitAtualizacao} className="atualizacao-form">
                            <input
                                type="number"
                                placeholder="Valor da Atualização"
                                value={atualizacao.valorAtualizacao}
                                onChange={(e) => setAtualizacao({ ...atualizacao, valorAtualizacao: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Comentário"
                                value={atualizacao.comentario}
                                onChange={(e) => setAtualizacao({ ...atualizacao, comentario: e.target.value })}
                            />
                            <button type="submit">Enviar Atualização</button>
                        </form>
                        {showAtualizacoes && atualizacoes.length > 0 ? (
    atualizacoes.map(atualizacao => (
        <div key={atualizacao.id} className="atualizacao-item">
            <p>Valor da Atualização: {atualizacao.valorAtualizacao}</p>
            <p>Comentário: {atualizacao.comentario}</p>
            <p>Data: {new Date(atualizacao.criadoEm).toLocaleString()}</p>
        </div>
    ))
) : (
    <p>Nenhuma atualização encontrada.</p>
)}

                    </div>
                )}
                {selectedMeta && (
                    <button onClick={toggleAtualizacoes} className="show-atualizacoes-btn">
                        {showAtualizacoes ? 'Esconder Atualizações' : 'Mostrar Atualizações'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default TrackMeta;
