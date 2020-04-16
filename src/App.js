import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Weather from "./components/weather/Weather"
import {AppBar} from "@material-ui/core";
import NavBar from "./layouts/NavBar";

const AppRouter = () => {
    return(
        <Fragment>
            <NavBar />

            <Router>
                <Switch>
                    <Route path="/" exact component={Weather} />
                    <Route path="/bar" exact component={AppBar} />
                </Switch>
            </Router>
        </Fragment>
    )
}

export default AppRouter;