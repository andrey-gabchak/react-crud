import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import {FilterDialog} from "./DatesFilterDialog";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    title: {
        flex: 1
    }
}))

export const TableToolbar = ({
                          handleSubmit,
                          handleInputChange,
                          filter
                      }) => {
    return (
        <Toolbar>
            <Typography
                variant="h6"
                id="tableTitle"
                component="div"
                className={useStyles().title}
            >
                Weather data
            </Typography>
            <Tooltip title="Filter list">
                <FilterDialog
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    filter={filter}
                />
            </Tooltip>
        </Toolbar>
    )
}