import React, { useState , useEffect } from 'react';
import {FiPower , FiTrash2 } from 'react-icons/fi';
import {Link , useHistory } from 'react-router-dom';
import './styles.css'
import logoImg from '../../asssets/logo.svg';
import api from '../../services/api';

export default function Profile() {

  const [incidents , setIncidents] = useState([]);
  const history =  useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');


  useEffect(() => {
    api.get('profile',{
      headers: {
        Authorization: ongId,
      }
    }).then(response =>{
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
        await api.delete(`incidents/${id}`,{
          headers: {
            Authorization: ongId,
          }
        });
        setIncidents(incidents.filter(incident => incident.id !== id));
    }catch (err){
      alert("It wasn't possible to delete your listing");
    }
  }
  // Function to Log Out the current user.
  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
      <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>            
                <span>Welcome {ongName}</span>
                <Link className="button" to="/incidents/new"> List new case </Link>

                <button 
                onClick={handleLogout}
                type="button"> 
                <FiPower size={39} color="#E02041" />
                </button>
            </header>

            <h1>Opened Cases</h1>
        <ul>
                      {incidents.map(incident => (
                      <li key={incident.id}>
                      <strong>Case</strong>
                      <p>{incident.title}</p>

                      <strong>Description:</strong>
                      <p>{incident.description}</p>

                      <strong>Value / Price :</strong>
                      <p>{incident.value}</p>

                      <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />  
                      </button>                          
                  </li>       
        ))}                   
    </ul>    
</div>
    )
}

