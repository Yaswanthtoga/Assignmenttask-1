import React, { useContext, useEffect, useState } from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext.js';
import axios from 'axios'


export default function Login() {
    const [disabled,setDisabled] = useState(true);
    const [error,setError] = useState(false);
    const [user,setUser] = useState({
      email:'',
      password:''
    });
    const navigate = useNavigate();

    // User Context
    const { login } = useContext(UserContext);

    // For Button Disabling
    useEffect(() => {
      if (user.email !== '' && user.password !== '') {
        setDisabled(false)
      } else {
        setDisabled(true);
      }
    }, [user]);

    // Handle Change
    const handleChange = (event)=>{
      setUser((prev)=>({...prev,[event.target.name]:event.target.value}));
    }

    // Handle Click
    const handleClick = async (e)=>{
      e.preventDefault();

      try {
        await login(user);
        setError(false);
        navigate('/');
        
      } catch (error) {
        setError(true);
      }
    }

    // const handleClickLink = async(e)=>{
    //   if(user.email.length === 0){
    //     alert('Please fill the email');
    //     e.preventDefault();
    //     return ;
    //   }
    //   try{
    //     const res = await axios.post("http://localhost:8000/api/auth/forgot-password",{email:user.email});
    //     console.log(res);
    //   }catch(err){
    //     setError(true);
    //   }
    // }

  return (
    <form style={{width:'40%',position:'absolute',margin:'auto',left:0,right:0,top:'30%',bottom:0}}>
      <MDBInput className='mb-4' type='email' name='email' id='form2Example1' label='Email address' onChange={handleChange} />
      <MDBInput className='mb-4' type='password' name='password' id='form2Example2' label='Password' onChange={handleChange} />

      <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
        </MDBCol>
        {/* <MDBCol>
          <Link onClick={handleClickLink} to="/forgot-password">Forgot Password?</Link>
        </MDBCol> */}
      </MDBRow>

      <MDBBtn type='button' className='mb-4' block disabled={disabled} onClick={handleClick}>
        Sign in
      </MDBBtn>

      <div className='text-center'>
        <p>
          Not a member? <Link to="/register">Register</Link>
        </p>
        { error&&<p style={{color:'red',textAlign:'center',fontSize:'15px'}}>Invalid Credentials</p> }
      </div>
    </form>
  );
}