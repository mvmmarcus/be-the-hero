import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

export default function Profile() {

    const [incidents, setincidents] = useState([]);

    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setincidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident (id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setincidents(incidents.filter(incident => incident.id !== id));

        }catch(error) {
            console.log(error)
        }
    }

    function handleLogout () {
        localStorage.clear();

        history.push('/');

    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new" >Cadastrar novo caso</Link>
                <button type="button" >
                    <FiPower onClick={handleLogout} size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id} >
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            { /* Intl função global para formatação (data, moeda, etc..) */}
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={() => {handleDeleteIncident(incident.id)}} type="button" >
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}