import './Sidebar.css';
import { useNavigate } from 'react-router-dom';


function Sidebar() {
    const navigate = useNavigate()

    const handleClickHome = () => {
        navigate('/')
    }

    const handleClickGestor = () => {
        navigate('/gestor')
    }

    return (
        <div>
            <div className="sidebar">
                <button onClick={handleClickHome}>Home</button>
                <button onClick={handleClickGestor}>Gestor</button>
                <button>Tópico 2</button>
                <button>Tópico 3</button>
                <button>Tópico 4</button>
                <button className='sair'>Sair</button>
            </div>
        </div>
    );
}

export default Sidebar;
