import {Button, ButtonGroup} from "@material-ui/core";
import React from "react";

export const WeatherItemButtons = ({data, handleEdit, handleDelete}) => {
    return (
        <ButtonGroup>
            <Button
                onClick={() => handleEdit(data)}
            >
                Edit
            </Button>

            <Button
                color="secondary"
                onClick={() => handleDelete(data.id)}
            >
                Delete
            </Button>
        </ButtonGroup>
    )
}