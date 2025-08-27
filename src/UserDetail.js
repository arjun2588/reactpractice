import React, { useState } from 'react';
import Button from './Button';
export default function UserDetail({user,changeColor,isBgChange}){
    // This component displays user details
    const name = user.name || 'Unknown User';
    return (
      <>
        { isBgChange ? (<h1>Background Color Changed</h1>) : 
            (
                <div>
                    <h1>User Detail</h1>
                    <p>Name: {name}</p>
                    <p>Department :{user.department}</p>
                    <p>Designation: {user.designation}</p>
                    <p>Location: {user.location}</p>
                    <p>Experience: {user.experience}</p>
                    <Button changeColor={changeColor}>Change Background Color</Button>  
                </div>
            )
        } 
      </>
    )
}