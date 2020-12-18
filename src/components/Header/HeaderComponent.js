import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withRouter } from "react-router-dom";
import { fade } from '@material-ui/core/styles';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import { spinnerService } from '../../shared/services/spinner.service';
import { CallApi } from "../../shared/services/api.service";
import CONFIG from '../../configuration/index';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ROUTES from '../../shared/constants/routes';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

/**
     * @description  Css for header
     */
const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    cart: {
        color: 'white'
    },
    title: {
        flexGrow: 3,
        fontSize: 'xx-large',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    button: {
        backgroundColor: 'rgb(246, 250, 232)',
        marginRight: '100px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 1),
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
});

export class HeaderComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    /**
     * @description  This function serach tests
     * @param {null} 
     * @return {Call Parent Function}
     */
    searchTests = () => {
        let Data = {
            user_id: this.props.user_id,
            token: localStorage.getItem('token'),
            search: this.state.search
        }

        CallApi("POST", CONFIG.searchTestsList, Data)
            .then((response) => {
                spinnerService.hide('Oval');
                if (response.responseCode === 200) {
                    this.props.updateTestsLists(response.data)
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    /**
     * @description  This function updates the form input fields
     * @param {value} value value 
     * @return {setState} set alert
     */
    onChange = (value) => {
        this.setState({ search: value });
        if (value == '') {
            this.searchTests();
        }
    }

    /**
     * @description  This function logouts
     * @param {null}
     * @return {call redux cleanup} cleanup and redirect
     */
    logout = () => {
        this.props.logout();
        this.props.history.push(ROUTES.LOGIN);
    }

    /**
     * @description  This function redirects to cart
     * @param {null} 
     * @return {redirect} 
     */
    goToCart = () => {
        this.props.history.push(ROUTES.MYCART);
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="overline" display="block" noWrap>
                            <Button type="button" color="primary" varient="contained" className={classes.button} onClick={() => this.logout()}>Logout</Button>
                        </Typography>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Netmeds
                        </Typography>
                        {this.props.updateTestsLists ?
                            <React.Fragment>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        onChange={e => this.onChange(e.target.value)}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                <Button type="button" color="primary" varient="contained" className={classes.button} onClick={() => this.searchTests()}> Search</Button>
                                <IconButton className={classes.cart} aria-label="add to cart" onClick={e => this.goToCart()}>
                                    <Badge badgeContent={this.props.cartItems ? this.props.cartItems.length : ''} color="secondary">
                                        <ShoppingCartTwoToneIcon />
                                    </Badge>
                                </IconButton>
                            </React.Fragment>
                            : ''}
                    </Toolbar>
                </AppBar>
            </div >
        )
    }
}

/**
     * @description  this function gets the token from redux store
     * @param {state} state returned by store
     * @return {user_id,token,cartItems} 
     */
const mapStateToProps = (state) => {
    return {
        user_id: state.user_id,
        token: state.token,
        cartItems: state.cartItems
    }
}

/**
     * @description  this function gets the object to dispatch an action
     * @param {dispatch} dispatch returned by store
     * @return {logout} 
     */
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({ type: 'LOGOUT' })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(HeaderComponent)))
