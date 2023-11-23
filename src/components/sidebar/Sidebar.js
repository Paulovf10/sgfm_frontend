import './Sidebar.css';
import { useNavigate } from 'react-router-dom';


function Sidebar() {
    const navigate = useNavigate()

    return (
        <div>
            <div className="sidebar">
                <button onClick={() => {
                    navigate(`/`);
                }}>Home</button>
                <button onClick={() => {
                    navigate(`/gestor`);
                }}>Gestor</button>
                <button onClick={() => {
                    navigate(`/colaborador`);
                }}>Colaborador</button>

                <button onClick={() => {
                    navigate(`/equipe`);
                }}>Equipe</button>
                                <button onClick={() => {
                    navigate(`/metas`);
                }}>Metas</button>
                                <button onClick={() => {
                    navigate(`/relatorio`);
                }}>Relatorio</button>
                <button className='sair'>Sair</button>
            </div>
        </div>
    );
}

export default Sidebar;
