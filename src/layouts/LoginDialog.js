import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function LoginDialog() {
    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
        setOpen( !open)
    }

    return (
        <div>
            <Button color="inherit" onClick={handleToggle}>
                Login
            </Button>
            <Dialog open={open} onClose={handleToggle} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Sing in to Weather app</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please sing in or register if you're a new user
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="user-email"
                        label="Your email"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="user-password"
                        label="Your password"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleToggle}
                        variant="contained"
                        color="primary"
                    >
                        Sing in
                    </Button>
                    <Button
                        onClick={handleToggle}
                        color="primary"
                    >
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
