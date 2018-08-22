import React from 'react'

// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

const NavBar = (props) => {

  const styles = {
    navBar: {
      //border: '1px solid #000',
      //borderRadius: '5px',
      width:'100%',
      margin: 0,
      position:'fixed',
      top: 0,
      backgroundColor: 'white',
      borderBottom: '2px solid black'
    },
    h2: {
      textAlign: 'center',
      //border: '1px solid #000',
      display: 'inline-block',
      width: '200px',
      padding: '10px',
      marginTop: '20px',
    },
    button: {   //fix the log Out button
      cursor: 'pointer',
      padding: '10px',
      float: 'right',
      marginRight: '20px',
      display: 'inline-block',
      marginTop: '20px',
      borderRadius: '5px',
      fontSize: '12px'
    },
  }
  return (
    <div style={styles.navBar} >
      <h2 style={styles.h2} >
          Hi {props.active_user.name}!
      </h2>
      <Button variant="outlined" style={styles.button} onClick={props.handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default NavBar
