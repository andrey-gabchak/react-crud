import React, {Component, Fragment} from 'react';
import {EMPTY_WEATHER_DATA} from "./Constants";
import {WeatherDialog} from "./WeaterDialog";
import {WeatherTable} from "./WeatherTable";
import {WeatherCreateButton} from "./WeatherCreateButton";
import {TableToolbar} from "./TableToolbar";

class Weather extends Component {
    state = {
        open: false,
        weatherData: [{...EMPTY_WEATHER_DATA}],
        selectedData: {...EMPTY_WEATHER_DATA},
        filter: {
            dateFrom: '',
            dateTo: ''
        }
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
        this.handleSaveRequest(data)
        this.handleToggle()
    }

    handleSaveRequest = (data) => {
        let methodType = data.id ? 'PUT' : 'POST';
        const requestOptions = {
            method: methodType,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('/api/v1/weather-data', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.updateWeatherState(data)
            });
    }

    updateWeatherState = (data) => {
        let weatherData = [...this.state.weatherData]
        const index = weatherData.findIndex(elem => elem.id === data.id)
        let updatedWeatherData = [...weatherData]
        if (index === -1) {
            updatedWeatherData = [...updatedWeatherData, data];
        } else {
            updatedWeatherData[index] = data;
        }
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
        this.handleDeleteRequest(id)
        this.setState(state => ({
            ...state,
            deleteId: id
        }))
    }

    handleDeleteRequest = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json/' },
        };
        fetch('/api/v1/weather-data/'  + id, requestOptions)
            .then(() => {
                let updateData = [...this.state.weatherData].filter(i => i.id !== id);
                this.setState({weatherData: updateData})
            })
    }

    componentDidMount() {
        this.initializeDates()
        this.getWeatherDataListBetweenDates()
    }

    initializeDates = () => {
        let date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth()
        let firstDayOfMonth = new Date(year, month, 1).toISOString();
        let lastDayOfMonth = new Date(year, month + 1, 0).toISOString();
        this.setState(state => ({
            ...state,
            filter: {
                ...state.filter,
                dateFrom: firstDayOfMonth,
                dateTo: lastDayOfMonth
            }
        }))
    }

    getWeatherDataListBetweenDates = () => {
        fetch(this.buildGetWeatherDataRequest())
            .then(response => response.json())
            .then(body => this.setState({weatherData: body}))
    }

    buildGetWeatherDataRequest = () => {
        let dateFrom = this.state.filter.dateFrom
        let dateTo = this.state.filter.dateTo
        let dateParams = dateFrom && dateTo
            ? '?dateFrom=' + dateFrom+ '&dateTo=' + dateTo
            : ''
        return '/api/v1/weather-data' + dateParams
    }

    render() {
        const {
            weatherData,
            open,
            selectedData,
            dateFrom,
            dateTo
        } = this.state;

        return (
            <Fragment>
                <TableToolbar
                    dateTo={dateTo}
                    dateFrom={dateFrom}
                />
                <WeatherTable
                    weatherData={weatherData}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
                <WeatherCreateButton handleCreate={this.handleCreate}/>
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

export default Weather;
