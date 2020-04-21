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
import TablePagination from '@material-ui/core/TablePagination';

export const WeatherTable = ({
                                 weatherData,
                                 handleEdit,
                                 handleDelete,
                                 pagination,
                                 changePage,
                                 changeRowsPerPage
                             }) => {
    const {
        totalItems,
        itemsPerPage,
        page
    } = pagination
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
            <TablePagination
                className="weatherTablePagination"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalItems}
                rowsPerPage={itemsPerPage}
                page={page}
                onChangePage={() => changePage(page + 1)}
                onChangeRowsPerPage={() => changeRowsPerPage(itemsPerPage)}
                style={{ marginRight: "60px"}}
            />
        </Fragment>
    )
}