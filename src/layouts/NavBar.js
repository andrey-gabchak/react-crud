import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography color="inherit">
                        Weather label
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;