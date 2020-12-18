import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";
import * as LoginValidation from "../../shared/validator/validationRules";
import CONFIG from '../../configuration/index';
import ROUTES from '../../shared/constants/routes';
import { spinnerService } from '../../shared/services/spinner.service';
import { CallApi } from "../../shared/services/api.service";
import { isFormValid, updateValidators, displayValidationErrors, resetValidators, } from "../../shared/validator/formValidator";
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

/**
     * @description  Css For Material 
     */
const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


export class LoginComponent extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            alertMessage: false
        }
        this.validators = LoginValidation.LoginValidation;
        resetValidators(this.validators);
    }

    /**
     * @description  This function updates the form input fields
     * @param {name, value} input type and its value
     */
    onChange(name, value) {
        this.setState({ [name]: value });
        updateValidators(name, value, this.validators);
    }

    /**
     * @description  This function updates the form input fields
     * @param {input, value} input type and its value
     * @return {null} doesnot return anything
     */
    submitForm() {

        let Data = {
            email: this.state.email,
            password: this.state.password
        }
        spinnerService.show('Oval');
        CallApi("POST", CONFIG.login, Data)
            .then((response) => {
                spinnerService.hide('Oval');
                if (response.responseCode === 200) {
                    localStorage.setItem('token', response.data.token);
                    this.props.saveToken({ token: response.data.token, user_id: response.data.user_id, cartItems: response.data.cartItems });
                    this.props.history.push(ROUTES.DASHBOARD);
                } else {
                    this.setState({
                        alertMessage: response.responseMessage
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <form className={classes.form} noValidate>
                            {this.state.alertMessage ? <Alert severity="error">{this.state.alertMessage}</Alert> : ''}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={e => this.onChange('email', e.target.value)}
                                autoFocus
                            />
                            {displayValidationErrors("email", this.validators)}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={e => this.onChange('password', e.target.value)}
                            />
                            {displayValidationErrors("password", this.validators)}
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!isFormValid(this.validators)}
                                onClick={e => this.submitForm()}
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        )
    }
}

/**
     * @description  this function gets the token from redux store
     * @param {state} state returned by store
     * @return {token} 
     */
const mapStateToProps = (state) => {
    return { token: state.token }
}

/**
     * @description  this function gets the object to dispatch an action
     * @param {dispatch} dispatch returned by store
     * @return {saveToken,addToCart} 
     */
const mapDispatchToProps = (dispatch) => {
    return {
        saveToken: (payload) => dispatch({ type: 'SAVE_TOKEN', payload }),
        addToCart: (payload) => dispatch({ type: 'ADD_TO_CART', payload }),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(LoginComponent)))
