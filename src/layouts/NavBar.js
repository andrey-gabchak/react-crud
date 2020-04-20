import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavMenuDrawer from "./NavMenuDrawer";
import LoginDialog from "./LoginDialog";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavMenuDrawer />
                    <Typography variant="h6" className={classes.title}>
                        Weather app
                    </Typography>
                    <LoginDialog />
                </Toolbar>
            </AppBar>

        </div>
    );
}