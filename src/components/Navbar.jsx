import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'

export default function App() {
    const navigate = useNavigate()
    const handleClick = ()=>{
        localStorage.setItem("user",null);
        navigate("/login")
    }
  return (
    <MDBNavbar dark bgColor='dark' style={{height:'60px'}}>
      <MDBContainer fluid>
        <p style={{fontSize:'30px',color:'pink',fontFamily: 'Sassy Frass',}}>Personal <span style={{fontSize:'30px',color:'white',fontFamily: 'Sassy Frass',}}>Profile</span></p>
        <MDBBtn style={{marginTop:'-20px'}} onClick={handleClick}>Logout</MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
}