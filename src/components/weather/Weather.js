import React, {Component, Fragment} from 'react';
import WeatherTable from "./WeatherTable";

class Weather extends Component {

    render() {
        return (
            <Fragment>
                <WeatherTable />
            </Fragment>
        );
    }
}

export default Weather