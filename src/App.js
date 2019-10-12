import React, {useState} from 'react';
import styled from 'styled-components'
// import logo from './logo.svg';
import './App.css';
// import ReactDOM from 'react-dom';
import axios from 'axios';

function Servicos(props){
  let services =
    <table>
      <thead>
        <tr>
          <th>Serviço</th>
          <th>Descrição</th>
          <th>Duração (min)</th>
          <th>Preço (R$)</th>
        </tr>
      </thead>
      {
        props.profissional.Services.map(service =>
        <tbody>
          <tr>
            <td>  {service.name}        </td>
            <td>  {service.description} </td>
            <td>  {service.duration}    </td>
            <td>  {service.value}       </td>
          </tr>
        </tbody>
      )}
    </table>
  return(
    <div>
      <div className="services">
      {services}
      </div>
    </div>)
}
function Profissional(props){
  return(
    <li className="item" >
      <div className="profile">
        <img className="profilePic" src={props.profissional.User.profileImg} alt="Foto de perfil" />
        <span>
          <div className="name">{props.profissional.User.name}</div>
          <div className="atuacao">{props.profissional.Specialization.name}</div>
          <div className="desc">{props.profissional.description}</div>
          <div className="address">
            <span><a rel="noopener noreferrer" target="_blank" href={"http://"+props.profissional.User.email}> {props.profissional.User.email}</a>, (53) {props.profissional.User.phoneNumber.substring(0,4)+"-"+props.profissional.User.phoneNumber.substring(5,9)}</span>
            <a title="ver no mapa" rel="noopener noreferrer" target="_blank" href={props.profissional.addressLink}> {props.profissional.addressComplement}, {props.profissional.addressName}, {props.profissional.addressNumber} - {props.profissional.district}</a>
            <a title="ver no mapa" rel="noopener noreferrer" target="_blank" href={props.profissional.addressLink}>{props.profissional.city}, {props.profissional.state.toUpperCase()}</a>
            <a title="ver no mapa" rel="noopener noreferrer" target="_blank" href={props.profissional.addressLink}>
              {props.profissional.cep.substring(0,5)+"-"+props.profissional.cep.substring(5,8)}
            </a>
          </div>
        </span>
      </div>
      <Servicos profissional={props.profissional}/>
    </li>
  );
}
function Sidebar(props){
  return(
  window.innerWidth>640?
    (<span id="sidebar">
      <div>
        <a href="https://www.unieloo.com/">
        <img src="logo.png" alt="logo"/>
        </a>
      </div>
      <span id="sidebar_header">
        Filtrar resultados
      </span>
      <span>
        Especialização:
      </span>
      <select id="especializacao">
        <option>-</option>
        {props.specializations.map( specialization=> <option>{specialization}</option> )}
      </select>
      <span>
        Preço máximo:
      </span>
      <input type="number" id="maxPrice" onChange={e=>props.setMaxPrice(e.target.value!=""?e.target.value:Infinity)} placeholder="0"/>
    </span>)
    :null);
}
const StyledUl = styled.ul`
  padding: 2em;
  flex-direction: row;
  list-style:none;
  align-content: flex-start;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  margin-left:${props=>props.marginLeft}`
function Profissionais(props){
  return(
    <StyledUl id="profissionaisList" marginLeft={window.innerWidth>650?"20em":0}>
        {props.profissionais.map(
          profissional=>{
            profissional.Services=profissional.Services.filter(service=> (parseInt(service.value)<=props.maxPrice));
            return profissional.Services.length?<Profissional profissional={profissional}/>:null;
          }
        )}
    </StyledUl>);
}
function App(){
  const [profissionais,setProfissionaisData] = useState([]);
  let [maxPrice,setMaxPrice] = useState(Infinity);
  axios.get(`https://unieloo-sandbox.herokuapp.com/teste`)
    .then(res => {
      const profissionais = res.data.data;
      setProfissionaisData(profissionais);
    });

  if(profissionais){
  let specializations = profissionais.map(profissional=>profissional.Specialization.name);
  specializations = [...new Set(specializations)];
    return (
        <div>
          <Sidebar specializations={specializations} setMaxPrice={setMaxPrice}/>
          <Profissionais profissionais={profissionais} maxPrice={maxPrice}/>
        </div>
    );
  }
    else return null
}
export default App;
