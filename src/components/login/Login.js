// Importações necessárias
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Certifique-se de que o caminho do arquivo CSS está correto

function LoginScreen() {
    // Estados para email, senha e mensagens de erro
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Função para lidar com o evento de submit do formulário
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login/', {
                email: email,
                senha: senha,
            });
            console.log(response.data);
            
            // Armazenar o token no localStorage
            localStorage.setItem('userToken', response.data.tipo); // Assumindo que a API retorna um 'token'
            localStorage.setItem('name', response.data.name); // Assumindo que a API retorna um 'token'
            console.log(response.data.tipo);
            // Navegar para a homepage em caso de sucesso
            navigate('/home');
        } catch (error) {
            setError('Credenciais inválidas, tente novamente.');
            console.error(error);
        }
    };

    // Função para lidar com o esquecimento de senha
    const handleForgotPassword = () => {
        // Lógica para esqueci minha senha
        console.log("Esqueci minha senha");
        // Aqui você pode implementar a navegação para a página de recuperação de senha
    };

    // O JSX para a tela de login
    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="title-login">Sistema de Gerenciamento de Metas</h1>
    
                <h2 className="login-title">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Entrar</button>
                    <button type="button" className="forgot-password-button" onClick={handleForgotPassword}>
                        Esqueci minha senha
                    </button>
                </form>
            </div>
        </div>
    );
    }    

export default LoginScreen;
