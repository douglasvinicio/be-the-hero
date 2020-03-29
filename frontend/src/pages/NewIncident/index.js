import React , { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from  '../../asssets/logo.svg';
import api from '../../services/api';

import './styles.css'

export default function NewIncident(){
       const [title, setTitle] = useState(''); 
       const [description, setDescription] = useState(''); 
       const [value, setValue] = useState(''); 

       const ongId = localStorage.getItem('ongId')
       const history = useHistory();

       async function handleNewIncident(e) {
           e.preventDefault();

           const data = {
               title,
               description,
               value
           };

           try {
            await api.post('incidents',data, {
                headers:{
                    Authorization: ongId,
                }
            })
            history.push('/profile')
           } catch(err){
               alert("Couldn't porcess your request")
           }
       }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>List a new case</h1>
                    <p>Give a detailed explanation why your organization need help and specifie how people might help you.</p>
                    <p>Let's find a hero!</p>
                    <Link className="back-link"to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Take me back to my profile.
                    </Link>

                </section>

                <form>
                    <input
                    placeholder="Summary"
                    value={title}
                    onChange={e =>setTitle(e.target.value)}
                    />
                    <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e =>setDescription(e.target.value)}
                    />
                    <input
                    placeholder="Money,Voluntary Work.."
                    value={value}
                    onChange={e =>setValue(e.target.value)}
                    />

                    <button onClick={handleNewIncident} className="button" type="submit"> Submit </button>
                </form>
            </div>
        </div>
    )
}