import React, { useEffect, useState } from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';


export default function Register() {
  const [value,setValue] = useState(); 
  const [disabled,setDisabled] = useState(true);
  const [error,setError] = useState(false);

  const navigate = useNavigate();

  // User Info
  const [user,setUser] = useState({
    username:'',
    password:'',
    email:'',
    phoneNumber:''
  });

  const handleChange = (e)=>{
    setUser((prev)=>({...prev,[e.target.name]:e.target.value,phoneNumber:value}))
  }

  // For Button Disabling
  useEffect(() => {
    if (user.username !== '' && user.email !== '' && user.password !== '' && user.password.length >=6) {
      setDisabled(false)
    } else {
      setDisabled(true);
    }
  }, [user]);

  // Handle the Submit
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.post('/auth/register',user);
      setError(false);
      navigate('/otp');
    }catch(err){
      setError(true);
    }
  }

  return (
    <form style={{width:'40%',position:'absolute',margin:'auto',left:0,right:0,top:'30%',bottom:0}}>
      <MDBRow className='mb-4' >
        <MDBCol>
          <MDBInput id='form3Example1' label='User Name' name='username' onChange={handleChange} />
        </MDBCol>
        <MDBCol>
        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}/>
        </MDBCol>
      </MDBRow>
      <MDBInput className='mb-4' type='email' id='form3Example3' name='email' label='Email address' onChange={handleChange} />
      <MDBInput className='mb-4' type='password' id='form3Example4' name='password' label='Password' onChange={handleChange} />

      <MDBCheckbox
        wrapperClass='d-flex justify-content-center mb-4'
        id='form3Example5'
        label='Subscribe to my website'
        defaultChecked
      />

      <MDBBtn type='button' onClick={handleSubmit} className='mb-4' block disabled={disabled}>
        Sign Up
      </MDBBtn>

      <div className='text-center'>
        <p>
          Are you a member? <Link to="/login">Login</Link>
        </p>
        { error&&<p style={{color:'red',textAlign:'center',fontSize:'15px'}}>User Already Existed</p> }
      </div>
    </form>
  );
}