import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Weather from "./components/weather/Weather"
import NavBar from "./layouts/NavBar";
import PageNotFound from "./layouts/PageNotFound";

const AppRouter = () => {
    return(
        <Fragment>
            <NavBar />
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Weather} />
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}

export default AppRouter;