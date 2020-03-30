import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css'
import api from '../../services/api';

import logoImg from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault(); // previne o funcionamento do formulario e nao atualiza a page

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            const response = await api.post('ongs', data);

            alert(`Seu id de acesso: ${response.data.id}`)

            history.push('/');

        } catch(err) {
            console.log(err)
        }

    }

    return (
        <div className="register-container" >
            <div className="content" >
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastre-se</h1>
                    <p>Faça seu cadatro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para logon
                    </Link>
                </section>

                <form onSubmit={handleRegister} >
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="whatsapp"
                        value={whatsapp}
                        onChange={e => setwhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="button" >Cadastrar</button>
                </form>
            </div>
        </div>
    )
}