import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(3),
    },
}));

export const WeatherCreateButton = ({ handleCreate }) => {
    const classes = useStyles()
    return (
        <Fab
            color="primary"
            size="small"
            className={classes.root}
        >
            <AddIcon
                id="createNewWeatherDataButton"
                onClick={handleCreate}
            />
        </Fab>
    )
}