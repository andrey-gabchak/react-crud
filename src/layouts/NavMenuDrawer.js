import React, {Component, Fragment} from 'react';
import {
    Drawer, ListItemIcon, ListItemText, IconButton, MenuList, MenuItem
} from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import AssessmentIcon from '@material-ui/icons/Assessment';
import StorageIcon from '@material-ui/icons/Storage';
import {BrowserRouter, Link } from "react-router-dom";

class NavMenuDrawer extends Component {
    state = {
        isOpen: false
    }

    toggleDrawer = () => {
        this.setState(state => ({
            ...state, isOpen: !state.isOpen
        }))
    }

    render() {
        const list = () => (
            <div
                role="presentation"
            >
                <BrowserRouter>
                    <MenuList>
                        <MenuItem
                            component={Link}
                            to="/weather-forecasting"
                        >
                            <ListItemIcon> <WbSunnyIcon/></ListItemIcon>
                            <ListItemText>Weather forecasting</ListItemText>
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/"
                        >
                            <ListItemIcon> <StorageIcon/></ListItemIcon>
                            <ListItemText>Weather data</ListItemText>
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/analytics">
                            <ListItemIcon> <AssessmentIcon/></ListItemIcon>
                            <ListItemText>Analytics</ListItemText>
                        </MenuItem>
                    </MenuList>
                </BrowserRouter>
            </div>
        );

        return (
            <BrowserRouter>
                <Fragment key="MenuDrawer">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={this.toggleDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={this.state.isOpen}
                        onClose={this.toggleDrawer}
                    >
                        {list()}
                    </Drawer>
                </Fragment>
            </BrowserRouter>
        )
    }
}

export default NavMenuDrawer
