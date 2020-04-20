import React, {Fragment} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    title: {
        flex: 1
    },
    dateFrom: {
        marginRight: '30px'
    }
}));

export const TableToolbar = ({
                                 handleSubmit,
                                 handleInputChange,
                                 dateFrom,
                                 dateTo
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
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                />
            </Tooltip>
        </Toolbar>
    )
}

function FilterDialog({
                          handleSubmit,
                          handleInputChange,
                          dateFrom,
                          dateTo
                      }) {
    const [isOpen, setOpen] = React.useState(false);

    const toggleDialog = () => {
        setOpen( !isOpen)
    };

    const classes = useStyles();
    return (
        <Fragment>
            <IconButton
                aria-label="filter list"
                onClick={toggleDialog}
            >
                <FilterListIcon/>
            </IconButton>
            <Dialog
                open={isOpen}
                onClose={toggleDialog}
                aria-labelledby="date-filter-dialog"
            >
                <DialogTitle id="weather-dialog">
                    Date filter
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            className={classes.dateFrom}
                            id="date-from"
                            label="date from"
                            type="date"
                            value={dateFrom}
                            onChange={handleInputChange}
                            autoFocus
                        />
                        <TextField
                            id="date-to"
                            type="date"
                            label="date to"
                            value={dateTo}
                            onChange={handleInputChange}
                        />
                    </form>
                </DialogContent>
                <DialogActionButtons
                    handleSubmit={handleSubmit}
                    handleToggle={toggleDialog}
                />
            </Dialog>
        </Fragment>
    )
}

const DialogActionButtons = ({ handleSubmit, handleToggle }) => {
    return (
        <DialogActions>
            <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={handleSubmit}
            >
                Apply
            </Button>
            <Button
                onClick={handleToggle}
                color="secondary">
                Close
            </Button>
        </DialogActions>
    )
}