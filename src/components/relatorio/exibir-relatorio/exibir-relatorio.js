import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../sidebar/Sidebar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './exibir-relatorio.css';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ExibirRelatorio() {
  const [relatorioDados, setRelatorioDados] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        console.log(1)
        const response = await axios.get(`http://localhost:8000/relatorios/${id}/`);
        console.log(response.data)
        setRelatorioDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar o relatório", error);
      }
    };
    fetchRelatorio();
  }, [id]);

  const opcoesGrafico = {
    scales: {
      y: {
        beginAtZero: true
      }
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
        {relatorioDados ? (
          <div className="cadastrar-relatorios">
            <button className = "" onClick={() => navigate('/relatorio')}>Voltar aos Relatórios</button>
            <h1>Relatório {relatorioDados.tipo === 'equipe' ? 'da Equipe' : 'do Colaborador'} {relatorioDados.id}</h1>
            
            <div className="relatorio-grafico">
              <Bar data={dadosGrafico} options={opcoesGrafico} />
            </div>
            <div className="relatorio-dados">
              <div className="relatorio-sumario">
                <p>Quantidade de Metas: {relatorioDados.quantidade}</p>
                <p>Metas Finalizadas: {relatorioDados.finalizadas}</p>
                <p>Metas em Aberto: {relatorioDados.emAberto}</p>
                <p>Metas não Finalizadas: {relatorioDados.naoFinalizadas}</p>
                <p>Taxa de Sucesso: {relatorioDados.taxaSucesso}%</p>
                <div className={`relatorio-nota-final nota-${relatorioDados.notaFinal}`}>
                  <h3>Nota Final: {relatorioDados.notaFinal}</h3>
                </div>
              </div>
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
        ) : (
          <p>Carregando dados do relatório...</p>
        )}
      </div>
    </div>
  );
}

export default ExibirRelatorio;
