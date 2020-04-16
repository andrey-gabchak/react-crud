import React, {Component, Fragment} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Button, ButtonGroup
} from '@material-ui/core';
import {EMPTY_WEATHER_DATA, WEATHER_TABLE_HEADERS} from "./Constants";
import {WeatherDialog} from "./WeaterDialog";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {TEST_WEATHER_DATA} from "../../test.data/TestWeatherData";


class WeatherTable extends Component {
    state = {
        open: false,
        weatherData: [{...EMPTY_WEATHER_DATA}],
        selectedData: {...EMPTY_WEATHER_DATA}
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        this.setState(state => ({
            ...state,
            selectedData: {
                ...state.selectedData,
                [id]: value
            }
        }))
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    };

    handleSubmit = (data) => {
        this.setState(state => ({
            ...state,
            weatherData: [...state.weatherData, data]
        }))
        this.handleSaveRequest()
        this.handleToggle()
    }

    handleSaveRequest = () => {
        let selectedData = this.state.selectedData;
        let methodType = selectedData.id ? 'PUT' : 'POST';
        const requestOptions = {
            method: methodType,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedData)
        };
        fetch('http://localhost:5000/api/v1/weather-data', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.updateWeatherItemInState(data)
            });
    }

    updateWeatherItemInState = (data) => {
        let weatherData = [...this.state.weatherData]
        const index = weatherData.findIndex(elem => elem.id === data.id)
        let updatedWeatherData = [...weatherData]
        updatedWeatherData[index] = data
        console.log(updatedWeatherData)
        this.setState(state => ({
            ...state,
            weatherData: updatedWeatherData,
        }))
    }

    handleEdit = (data) => {
        this.setState(state => ({
            ...state,
            selectedData: data
        }))
        this.handleToggle();
    }

    handleCreate = () => {
        this.setState(state => ({
            ...state,
            selectedData: EMPTY_WEATHER_DATA
        }))
        this.handleToggle();
    }

    handleDelete = (id) => {
        this.setState(state => ({
            ...state,
            deleteId: id
        }))
        this.handleDeleteRequest(id)
    }

    handleDeleteRequest = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json/' },
        };
        fetch('http://localhost:5000/api/v1/weather-data/'  + id, requestOptions)
            .then(() => {
                let updateData = [...this.state.weatherData].filter(i => i.id !== id);
                this.setState({weatherData: updateData})
            })
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/v1/weather-data')
            .then(response => response.json())
            .then(body => this.setState({weatherData: body}))
    }

    render() {
        const {weatherData, open, selectedData} = this.state;

        return (
            <Fragment>
                <TableContainer component={Paper}>
                    <Table aria-label="weather data">
                        <TableHead>
                            <TableRow key="header">
                                {WEATHER_TABLE_HEADERS.map((oneHeader => (
                                    <TableCell>{oneHeader}</TableCell>
                                )))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {weatherData.map(data => (
                                <TableRow key={data.id}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.temperature}</TableCell>
                                    <TableCell>{data.pressure}</TableCell>
                                    <TableCell>{data.humidity}</TableCell>
                                    <TableCell>{data.airQuality}</TableCell>
                                    <TableCell>{data.windSpeed}</TableCell>
                                    <TableCell>{data.date}</TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <Button
                                                onClick={() => this.handleEdit(data)}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                color="secondary"
                                                onClick={() => this.handleDelete(data.id)}
                                            >
                                                Delete
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    color="primary"
                    fontSize="large"
                    onClick={this.handleCreate}
                >
                    <AddCircleIcon/>
                </Button>
                <WeatherDialog
                    handleToggle={this.handleToggle}
                    handleSubmit={this.handleSubmit}
                    handleInputChange={this.handleInputChange}
                    open={open}
                    weatherDataItem={selectedData}
                />
            </Fragment>
        );
    }
}

export default WeatherTable;
