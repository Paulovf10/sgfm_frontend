import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <Sidebar></Sidebar>
            <div className="content">
                <h1 className="main-title">Bem-vindo ao Sistema de Gerenciamento de Metas</h1>
                <br></br>
                <br></br>
                <section className="feature-section">
                    <div className="text-content">
                        <h3>Alcance suas Metas com Eficiência</h3>
                        <p>Nosso sistema proporciona um ambiente dinâmico e organizado, otimizando a gestão de metas e colaboradores corporativos.</p>
                    </div>
                    <div className="image-content">
                        <img src={process.env.PUBLIC_URL + '/static/escada.jpg'} alt="Escada para o sucesso" />
                    </div>
                </section>

                <section className="feature-section reversed">
                    <div className="image-content">
                        <img className="alvo" src={process.env.PUBLIC_URL + '/static/alvo.png'} alt="Alvo das metas" />
                    </div>
                    <div className="text-content">
                        <h3>Benefícios do Sistema</h3>
                        <ul>
                            <li>Interface intuitiva e fácil de usar</li>
                            <li>Gerenciamento eficaz de colaboradores e gestores</li>
                            <li>Acompanhamento em tempo real do progresso das metas</li>
                            <li>Customização para atender às necessidades específicas da sua empresa</li>
                        </ul>
                    </div>
                </section>

                <section className="new-section">
                    <h2>Utilize o sistema e maximize os resultados da sua gestão</h2>
                    <p></p>
                </section>

            </div>
        </div>
    );
}

export default Home;
