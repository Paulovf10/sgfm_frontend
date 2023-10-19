import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../sidebar/Sidebar";
import './Metas.css'


function Metas() {
    const [metas, setMetas] = useState([]);
    const [selectedMeta, setSelectedMeta] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMetas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/meta/list/');
                const metasFiltrados = response.data.results.filter(meta => meta.type_user === 2);
                setMetas(metasFiltrados);
            } catch (error) {
                console.error("Erro ao buscar as metas", error);
            }
        };
        fetchMetas();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Deseja deletar esta meta?')) {
            try {
                await axios.delete(`http://localhost:8000/meta/delete/${id}/`);
                setMetas(metas.filter(g => g.id !== id));
            } catch (error) {
                console.error("Erro ao deletar a meta", error);
            }
        }
    };

    return (<div>
        <Sidebar></Sidebar>
        <div className="content">
            <div className="cadastrar-metas">
                <button className="botao-cadastra-metas" onClick={() => {
                    navigate('/metas/create');
                }}>
                    Cadastrar Metas
                </button>
            </div>

            {metas.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ativo</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metas.map((meta) => (
                            <tr key={meta.id}>
                                <td>
                                    <span onClick={() => {
                                        setSelectedMeta(meta);
                                    }} style={{ cursor: 'pointer' }}>
                                        {meta.name}
                                    </span>
                                </td>
                                <td>{meta.descricao}</td>
                                <td>{meta.tipo_meta}</td>
                                <td>{meta.ativo ? '✔' : '❌'}</td>
                                <td>
                                    <button className='editar' onClick={() => {
                                        navigate(`/meta/edit/${meta.id}`);
                                    }}>Editar</button>
                                    <button className='deletar' onClick={() => handleDelete(meta.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<></>)}

            {selectedMeta && (
                <div>
                    <h2>Detalhes da Meta</h2>
                    <p>Nome: {selectedMeta.name}</p>
                    <p>Descrição: {selectedMeta.descricao}</p>
                </div>
            )}
        </div>
    </div>
    );
}

export default Metas;
