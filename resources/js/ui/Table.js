import React from 'react';
import PropTypes from 'prop-types';

import {
    withStyles,
    Paper,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Tooltip,
} from '@material-ui/core';

import { TableToolbar } from './TableToolbar/TableToolbar';
import { TablePaginationActions } from './TablePaginationActions';

const Table = props => {
    const {
        classes,
        title,
        columns,
        data,
        total,
        sortType,
        sortBy,
        headerCellClicked,
        page,
        perPage,
        onChangePage,
        onChangePerPage,
        onFilter,
    } = props;

    return (
        <Paper className={classes.root}>
            <TableToolbar title={title} columns={columns} onFilter={onFilter} />

            <div className={classes.tableWrapper}>
                <MuiTable className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, key) => (
                                <TableCell
                                    key={key}
                                    onClick={() =>
                                        column.sort &&
                                        headerCellClicked(column.property)
                                    }
                                >
                                    {!column.sort ? (
                                        column.name
                                    ) : (
                                        <Tooltip
                                            title="Sort"
                                            placement={
                                                column.numeric
                                                    ? 'bottom-end'
                                                    : 'bottom-start'
                                            }
                                            enterDelay={300}
                                        >
                                            <TableSortLabel
                                                active={
                                                    sortBy === column.property
                                                }
                                                direction={sortType}
                                            >
                                                {column.name}
                                            </TableSortLabel>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((item, key) => (
                            <TableRow key={key}>
                                {Object.values(item).map((cell, cellKey) => {
                                    if (cellKey === 0) {
                                        return (
                                            <TableCell
                                                key={cellKey}
                                                component="th"
                                                scope="row"
                                            >
                                                {cell}
                                            </TableCell>
                                        );
                                    }

                                    return (
                                        <TableCell key={cellKey}>
                                            {cell}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}

                        {data.length > 0 && (
                            <TableRow
                                style={{
                                    height: 32 * (perPage - data.length),
                                }}
                            >
                                <TableCell colSpan={columns.length} />
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={['5', '10', '20']}
                                colSpan={columns.length}
                                count={total}
                                page={page - 1}
                                rowsPerPage={perPage}
                                onChangePage={(event, page) => {
                                    onChangePage(page);
                                }}
                                onChangeRowsPerPage={event =>
                                    onChangePerPage(event.target.value, 1)
                                }
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </MuiTable>
            </div>
        </Paper>
    );
};

Table.propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    sortType: PropTypes.oneOf(['asc', 'desc']),
    sortBy: PropTypes.string,
    headerCellClicked: PropTypes.func,
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangePerPage: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
};

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        minHeight: '75vh',
    },

    table: {
        minWidth: 500,
    },

    tableWrapper: {
        overflowX: 'auto',
    },
});

const Styled = withStyles(styles)(Table);

export { Styled as Table };
