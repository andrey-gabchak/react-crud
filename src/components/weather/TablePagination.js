import React from "react";
import TablePagination from '@material-ui/core/TablePagination';

export const WeatherTablePagination = ({pagination, changePage, changeRowsPerPage}) => {
    const {
        totalItems,
        itemsPerPage,
        page
    } = pagination
    return (
        <TablePagination
            className="weatherTablePagination"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalItems}
            rowsPerPage={itemsPerPage}
            page={page}
            backIconButtonProps={{
                'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page',
            }}
            next
            onChangePage={changePage}
            onChangeRowsPerPage={changeRowsPerPage}
            style={{ marginRight: "60px"}}
        />
    )
}