import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {WEATHER_TABLE_HEADERS} from "./Constants";
import React, {Fragment} from "react";
import {WeatherTableRow} from "./WeatherTableRow";
import {WeatherTablePagination} from "./TablePagination";

export const WeatherTable = ({
                                 weatherData,
                                 handleEdit,
                                 handleDelete,
                                 pagination,
                                 changePage,
                                 changeRowsPerPage
                             }) => {
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
                            <WeatherTableRow
                                data={data}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <WeatherTablePagination
                pagination={pagination}
                changePage={changePage}
                changeRowsPerPage={changeRowsPerPage}
            />
        </Fragment>
    )
}