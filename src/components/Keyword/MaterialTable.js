import React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

function TablePaginationActions(props) {
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = e => onPageChange(e, 0);
    const handleBackButtonClick = e => onPageChange(e, page - 1);
    const handleNextButtonClick = e => onPageChange(e, page + 1);
    const handleLastPageButtonClick = e => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

    return (
        <Box>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                &laquo;
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                &lsaquo;
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                &rsaquo;
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                &raquo;
            </IconButton>
        </Box>
    );
}

function createData(name, calories, fat) {
    return {name, calories, fat};
}

const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const PagingBox = styled.div`

`;

export default function MaterialTable({ tableLists }) {



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (e, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 500}}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                        <TableCell component="th" scope="row">캠페인</TableCell>
                        <TableCell component="th" scope="row">광고그룹</TableCell>
                        <TableCell component="th" scope="row">키워드</TableCell>
                        <TableCell component="th" scope="row">디바이스</TableCell>
                        <TableCell component="th" scope="row">최소입찰가</TableCell>
                        <TableCell component="th" scope="row">최대입찰가</TableCell>
                        <TableCell component="th" scope="row">목표순위</TableCell>
                        <TableCell component="th" scope="row">현재입찰가</TableCell>
                        <TableCell component="th" scope="row">현재순위</TableCell>
                        <TableCell component="th" scope="row">자동입찰활성화</TableCell>
                        <TableCell component="th" scope="row">입찰주기</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? tableLists && tableLists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : tableLists
                    ).map((row) => (
                        <TableRow key={row.nccKeywordId}>
                            <TableCell style={{width: 10}} align="left">
                                <Checkbox />
                            </TableCell>
                            <TableCell style={{width: 10}} align="center">
                                {row.Campaign_name}
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {row.Adgroup_name}
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {row.Keyword}
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {row.device}
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {!!row.min_bid ? row.min_bid : '-' }
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {!!row.max_bid ? row.max_bid : '-' }
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {row.target_Rank}
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {row.current_bid} 원
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {row.current_rank}
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {!!row.activate ? '활성화' : '비활성화'}
                            </TableCell>
                            <TableCell style={{width: 50}} align="center">
                                {row.bid_cycle} 분
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>

                <PagingBox>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30, {label: 'All', value: -1}]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </PagingBox>
            </Table>
        </TableContainer>
    )
}