import React from 'react'
import styles from './Users.module.css'
import Header from '../../header/header';
import { useNavigate } from 'react-router-dom'

function Users() {
  const navigate=useNavigate();
  return (
    <div className={styles.container}>
        <div className={styles.navbar}>
            <div ><Header/></div>
        </div>    
        
        <div className={styles.outerBox}>
            <h1 className={styles.header1}>Choose your User Type !!</h1>
            <button onClick={()=>{navigate("/orgevents")}} className={styles.button}>Organizer</button>
            <button onClick={()=>{navigate("/attendevents")}} className={styles.button}>Attendee</button>
        </div>
    </div>
  )
}

export default Users