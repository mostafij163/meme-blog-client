import { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from "react-router-dom"
import { Button, Typography } from '@material-ui/core';
import MainContext from '../store/main-ctx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({loginStatus}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory()
  const mainCtx = useContext(MainContext)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    mainCtx.handleLogout()
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "#fff"
            }} component={Link} to="/">
            Meme Blog
          </Typography>
          <div style={{
            marginLeft: "auto",
            marginRight: "1rem"
          }}>
            {
            loginStatus ?
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/post-meme"
                    >Post Meme</MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/"
                  >Home</MenuItem>
                  <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/"
                    >Logout</MenuItem>
                  </Menu>
                </div> :
                  <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    history.push('/sign-up')
                    }}
                    style={{marginRight: "1rem"}}
                >
                    Sign up
                  </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    history.push('/login')
                    }}
                >
                    Login
                  </Button>
                </div>
              }
              </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
