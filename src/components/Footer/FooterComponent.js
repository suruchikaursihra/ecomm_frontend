import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#EEEEEE',
        padding: theme.spacing(2),
    },
}));

function FooterComponent() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Nedmeds
                    </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Copyright© 2020 Netmeds Marketplace Ltd.
                    </Typography>
            </footer>
        </React.Fragment>
    )
}

export default FooterComponent
