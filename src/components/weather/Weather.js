import React, {Component, Fragment} from 'react';
import {EMPTY_WEATHER_DATA, API_CRUD, API_GET_BETWEEN_DATES_PATH} from "./Constants";
import {WeatherDialog} from "./WeaterDialog";
import {WeatherTable} from "./WeatherTable";
import {WeatherCreateButton} from "./WeatherCreateButton";
import Typography from "@material-ui/core/Typography";
import {TableToolbar} from "./TableToolbar";

class Weather extends Component {
    date = new Date()
    year = this.date.getFullYear()
    month = this.date.getMonth()
    firstDayOfMonth = new Date(this.year, this.month, 2).toISOString().split('T')[0];
    lastDayOfMonth = new Date(this.year, this.month + 1, 1).toISOString().split('T')[0];

    state = {
        open: false,
        weatherData: [],
        selectedData: {...EMPTY_WEATHER_DATA},
        filter: {
            dateFrom: this.firstDayOfMonth,
            dateTo: this.lastDayOfMonth,
        },
        pagination: {
            totalItems: 0,
            itemsPerPage: 10,
            page: 0
        },
        errors: {
            temperature: false,
            pressure: false,
            humidity: false,
            airQuality: false,
            windSpeed: false,
        }
    }

    validation = (data) => {
        if (data.temperature > 100 || data.temperature < -100) {
            this.setState(state => ({
                ...state,
                errors: {
                    temperature: true
                }
            }))
            return false;
        }

        if (data.pressure < 0) {
            this.setState(state => ({
                ...state,
                errors: {
                    pressure: true
                }
            }))
            return false;
        }
        if (data.humidity < 0) {
            this.setState(state => ({
                ...state,
                errors: {
                    humidity: true
                }
            }))
            return false;
        }
        if (data.airQuality < 0) {
            this.setState(state => ({
                ...state,
                errors: {
                    airQuality: true
                }
            }))
            return false;
        }
        if (data.windSpeed < 0) {
            this.setState(state => ({
                ...state,
                errors: {
                    windSpeed: true
                }
            }))
            return false;
        }
        return true
    }

    handleInputWeatherItemChange = (event) => {
        const target = event.target;
        const value = target.value;
        const id = target.id;
        this.setState(state => ({
            ...state,
            selectedData: {
                ...state.selectedData,
                [id]: value
            },
            errors: {
                [id]: false
            }
        }))
    }

    toggleWeatherDialog = () => {
        this.setState({
            open: !this.state.open
        })
    };

    handleWeatherItemSubmit = (data) => {
        if (this.validation(data)) {
            this.saveWeatherItem(data);
            this.toggleWeatherDialog()
        }
    }

    saveWeatherItem = (data) => {
        let methodType = data.id ? 'PUT' : 'POST';
        const requestOptions = {
            method: methodType,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch(API_CRUD, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.updateWeatherTableState(data)
            });
    }

    updateWeatherTableState = (data) => {
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

    handleEditTableItem = (data) => {
        this.setState(state => ({
            ...state,
            selectedData: data
        }))
        this.toggleWeatherDialog();
    }

    handleCreateTableItem = () => {
        this.setState(state => ({
            ...state,
            selectedData: EMPTY_WEATHER_DATA
        }))
        this.toggleWeatherDialog();
    }

    deleteTableItem = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json/'},
        };
        fetch(API_CRUD + id, requestOptions)
            .then(() => {
                let updateData = [...this.state.weatherData].filter(i => i.id !== id);
                this.setState({weatherData: updateData})
            })
    }

    componentDidMount() {
        this.getWeatherDataListBetweenDates()
    }

    getWeatherDataListBetweenDates = () => {
        fetch(this.buildGetWeatherDataRequest())
            .then(response => response.json())
            .then(body => {
                this.setState(state => ({
                    ...state,
                    weatherData: body.content,
                    pagination: {
                        totalItems: body.totalElements,
                        itemsPerPage: body.size,
                        page: body.number
                    }
                }))
            })
    }

    buildGetWeatherDataRequest = () => {
        const {dateFrom, dateTo} = this.state.filter
        const {itemsPerPage, page} = this.state.pagination
        const params = [
            'itemsPerPage=' + itemsPerPage,
            'page=' + page,
            'dateFrom=' + dateFrom,
            'dateTo=' + dateTo].join('&')
        return API_GET_BETWEEN_DATES_PATH + '?' + params
    }

    handleDatesFilterChange = (event) => {
        let id = event.target.id
        let value = event.target.value
        this.setState(state => ({
            filter: {
                ...state.filter,
                [id]: value
            }
        }))
    }

    handleDatesFilterSubmit = (filter) => {
        this.setState({
            filter: filter
        })
        this.getWeatherDataListBetweenDates()
    }

    handlePagination = (event, page) => {
        this.setState(state => ({
            ...state,
            pagination: {
                ...state.pagination,
                page: page
            }
        }), () => this.getWeatherDataListBetweenDates())
    }

    handleItemsPerPageChange = (event) => {
        this.setState(state => ({
            ...state,
            pagination: {
                ...state.pagination,
                itemsPerPage: event.target.value
            }
        }), () => this.getWeatherDataListBetweenDates())
    }

    render() {
        let {weatherData, open, selectedData} = this.state;
        return (
            <Fragment>
                <TableToolbar
                    filter={this.state.filter}
                    handleSubmit={this.handleDatesFilterSubmit}
                    handleInputChange={this.handleDatesFilterChange}
                />
                {weatherData && weatherData.length > 0 ? (
                    <WeatherTable
                        weatherData={weatherData}
                        handleEdit={this.handleEditTableItem}
                        handleDelete={this.deleteTableItem}
                        pagination={this.state.pagination}
                        changePage={this.handlePagination}
                        changeRowsPerPage={this.handleItemsPerPageChange}
                    />
                ) : NoDataMessage}
                <WeatherCreateButton handleCreate={this.handleCreateTableItem}/>
                <WeatherDialog
                    handleToggle={this.toggleWeatherDialog}
                    handleSubmit={this.handleWeatherItemSubmit}
                    handleInputChange={this.handleInputWeatherItemChange}
                    open={open}
                    weatherDataItem={selectedData}
                    errors={this.state.errors}
                />
            </Fragment>
        );
    }
}

export default Weather;

const NoDataMessage = (
    <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
    >
        <Typography
            variant="h5"
            color="secondary"
        >
            Data was not received
        </Typography>
        <p>Please, check your server connection.</p>
    </div>
)
