import React from 'react'

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

const NavBar = (props) => {
  return (
    <Grid item xs={12}>
      <Paper className="paper">
        <h1>
          WELCOME {props.active_user.name}
        </h1>
        <Button color="primary" onClick={props.handleLogout}>LOGOUT</Button>
      </Paper>
    </Grid>
  )
}

export default NavBar
