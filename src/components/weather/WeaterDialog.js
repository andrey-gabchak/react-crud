import React, {Fragment} from "react";
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    TextField
} from "@material-ui/core";
import {EMPTY_WEATHER_DATA} from './Constants'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    textField: {
        width: '100%',
    },
}));

export const WeatherDialog = ({handleToggle,
                              handleSubmit,
                              handleInputChange,
                              open,
                              weatherDataItem = {EMPTY_WEATHER_DATA}}) => {
    let title = (weatherDataItem.id === '' ? 'Create a new ' : 'Edit the ') + 'weather data';
    const classes = useStyles();
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleToggle}
                aria-labelledby="weather-dialog"
            >
                <DialogTitle id="weather-dialog">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            className={classes.textField}
                            id="temperature"
                            label="Temperature C°"
                            type="number"
                            value={weatherDataItem.temperature}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            className={classes.textField}
                            id="pressure"
                            label="Pressure mm"
                            type="number"
                            value={weatherDataItem.pressure}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            className={classes.textField}
                            id="humidity"
                            label="Humidity %"
                            type="number"
                            value={weatherDataItem.humidity}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            className={classes.textField}
                            id="airQuality"
                            label="Air Quality %"
                            type="number"
                            value={weatherDataItem.airQuality}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            className={classes.textField}
                            id="windSpeed"
                            label="Wind speed m/s"
                            type="number"
                            value={weatherDataItem.windSpeed}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            className={classes.textField}
                            id="date"
                            label=" "
                            type="date"
                            value={weatherDataItem.date}
                            onChange={handleInputChange}
                        />
                    </form>
                </DialogContent>
                <DialogActionButtons
                    weatherDataItem={weatherDataItem}
                    handleSubmit={handleSubmit}
                    handleToggle={handleToggle}
                />
            </Dialog>
        </Fragment>
    )
}

const DialogActionButtons = ({weatherDataItem, handleSubmit, handleToggle}) => {
    return (
        <DialogActions>
            <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={() => handleSubmit(weatherDataItem)}
            >
                Save
            </Button>
            <Button
                onClick={handleToggle}
                color="secondary">
                Close
            </Button>
        </DialogActions>
        )
}