import React, { useContext, useState, } from 'react';
import clsx from 'clsx';
import { makeStyles,} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {Button, Typography, Paper } from "@material-ui/core"
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from "axios"
import MainContext from '../store/main-ctx';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "39vw",
        marginTop: "10%",
        margin: "auto",
        height: "216px",
        padding: "30px"
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
  "sign-btn": {
        padding: "10.5px 26px", 
        margin: "2rem 2rem",
        float: "right"
    },
    input: {
        width: "-webkit-fill-available",
        margin: "1rem 1rem 0rem 1rem",
        height: "3.1rem"
    }
}));

export default function Login() {
    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState({
        password: '',
        showPassword: false,
    });
    const mainCtx = useContext(MainContext)
    const history = useHistory()

    const signupFormSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/user/login", {
            email: email,
            password: password.password
        }).then(res => {
            if (res.status == 200) {
                mainCtx.handleLoginStatus(res.data)
                history.push("/")
            }
        })
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleChange = (prop) => (event) => {
        setPassword({ ...password, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Paper className={classes.root}>
            <form onSubmit={signupFormSubmit}>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <FormControl className={clsx(classes.margin, classes.textField), classes.input} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                    id="password"
                    type={password.showPassword ? 'text' : 'password'}
                    value={password.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {password.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                    />
                </FormControl>
                <Button
                    variant="contained"
                        color="primary"
                        type="submit"
                    className={classes["sign-btn"]}
                    to="/sign-up"
                >
                    <Typography variant="h6">Login</Typography>
                </Button>
            </form>
        </Paper>
    )
}