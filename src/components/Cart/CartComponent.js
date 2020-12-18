import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReviewComponent from "./ReviewComponent";
import FooterComponent from "../Footer/FooterComponent";
import BackspaceRoundedIcon from '@material-ui/icons/BackspaceRounded';
import IconButton from '@material-ui/core/IconButton';
import ROUTES from '../../shared/constants/routes';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { Redirect, withRouter } from "react-router-dom";
import { spinnerService } from '../../shared/services/spinner.service';
import { CallApi } from "../../shared/services/api.service";
import CONFIG from '../../configuration/index';

const useStyles = (theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
});

export class CartComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0,
            orderId: '',
            order_items: [],
            total_amount: 0,
            steps: ['Review Your Order']
        }
    }

    /**
     * @description  this function set page step count
     * @param {step} step current step
     * @return {component} 
     */
    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <ReviewComponent />;
            default:
                throw new Error("Unknown step");
        }
    }

    /**
     * @description  this function redirect to dashboard
     * @param {null} 
     * @return {Redirect} 
     */
    backToDashbaord = () => {
        this.props.history.push(ROUTES.DASHBOARD);
    }

    /**
     * @description  next button after review
     * @param {null}
     * @return {resetCart} 
     */
    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 })
        this.placeOrder();
        this.props.resetCart();
    };

    /**
     * @description This function calls backend api to save order 
     * @param {null} 
     * @return {setState} 
     */
    placeOrder = () => {
        let Data = {
            token: this.props.token,
            items: this.props.cartItems,
            user_id: this.props.user_id,
            paymentAmount: this.props.paymentAmount
        }
        spinnerService.show('Oval');
        CallApi("POST", CONFIG.placeOrder, Data)
            .then((response) => {
                if (response.responseCode === 200) {
                    this.setState({ orderId: response.data.order_id, order_items: response.data.order_items, total_amount: response.data.amount })
                }
            }).catch(function (error) {
                console.log(error);
            });

        CallApi("POST", CONFIG.resetRedis, Data)
            .then((response) => {
                spinnerService.hide('Oval');
            }).catch(function (error) {
                console.log(error);
            });

    }

    /**
     * @description  back button after review
     * @param {null}
     * @return {resetCart} 
     */
    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Checkout
                    </Typography>
                        <Typography variant="overline" display="block" noWrap>
                            <IconButton onClick={() => this.backToDashbaord()} size="small">
                                <BackspaceRoundedIcon />
                        Back
                        </IconButton>
                        </Typography>
                        <React.Fragment>
                            {this.state.activeStep === this.state.steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                </Typography>
                                    <ListItemText primary={`Your order has been Placed Successfully ORDER ID- ${this.state.orderId} `} />

                                    {this.state.order_items.map((ele) => (
                                        <ListItem className={classes.listItem} key={ele.id}>
                                            <ListItemText primary={ele.item_id} />
                                            <Typography variant="body2">₹{ele.min_price}</Typography>
                                        </ListItem>
                                    ))}
                                    <ListItem className={classes.listItem}>
                                        <ListItemText primary="Total" />
                                        <Typography variant="subtitle1" className={classes.total}>
                                            ₹ {this.state.total_amount}
                                        </Typography>
                                    </ListItem>

                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        {this.getStepContent(this.state.activeStep)}
                                        <div className={classes.buttons}>
                                            {this.state.activeStep !== 0 && (
                                                <Button onClick={() => this.handleBack()} className={classes.button}>
                                                    Back
                                                </Button>
                                            )}
                                            {this.props.cartItems.length > 0 && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => this.handleNext()}
                                                    className={classes.button}
                                                >
                                                    {this.state.activeStep === this.state.steps.length - 1 ? "Place order" : "Next"}
                                                </Button>
                                            )}

                                        </div>
                                    </React.Fragment>
                                )}
                        </React.Fragment>
                    </Paper>
                </main>
                <FooterComponent />
            </React.Fragment>
        )
    }
}

/**
     * @description  this function gets the token from redux store
     * @param {state} state returned by store
     * @return {cartItems,paymentAmount,token,user_id} 
     */
const mapStateToProps = (state) => {
    return { cartItems: state.cartItems, paymentAmount: state.paymentAmount, token: state.token, user_id: state.user_id }
}
/**
     * @description  this function gets the object to dispatch an action
     * @param {dispatch} dispatch returned by store
     * @return {resetCart} 
     */
const mapDispatchToProps = (dispatch) => {
    return {
        resetCart: () => dispatch({ type: 'RESET_CART' }),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(CartComponent)))
