import React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import colors from "../../styles/colors";


function TablePaginationActions(props) {

    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = e => onPageChange(e, 0);
    const handleBackButtonClick = e => onPageChange(e, page - 1);
    const handleNextButtonClick = e => onPageChange(e, page + 1);
    const handleLastPageButtonClick = e => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
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
const CustomTable = styled(Table)`
  min-width: 1200px;
  
  thead th {
    text-align: center;
    background: ${colors.ultraLightGray};
  }
  
  td {
    text-align: center;
  }
  
  .css-hbtnrh-MuiTableCell-root {
    max-width: 50px;
  }
  
  .css-1ex1afd-MuiTableCell-root:nth-child(2),
  .css-1ex1afd-MuiTableCell-root:nth-child(3),
  .css-1ex1afd-MuiTableCell-root:nth-child(4) {
    min-width: 300px !important;
    white-space: pre;
  }

  .css-1ex1afd-MuiTableCell-root:nth-child(5),
  .css-1ex1afd-MuiTableCell-root:nth-child(6),
  .css-1ex1afd-MuiTableCell-root:nth-child(7),
  .css-1ex1afd-MuiTableCell-root:nth-child(8),
  .css-1ex1afd-MuiTableCell-root:nth-child(9),
  .css-1ex1afd-MuiTableCell-root:nth-child(10),
  .css-1ex1afd-MuiTableCell-root:nth-child(11),
  .css-1ex1afd-MuiTableCell-root:nth-child(12) {
    min-width: 100px;
  }
`;
const CustomTableCell = styled(TableCell)`
  width: ${({ width }) => width}%;
  background: ${colors.ultraLightGray};
`;

export default function MaterialTable({ tableLists }) {



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableLists.length) : 0;
    const handleChangePage = (e, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <CustomTable>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox />
                        </TableCell>
                        <TableCell>캠페인</TableCell>
                        <TableCell>광고그룹</TableCell>
                        <TableCell>키워드</TableCell>
                        <TableCell>디바이스</TableCell>
                        <TableCell>최소입찰가</TableCell>
                        <TableCell>최대입찰가</TableCell>
                        <TableCell>목표순위</TableCell>
                        <TableCell>현재입찰가</TableCell>
                        <TableCell>현재순위</TableCell>
                        <TableCell>자동입찰활성화</TableCell>
                        <TableCell>입찰주기</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? tableLists && tableLists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : tableLists
                    ).map((row) => (
                        <TableRow key={row.nccKeywordId}>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell>
                                {row.Campaign_name}
                            </TableCell>
                            <TableCell>
                                {row.Adgroup_name}
                            </TableCell>
                            <TableCell>
                                {row.Keyword}
                            </TableCell>
                            <TableCell>
                                {row.device}
                            </TableCell>
                            <TableCell>
                                {!!row.min_bid ? row.min_bid : '-' }
                            </TableCell>
                            <TableCell>
                                {!!row.max_bid ? row.max_bid : '-' }
                            </TableCell>
                            <TableCell>
                                {row.target_Rank}
                            </TableCell>
                            <TableCell>
                                {row.current_bid} 원
                            </TableCell>
                            <TableCell>
                                {row.current_rank}
                            </TableCell>
                            <TableCell>
                                {!!row.activate ? '활성화' : '비활성화'}
                            </TableCell>
                            <TableCell>
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
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 30, {label: 'All', value: -1}]}
                            colSpan={11}
                            count={tableLists.length}
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
                    </TableRow>
                </TableFooter>
            </CustomTable>
        </TableContainer>
    )
}