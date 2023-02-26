import React, { useContext, useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { UserContext } from '../context/userContext.js';
import { format } from 'timeago.js';

export default function App() {
  const { currentUser } = useContext(UserContext) ;
  const formattedDate = format(currentUser.modifiedAt, 'en');
  const [quote,setQuote] = useState("");


  // Random Number Generator
  const rand = ()=>{
    const min = 1;
    const max = 1643;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNum;
  }


  useEffect(()=>{
    fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    setQuote(data[rand()].text)
  });
  },[])

  return (
    <MDBCard style={{maxWidth: '540px',height:"270px",position:'absolute',margin:'auto',left:0,right:0,top:'5%',bottom:0}}>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage src='https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp' alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>{currentUser.username}</MDBCardTitle>
            <MDBCardText>
                <strong>{currentUser.username} today's quote for you :<br/></strong>
                {quote}
            </MDBCardText>
            <MDBCardText><strong>Email:</strong> {currentUser.email}</MDBCardText>
            <MDBCardText>
              <small className='text-muted'>Last Modified {formattedDate}</small>
            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}