import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ResponsiveDialog = props => {
    const {
        title,
        content,
        openModal
    } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (props.OnAgree && !props.error) {
            props.OnAgree();
        }
        setOpen(false);
    };

    const handleCancleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        handleClickOpen();
    }, []);

    return (
        <div>
            {openModal ?
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title">

                    <DialogTitle id="responsive-dialog-title">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Ok
                        </Button>
                        <Button onClick={handleCancleClose} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog> : ''
            }

        </div>
    );
}

export default ResponsiveDialog;