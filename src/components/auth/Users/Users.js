import React from 'react'
import styles from './Users.module.css'


function Users() {
  return (
    <div className={styles.container}>
        
        <div className={styles.outerBox}>
            <h1 className={styles.header1}>Choose your User Type !!</h1>
            <button className={styles.button}>Organizer</button>
            <button className={styles.button}>Attendee</button>
        </div>
    </div>
  )
}

export default Users