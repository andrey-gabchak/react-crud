import {TableCell, TableRow} from "@material-ui/core";
import {WeatherItemButtons} from "./WeatherItemButtons";
import React from "react";

export const WeatherTableRow = ({data, handleDelete, handleEdit}) => {
    return (
        <TableRow key={data.id}>
            <TableCell>{data.id}</TableCell>
            <TableCell>{data.temperature}</TableCell>
            <TableCell>{data.pressure}</TableCell>
            <TableCell>{data.humidity}</TableCell>
            <TableCell>{data.airQuality}</TableCell>
            <TableCell>{data.windSpeed}</TableCell>
            <TableCell>{data.date}</TableCell>
            <TableCell>
                <WeatherItemButtons
                    data={data}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            </TableCell>
        </TableRow>
    )
}