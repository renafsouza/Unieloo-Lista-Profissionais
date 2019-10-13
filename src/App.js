import React, {useState} from 'react';
import styled from 'styled-components'
import './App.css';

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
        props.filteredServices.map(service =>
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
const Item = styled.li`
  overflow: visible;
  border-radius: 3px;
  max-width: 340px;
  padding: 1em;
  background-color: #ed6c38;
  border-bottom: 1px solid grey;
  box-shadow: 0 0 5px .1px rgba(0,0,0,.5);
  margin: 1em;
  display: table-cell;
  width: 100%;`;
function Profissional(props){
  return(
    <Item className="item" >
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
      <Servicos filteredServices={props.filteredServices}/>
    </Item>
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
      <select id="especializacao" onChange={e=>{props.setSpecialization(e.target.value)}}>
        <option>-</option>
        {props.specializations.map( specialization=> <option>{specialization}</option> )}
      </select>
      <span>
        Preço máximo:
      </span>
      <input type="number" id="maxPrice" onChange={e=>props.setMaxPrice(e.target.value!==""?e.target.value:Infinity)} placeholder="0"/>
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
            let filteredServices=profissional.Services.filter(service=> (parseInt(service.value)<=props.maxPrice));
            console.log(props.maxPrice);
            return filteredServices.length && (profissional.Specialization.name == props.specialization || props.specialization == "-")?<Profissional profissional={profissional} filteredServices={filteredServices}/>:null;
          }
        )}
    </StyledUl>);
}
function App(props){
  let [maxPrice,setMaxPrice] = useState(Infinity);
  let [specialization,setSpecialization] = useState("-");
  let profissionais = props.profissionais;

  if(profissionais){
    let specializations = profissionais.map(profissional=>profissional.Specialization.name);
    specializations = [...new Set(specializations)];
      return (
          <div>
            <Sidebar specializations={specializations} setSpecialization={setSpecialization} setMaxPrice={setMaxPrice}/>
            <Profissionais profissionais={profissionais} specialization={specialization} maxPrice={maxPrice}/>
          </div>
      );
  }
    else return null
}
export default App;
