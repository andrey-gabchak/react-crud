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


export const WeatherDialog = ({handleToggle,
                                  handleSubmit,
                                  handleInputChange,
                                  open,
                                  weatherDataItem = {EMPTY_WEATHER_DATA}}) => {
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleToggle}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {weatherDataItem.id === '' ? 'Create a new ' : 'Edit the '} weather data
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="temperature"
                            label="Temperature C°"
                            value={weatherDataItem.temperature}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            id="pressure"
                            label="Pressure mm"
                            value={weatherDataItem.pressure}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            id="humidity"
                            label="Humidity %"
                            value={weatherDataItem.humidity}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            id="airQuality"
                            label="Air Quality %"
                            value={weatherDataItem.airQuality}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            id="windSpeed"
                            label="Wind speed m/s"
                            value={weatherDataItem.windSpeed}
                            onChange={handleInputChange}
                        />
                        <br/>
                        <TextField
                            id="date"
                            label="Date yyyy-mm-dd"
                            value={weatherDataItem.date}
                            onChange={handleInputChange}
                        />
                    </form>
                </DialogContent>
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
            </Dialog>
        </Fragment>
    )
}