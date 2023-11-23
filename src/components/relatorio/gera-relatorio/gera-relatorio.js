import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../../sidebar/Sidebar";
import './gera-relatorio.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function GeraRelatorios() {
    const [tipoRelatorio, setTipoRelatorio] = useState('');
    const [equipes, setEquipes] = useState([]);
    const [colaboradores, setColaboradores] = useState([]);
    const [selecionado, setSelecionado] = useState('');
    const [relatorioDados, setRelatorioDados] = useState(null);
    const getNotaColor = (nota) => {
        switch (nota) {
            case 'S': return 'green';
            case 'A': return 'blue';
            case 'B': return 'orange';
            case 'C': return 'darkorange';
            case 'D': return 'red';
            case 'F': return 'darkred';
            default: return 'gray';
        }
    };
    useEffect(() => {
        if (tipoRelatorio) {
            setSelecionado(''); // Reset selecionado ao mudar o tipo
            setRelatorioDados(null); // Limpa o relatório anterior
            if (tipoRelatorio === 'equipe') {
                fetchEquipes();
            } else if (tipoRelatorio === 'colaborador') {
                fetchColaboradores();
            }
        }
    }, [tipoRelatorio]);

    const fetchEquipes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/equipe/list/');
            setEquipes(response.data.results);
        } catch (error) {
            console.error("Erro ao buscar as equipes", error);
        }
    };

    const fetchColaboradores = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/list/');
            const colaboradoresFiltrados = response.data.results.filter(user => user.type_user === 3);
            setColaboradores(colaboradoresFiltrados);
        } catch (error) {
            console.error("Erro ao buscar os colaboradores", error);
        }
    };

    const opcoesGrafico = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    const handleRelatorio = async () => {
        try {
            const response = await axios.post('http://localhost:8000/relatorio/', {
                tipo: tipoRelatorio,
                id: selecionado
            });
            setRelatorioDados(response.data);
        } catch (error) {
            console.error("Erro ao gerar o relatório", error);
        }
    };
    let dadosGrafico;
    if (relatorioDados) {
        dadosGrafico = {
            labels: ['Quantidade', 'Finalizadas', 'Em Aberto', 'Não Finalizadas'],
            datasets: [{
                label: 'Status das Metas',
                data: [
                    relatorioDados.quantidade,
                    relatorioDados.finalizadas,
                    relatorioDados.emAberto,
                    relatorioDados.naoFinalizadas
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        };
    }
    return (
        <div>
            <Sidebar />
            <div className="content">
                <div className="gera-relatorio-container">
                    <h1>Gerar Relatório</h1>
                    <select className="relatorio-dropdown" onChange={(e) => {
                        setTipoRelatorio(e.target.value);
                        setSelecionado('');
                    }} defaultValue="">
                        <option value="" disabled>Selecione o tipo de relatório</option>
                        <option value="colaborador">Colaborador</option>
                        <option value="equipe">Equipe</option>
                    </select>
                    {tipoRelatorio && (
                        <select className="relatorio-dropdown" onChange={(e) => setSelecionado(e.target.value)} defaultValue="">
                            <option value="" disabled>Selecione {tipoRelatorio === 'equipe' ? 'uma equipe' : 'um colaborador'}</option>
                            {(tipoRelatorio === 'equipe' ? equipes : colaboradores).map(item => (
                                <option key={item.id} value={item.id}>{item.nome || item.name}</option>
                            ))}
                        </select>
                    )}
                    {selecionado && (
                        <button className="relatorio-button" onClick={handleRelatorio}>Gerar Relatório</button>
                    )}
                    {relatorioDados && (
                        <div className="relatorio-resultados">
                            <h1>Relatório {relatorioDados.tipo === 'equipe' ? 'da Equipe' : 'do Colaborador'} {relatorioDados.id}</h1>
                            <div className="relatorio-dados-e-grafico">
                                <div className="relatorio-dados">
                                    <div className="relatorio-sumario">
                                        <p>Quantidade de Metas: {relatorioDados.quantidade}</p>
                                        <p>Metas Finalizadas: {relatorioDados.finalizadas}</p>
                                        <p>Metas em Aberto: {relatorioDados.emAberto}</p>
                                        <p>Metas não Finalizadas: {relatorioDados.naoFinalizadas}</p>
                                        <p>Taxa de Sucesso: {relatorioDados.taxaSucesso}%</p>
                                    </div>

                                </div>
                                {dadosGrafico && (
                                    <div className="grafico-relatorio">
                                        <Bar data={dadosGrafico} options={opcoesGrafico} />
                                    </div>
                                )}
                                
                            </div>
                            <div className={`relatorio-nota-final nota-${relatorioDados.notaFinal}`}>
                                        <h3>Nota Final: {relatorioDados.notaFinal}</h3>
                                    </div>
                            <h2>Detalhes das Metas:</h2>
                            {relatorioDados.metas.map(meta => (
                                <div key={meta.nome} className="relatorio-meta">
                                    <h3>{meta.nome}</h3>
                                    <p>Descrição: {meta.descricao}</p>
                                    <p>Valor Alvo: {meta.valorAlvo}</p>
                                    <p>Progresso Atual: {meta.progressoAtual}</p>
                                    <p>Data Início: {meta.dataInicio}</p>
                                    <p>Data Fim: {meta.dataFim}</p>
                                    <p>Meta Batida: {meta.metaBatida ? 'Sim' : 'Não'}</p>
                                    <p>Ativo: {meta.ativo ? 'Sim' : 'Não'}</p>
                                    <div className="relatorio-atualizacoes">
                                        <h4>Atualizações:</h4>
                                        <ul>
                                            {meta.atualizacoes.map(atualizacao => (
                                                <li key={atualizacao.criadoEm}>
                                                    <p>Comentário: {atualizacao.comentario}</p>
                                                    <p>Valor da Atualização: {atualizacao.valorAtualizacao}</p>
                                                    <p>Data: {new Date(atualizacao.criadoEm).toLocaleString()}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default GeraRelatorios;
