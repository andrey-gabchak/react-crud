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
            totalPages: 0,
            itemsPerPage: 10,
            page: 0
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch(API_CRUD, requestOptions)
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
            headers: {'Content-Type': 'application/json/'},
        };
        fetch({...API_CRUD} + id, requestOptions)
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
                        totalPages: body.totalPages,
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

    handlePageChange = (next) => {
        console.log(next)
        this.setState({
            page: next
        })
        console.log(this.state.pagination.page)
        if (0 !== this.state.pagination.page) {
            this.getWeatherDataListBetweenDates();
        }
    }

    handleItemsPerPageChange = (items) => {
        this.setState({
            itemsPerPage: items
        })
        console.log(this.state)
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
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                        pagination={this.state.pagination}
                        changePage={this.handlePageChange}
                        changeRowsPerPage={this.handleItemsPerPageChange}
                    />
                ) : NoDataMessage}
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
