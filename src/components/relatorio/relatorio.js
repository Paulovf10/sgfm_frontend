import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../sidebar/Sidebar";
import './relatorio.css'


function Relatorios() {
    const [equipe, setEquipes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchColaborador = async () => {
            try {
                const response = await axios.get('http://localhost:8000/equipe/list/');
                if(response.data){
                    setEquipes(response.data.results);
                }
             
            } catch (error) {
                console.error("Erro ao buscar os colaboradores", error);
            }
        };
        fetchColaborador();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Deseja deletar este colaborador?')) {
            try {
                await axios.delete(`http://localhost:8000/equipe/delete/${id}/`);
                setEquipes(equipe.filter(g => g.id !== id));
            } catch (error) {
                console.error("Erro ao deletar a equipe", error);
            }
        }
    };

    return (<div>
        <Sidebar></Sidebar>
        <div className="content">
            <div className="cadastrar-equipes">
                <button className="botao-cadastra-equipes" onClick={() => {
                    navigate('/gera-relatorio');
                }}>
                    Gerar Relatorio
                </button>
            </div>
            {equipe.length ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>descricao</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipe.map((equipe) => (
                                <tr key={equipe.id}>
                                    <td>{equipe.nome}</td>
                                    <td>{equipe.descricao}</td>
                                    <td>
                                        <button className='editar' onClick={() => {
                                            navigate(`/equipe/edit/${equipe.id}`);
                                        }}>Editar</button>
                                        <button className='deletar' onClick={() => handleDelete(equipe.id)}>Deletar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<></>)}
        </div>
    </div>
    );
}

export default Relatorios
