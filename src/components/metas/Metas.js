import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../sidebar/Sidebar";
import './Metas.css'


function Metas() {

    const navigate = useNavigate();

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
        </div>
    </div>
    );
}

export default Metas;
