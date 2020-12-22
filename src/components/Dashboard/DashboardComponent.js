import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import HeaderComponent from '../Header/HeaderComponent';
import FooterComponent from '../Footer/FooterComponent';
import { spinnerService } from '../../shared/services/spinner.service';
import { CallApi } from "../../shared/services/api.service";
import CONFIG from '../../configuration/index';
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';

/**
     * @description  ccs for dashboard
     */
const useStyles = (theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3, 0, 1),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        backgroundColor: 'rgb(246, 250, 232)',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    book: {
        backgroundColor: 'blue',
        color: 'white',
    },
    alert: {
        padding: '0px 5px',
        borderRadius: '24px',
    }
});

export class DashboardComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            testList: [],
            showAlert: false
        }
    }

    /**
     * @description  This function updates the intial page after mounting 
     */
    componentDidMount() {
        this._isMounted = true;
        this.getTestLists();
    }

    /**
     * @description  This function gets the medical tests lists
     * @param {null} null
     * @return {setState} set testList
     */
    getTestLists = () => {
        let Data = {
            token: this.props.token,
            user_id: this.props.user_id
        }

        CallApi("POST", CONFIG.getTestsList, Data)
            .then((response) => {
                spinnerService.hide('Oval');
                if (response.responseCode === 200) {
                    this.setState({ testList: response.data })
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    /**
     * @description  This function updates the form input fields
     * @param {lists} lists search data 
     * @return {setState} set testList
     */
    updateTestsLists = (lists) => {
        this.setState({ testList: lists });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * @description  This function save the cart data into backend redis cache
     * @param {ele} ele medical test object
     * @return {setState} set alert
     */
    saveToRedis(ele) {
        this.props.addToCart({ ele });
        this.setState({ showAlert: false });
        let Data = {
            items: ele,
            token: this.props.token,
            user_id: this.props.user_id
        }

        CallApi("POST", CONFIG.saveToRedis, Data)
            .then((response) => {
                if (response.responseCode === 200) {
                    this.setState({ showAlert: true });
                }
            }).catch(function (error) {
                console.log(error);
            });
    }


    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <HeaderComponent updateTestsLists={this.updateTestsLists} />
                <main>
                    <div className={classes.heroContent}>
                        <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                            Lab Tests
                        </Typography>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {this.state.showAlert ? <Alert severity="success">Your Test is been added to the cart</Alert> : ''}
                        <br />
                        <Grid container spacing={4}>
                            {this.state.testList.map((ele) => (
                                <Grid item xs={12} sm={6} md={4} key={ele.id}>
                                    <Card className={classes.card}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography variant="h6" gutterBottom>
                                                {ele.itemName}
                                            </Typography>
                                            <Typography variant="caption" display="block">
                                                PRICE: ₹{ele.minPrice}
                                            </Typography>
                                            {ele.labName ? <Typography variant="caption" display="block">
                                                Lab Name: {ele.labName}
                                            </Typography> : ''}
                                            <Typography variant="caption" display="block">
                                                CATEGORY: {ele.category}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            {ele.popular === 'TRUE' ? <Alert variant="outlined" severity="success" className={classes.alert}>Popular</Alert> : ''}
                                            <Button className={classes.book} color="primary" onClick={e => { this.saveToRedis(ele) }}>
                                                Book
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                            {this.state.testList.length === 0 ? <Typography variant="h6" gutterBottom>
                                No Tests Found !
                                            </Typography> : ''}
                        </Grid>
                    </Container>
                </main>
                <FooterComponent />
            </React.Fragment>
        )
    }
}

/**
     * @description  this function gets the token from redux store
     * @param {state} state returned by store
     * @return {cartItems,token,user_id} 
     */
const mapStateToProps = state => {
    return { token: state.token, user_id: state.user_id, cartItems: state.cartItems };
};

/**
     * @description  this function gets the object to dispatch an action
     * @param {dispatch} dispatch returned by store
     * @return {addToCart} 
     */
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (payload) => dispatch({ type: 'ADD_TO_CART', payload })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(DashboardComponent)))
