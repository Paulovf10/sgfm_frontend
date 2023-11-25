import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../sidebar/Sidebar";
import './relatorio.css';

function Relatorios() {
    const [relatorios, setRelatorios] = useState([]);
    const navigate = useNavigate();
    const userType = localStorage.getItem('userToken');

    useEffect(() => {
        const fetchRelatorios = async () => {
            try {
                const response = await axios.get('http://localhost:8000/relatorios/');
                if (response.data && Array.isArray(response.data.results)) {
                    setRelatorios(response.data.results);
                }
            } catch (error) {
                console.error("Erro ao buscar os relatórios", error);
            }
        };
        fetchRelatorios();
    }, []);

    const handleView = (id) => {
        navigate(`/exibe-relatorio/${id}`); // Atualize para a rota correta
    };

    const handleDelete = async (id) => {
        if (window.confirm('Deseja realmente deletar este relatório?')) {
            try {
                await axios.delete(`http://localhost:8000/relatorios/delete/${id}/`);
                setRelatorios(relatorios.filter(relatorio => relatorio.id !== id));
            } catch (error) {
                console.error("Erro ao deletar o relatório", error);
            }
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="content">
                <div className="cadastrar-relatorios">
                {userType == 2 && (
                    <button className="botao-cadastra-relatorios" onClick={() => {
                        navigate('/gera-relatorio');
                    }}>
                        
                        Gerar Relatorio
                    </button>
                    )}
                </div>
                {relatorios.length ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Quantidade</th>
                                <th>Finalizadas</th>
                                <th>Em Aberto</th>
                                <th>Não Finalizadas</th>
                                <th>Taxa de Sucesso</th>
                                <th>Nota Final</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatorios.map((relatorio) => (
                                <tr key={relatorio.id}>
                                    <td>{relatorio.id}</td>
                                    <td>{relatorio.tipoRelatorio === 1 ? 'Colaborador' : 'Equipe'}</td>
                                    <td>{relatorio.quantidade}</td>
                                    <td>{relatorio.finalizadas}</td>
                                    <td>{relatorio.emAberto}</td>
                                    <td>{relatorio.naoFinalizadas}</td>
                                    <td>{relatorio.taxaSucesso}%</td>
                                    <td>{relatorio.notaFinal}</td>
                                    <td>
                                    <button className='exibir' onClick={() => handleView(relatorio.id)}>Exibir</button>
                                    {console.log(userType)}
                                    {userType == 2 && (

                                        <button className='deletar' onClick={() => handleDelete(relatorio.id)}>Deletar</button>
                                    )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Não há relatórios para exibir.</p>
                )}
            </div>
        </div>
    );
}

export default Relatorios;
