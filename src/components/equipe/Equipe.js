import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../sidebar/Sidebar";
import './Equipe.css'


function Metas() {

    const navigate = useNavigate();

    return (<div>
        <Sidebar></Sidebar>
        <div className="content">
            <div className="cadastrar-equipes">
                <button className="botao-cadastra-equipes" onClick={() => {
                    navigate('/equipe/create');
                }}>
                    Cadastrar Equipe
                </button>
            </div>
        </div>
    </div>
    );
}

export default Metas;
