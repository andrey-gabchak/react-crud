import React, {Fragment} from 'react';
import IconButton from '@material-ui/core/IconButton';
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
    dateFrom: {
        marginRight: '30px'
    }
}))

export const FilterDialog = ({
                          handleSubmit,
                          handleInputChange,
                          filter
                      }) => {
    const [isOpen, setOpen] = React.useState(false);
    let {dateFrom, dateTo} = filter

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
                            id="dateFrom"
                            label="date from"
                            type="date"
                            value={dateFrom}
                            onChange={(event) => handleInputChange(event)}
                            autoFocus
                        />
                        <TextField
                            id="dateTo"
                            type="date"
                            label="date to"
                            value={dateTo}
                            onChange={(event) => handleInputChange(event)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={() => handleSubmit(filter)}
                    >
                        Apply
                    </Button>
                    <Button
                        onClick={toggleDialog}
                        color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}