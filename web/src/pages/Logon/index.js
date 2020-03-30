import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi' // importação do father-icons

import './styles.css';

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {

    const history = useHistory();

    const [id, setId] = useState('');

    async function handleLogin(e) {

        e.preventDefault();

        try {
            const response = await api.post('/sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="logon-container">
            <session className="form"> {/*local onde ficara o form de logon e a logo da pagina inicial */}

                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin} className="logon-form">
                    <h1 className="h1" >Faça seu logon</h1>

                    <input
                        className="input-id"
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit" >Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>

            </session>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}