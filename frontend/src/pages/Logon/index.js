import React, { useState }from 'react';
import {Link , useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import heroesImg from '../../asssets/heroes.png'
import logoImg from '../../asssets/logo.svg'



export default function Logon(){
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
         e.preventDefault();   

         try{
            const response = await api.post('sessions' , { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            
            history.push('/profile');
         } catch(err) {
            alert('Login failed. Try again.');
         }

    }

return (
    <div className="logon-container">
    <section className="form">
    <img src={logoImg} alt="Be The Hero"/>


    <form onSubmit={handleLogin}>
    <h1>Log in</h1>
    <input placeholder = "Sua ID" value={id} onChange={ e => setID(e.target.value)}/>
    <button className="button" type="submit"> Entrar </button>

    <Link className="back-link"to="/register">
        <FiLogIn size={16} color="#E02041"></FiLogIn>
        I don't have an account yet.
    </Link>
    </form>

</section>
<img src={heroesImg} alt="img"/>
    </div>
)
}