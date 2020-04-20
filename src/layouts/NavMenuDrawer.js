import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import AssessmentIcon from '@material-ui/icons/Assessment';
import StorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function NavMenuDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        anchor: false,
    });

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, anchor: !state.anchor });
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
        >
            <List>
                <ListItem button >
                    <ListItemIcon> <WbSunnyIcon /></ListItemIcon>
                    <ListItemText>Weather forecasting</ListItemText>
                </ListItem>
                <ListItem button >
                    <ListItemIcon> <StorageIcon /></ListItemIcon>
                    <ListItemText>Weather data</ListItemText>
                </ListItem>
                <ListItem button >
                    <ListItemIcon> <AssessmentIcon /></ListItemIcon>
                    <ListItemText>Analytics</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <Fragment key="MenuDrawer">
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer()}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="left"
                    open={state.anchor}
                    onClose={toggleDrawer()}
                >
                    {list()}
                </Drawer>
            </Fragment>
        </div>
    );
}
