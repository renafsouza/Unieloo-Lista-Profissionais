import React, { useState} from 'react';

// import logo from './logo.svg';
import './App.css';
// import ReactDOM from 'react-dom';
import axios from 'axios';
function MaxPrice(props){
  return <input type="number" id="max_price" placeholder="0"/>;
}
function App(){
  const [profissionaisData,setProfissionaisData] = useState([]);
  axios.get(`https://unieloo-sandbox.herokuapp.com/teste`)
    .then(res => {
      const profissionaisData = res.data.data;
      setProfissionaisData(profissionaisData);
    });

  if(profissionaisData){
  var especializacoes = profissionaisData.map(function(profissional){
    return profissional.Specialization.name;
  });
  especializacoes = [...new Set(especializacoes)];
  var max_price = Infinity;
    return (
        <div>
          <span id="sidebar">
            <span id="sidebar_header">Filtrar resultados</span>
            <span>Especialização:</span>
            <select id="especializacao">
              <option>-</option>
              {especializacoes.map(function(specialization){return (<option>{specialization}</option>) }) }
            </select>
            <span>Preço máximo:</span>
            <MaxPrice/>
          </span>
          <ul id="professionais_list">
            {profissionaisData.map(function(profissional){
                if(document.getElementById("max_price") && document.getElementById("max_price").value){
                  max_price = parseInt(MaxPrice.value);
                  console.log(MaxPrice);
                }

                profissional.Services=profissional.Services.filter(function(service){return parseInt(service.value)<=max_price});
                if(
                     profissional.Services.length
                  && document.getElementById("especializacao")
                  && (  profissional.Specialization.name == document.getElementById("especializacao").value
                      ||document.getElementById("especializacao").value == "-"
                  )
                )return(
                  <li className="item" key={profissional.id}>
                    <div className="profile">
                      <img className="profilePic" src={profissional.User.profileImg} alt="foto de perfil" />
                      <span>
                        <div className="name">{profissional.User.name}</div>
                        <div className="atuacao">{profissional.Specialization.name}</div>
                        <div className="desc">{profissional.description}</div>
                        <div className="address">
                          <span><a target="_blank" href={"http://"+profissional.User.email}> {profissional.User.email}</a>, (53) {profissional.User.phoneNumber.substring(0,4)+"-"+profissional.User.phoneNumber.substring(5,9)}</span>
                          <a title="ver no mapa" target="_blank" href={profissional.addressLink}> {profissional.addressComplement}, {profissional.addressName}, {profissional.addressNumber} - {profissional.district}</a>
                          <a title="ver no mapa" target="_blank" href={profissional.addressLink}>{profissional.city}, {profissional.state.toUpperCase()}</a>
                          <a title="ver no mapa" target="_blank" href={profissional.addressLink}>
                            {profissional.cep.substring(0,5)+"-"+profissional.cep.substring(5,8)}
                          </a>
                        </div>
                      </span>
                    </div>
                    <div className="services" id={profissional.id}>
                      <table>
                          <thead>
                            <th>Serviço</th><th>Descrição</th>  <th>Duração (min)</th><th>Preço</th>
                          </thead>
                        <tbody>
                          {profissional.Services.map(service =>
                            <tr>
                              <td>  {service.name}        </td>
                              <td>  {service.description} </td>
                              <td>  {service.duration}    </td>
                              <td>  {service.value}       </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="expand" onClick={function(){var servicos = document.getElementById(profissional.id);if(servicos.clientHeight>0)servicos.style.height="0";else servicos.style.height="100%";}}>
                    ...
                    </div>
                  </li>
                ); else return null}
              )}
            </ul>
          </div>
    );
  }
    else return null
}
export default App;
