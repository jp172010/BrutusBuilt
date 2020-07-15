import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase.js";
import { AuthContext } from "./Auth.js";
import "./SignUp";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import "./Login.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f7f7f7",
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Quest Board
            </Typography>
            <Button href="./SignUp" color="inherit">Sign Up</Button>
          </Toolbar>
        </AppBar>
        <Grid item xs={3}/>
        <Grid item xs={6} id="login">
        <h3>Member Login</h3>
        <Grid container spacing={3}>
        <form onSubmit={handleLogin}>
          <Grid item xs={12}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          </Grid>
          <Grid item xs={12}>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          </Grid>
          <Grid item xs={12}>
          <button type="submit">Log in</button>
          </Grid>
        </form>
        </Grid>
        </Grid>
        <Grid item xs={3}/>
      </Grid>
    </div>
  );
};

export default withRouter(Login);