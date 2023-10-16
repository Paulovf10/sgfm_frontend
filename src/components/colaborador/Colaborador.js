import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../sidebar/Sidebar";
import './Colaborador.css'

function Colaborador() {
    const [Colaborador, setColaborador] = useState([]);
    const [selectedcolaborador, setSelectedcolaborador] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchColaborador = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/list/');
                console.log(response.data.results)
                const colaboradoresFiltrados = response.data.results.filter(colaborador => colaborador.type_user === 3);
                setColaborador(colaboradoresFiltrados);
             
            } catch (error) {
                console.error("Erro ao buscar os colaboradores", error);
            }
        };
        fetchColaborador();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Deseja deletar este colaborador?')) {
            try {
                await axios.delete(`http://localhost:8000/user/delete/${id}/`);
                setColaborador(Colaborador.filter(g => g.id !== id));
            } catch (error) {
                console.error("Erro ao deletar o colaborador", error);
            }
        }
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="content">
                <div className="cadastrar-colaborador">
                    <button className="botao-cadastra-colaborador" onClick={() => {
                        navigate('/colaborador/create');
                    }}>
                        Cadastrar colaborador
                    </button>
                </div>

                {Colaborador.length ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Colaborador.map((colaborador) => (
                                <tr key={colaborador.id}>
                                    <td>
                                        <span onClick={() => {
                                            setSelectedcolaborador(colaborador);
                                        }} style={{ cursor: 'pointer' }}>
                                            {colaborador.name}
                                        </span>
                                    </td>
                                    <td>{colaborador.email}</td>
                                    <td>
                                        <button className='editar' onClick={() => {
                                            navigate(`/colaborador/edit/${colaborador.id}`);
                                        }}>Editar</button>
                                        <button className='deletar' onClick={() => handleDelete(colaborador.id)}>Deletar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<></>)}

                {selectedcolaborador && (
                    <div>
                        <h2>Detalhes do colaborador</h2>
                        <p>Nome: {selectedcolaborador.name}</p>
                        <p>Email: {selectedcolaborador.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Colaborador;
