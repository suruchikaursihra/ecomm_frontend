import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { CallApi } from "../../shared/services/api.service";
import CONFIG from '../../configuration/index';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

/**
 * 
 * @discription CSs for Review cart
 */
const useStyles = (theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
});

export class ReviewComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentAmount: 0
        }
    }

    componentDidMount() {
        this.props.calculatePaymentAmount()
    }

    /**
     * @description  this function delete data from backend redis cache
     * @param {ele} ele test object
     * @return {null} 
     */
    removeFromRedis(ele) {
        let Data = {
            user_id: this.props.user_id,
            token: this.props.token,
            item: ele
        }
        CallApi("POST", CONFIG.removeFromRedis, Data)
            .then((response) => {
                if (response.responseCode === 200) {

                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Order summary
                </Typography>
                <List disablePadding>
                    {this.props.cartItems.length > 0 ? <React.Fragment>
                        {this.props.cartItems.map((ele) => (
                            <ListItem className={classes.listItem} key={ele.id}>
                                <ListItemText primary={ele.itemName} secondary={ele.labName} />
                                <Typography variant="body2">₹{ele.minPrice}</Typography>
                                <IconButton aria-label="delete from cart" onClick={e => { this.props.deleteFromCart({ ele }); this.props.calculatePaymentAmount(); this.removeFromRedis(ele) }}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Total" />
                            <Typography variant="subtitle1" className={classes.total}>
                                ₹ {this.props.paymentAmount}
                            </Typography>
                        </ListItem>
                    </React.Fragment>
                        : <Typography variant="body2">No Items in cart.</Typography>}
                </List>
            </React.Fragment >
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
     * @return {deleteFromCart,calculatePaymentAmount} 
     */
const mapDispatchToProps = (dispatch) => {
    return {
        deleteFromCart: (payload) => dispatch({ type: 'DELETE_FROM_CART', payload }),
        calculatePaymentAmount: () => dispatch({ type: 'CALCULATE_PAYMENT_AMOUNT' })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ReviewComponent)))
