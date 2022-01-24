import React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import {TableBody, TableHead, TableCell, TableFooter} from "@mui/material";
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import colors from "../../styles/colors";
import {TableSortLabel} from "@mui/material";

function TablePaginationActions(props) {
    const {count, page, rowsPerPage, onPageChange} = props;
    const handleFirstPageButtonClick = e => onPageChange(e, 0);
    const handleBackButtonClick = e => onPageChange(e, page - 1);
    const handleNextButtonClick = e => onPageChange(e, page + 1);
    const handleLastPageButtonClick = e => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
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

const TableWrapper = styled.div`
  position: relative;

  .css-11xur9t-MuiPaper-root-MuiTableContainer-root {
    height: calc(100vh - 498px);
  }
`;

const CustomTable = styled(Table)`
  thead th {
    text-align: center;
    background: ${colors.ultraLightGray};
  }

  td:first-child {
    padding-left: 4px;
  }

  td {
    padding: 6px 0;
    text-align: center;
  }
  
  tfoot td {
    height: 50px;
  }
  
  .css-hbtnrh-MuiTableCell-root {
    max-width: 40px;
  }
  
  .css-1ex1afd-MuiTableCell-root:nth-child(3),
  .css-1ex1afd-MuiTableCell-root:nth-child(4) {
    min-width: 200px !important;
    white-space: pre;
  }

  .css-1ex1afd-MuiTableCell-root:nth-child(5),
  .css-1ex1afd-MuiTableCell-root:nth-child(6),
  .css-1ex1afd-MuiTableCell-root:nth-child(7),
  .css-1ex1afd-MuiTableCell-root:nth-child(8),
  .css-1ex1afd-MuiTableCell-root:nth-child(9),
  .css-1ex1afd-MuiTableCell-root:nth-child(10),
  .css-1ex1afd-MuiTableCell-root:nth-child(11),
  .css-1ex1afd-MuiTableCell-root:nth-child(12),
  .css-1ex1afd-MuiTableCell-root:nth-child(13) {
    width: 50px;
  }

  .css-1qgma8u-MuiButtonBase-root-MuiTableSortLabel-root {
    display: flex;
    justify-content: center;
    position: relative;
    left: 12px;
  }
`;
const BottomTableBox = styled.div`
  width: 100%;
  border-top: 1px solid rgba(224, 224, 224, 1);
  background-color: ${colors.white};
  position: absolute;
  bottom: 0;
  table {
    width: 100%;
  }
`;


const MaterialTable = ({
                                          tableLists,
                                          checked,
                                          isChecked,
                                          handleChecked,
                                          handleAllChecked,

                                          orderBy,
                                          order,
                                          handleRequestSort,
                                          getComparator,

                                          page,
                                          rowsPerPage,
                                          handleChangePage,
                                          handleChangeRowsPerPage,
                                      }) => {

    // 남는 column row 채우기
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableLists.length) : 0;
    // 정렬 handler
    const createSortHandler = property => e => handleRequestSort(e, property);

    return (
        <TableWrapper>
            <TableContainer component={Paper}>
                <CustomTable>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    onChange={handleAllChecked}
                                    checked={tableLists.length > 0 && checked.length === tableLists.slice(page * rowsPerPage,  page * rowsPerPage + rowsPerPage).length}
                                />
                            </TableCell>
                            <TableCell
                                padding="checkbox"
                                size="small"
                                sortDirection={orderBy === 'num' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'num'}
                                    direction={orderBy === 'num' ? order : 'asc'}
                                    onClick={createSortHandler('num')}
                                >
                                    번호
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'Campaign_name' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'Campaign_name'}
                                    direction={orderBy === 'Campaign_name' ? order : 'asc'}
                                    onClick={createSortHandler('Campaign_name')}
                                >
                                    캠페인
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'Adgroup_name' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'Adgroup_name'}
                                    direction={orderBy === 'Adgroup_name' ? order : 'asc'}
                                    onClick={createSortHandler('Adgroup_name')}
                                >
                                    광고그룹
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'Keyword' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'Keyword'}
                                    direction={orderBy === 'Keyword' ? order : 'asc'}
                                    onClick={createSortHandler('Keyword')}
                                >
                                    키워드
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'device' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'device'}
                                    direction={orderBy === 'device' ? order : 'asc'}
                                    onClick={createSortHandler('device')}
                                >
                                    디바이스
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'min_bid' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'min_bid'}
                                    direction={orderBy === 'min_bid' ? order : 'asc'}
                                    onClick={createSortHandler('min_bid')}
                                >
                                    최소입찰가
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'max_bid' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'max_bid'}
                                    direction={orderBy === 'max_bid' ? order : 'asc'}
                                    onClick={createSortHandler('max_bid')}
                                >
                                    최대입찰가
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'target_Rank' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'target_Rank'}
                                    direction={orderBy === 'target_Rank' ? order : 'asc'}
                                    onClick={createSortHandler('target_Rank')}
                                >
                                    목표순위
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'current_bid' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'current_bid'}
                                    direction={orderBy === 'current_bid' ? order : 'asc'}
                                    onClick={createSortHandler('current_bid')}
                                >
                                    현재입찰가
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'current_rank' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'current_rank'}
                                    direction={orderBy === 'current_rank' ? order : 'asc'}
                                    onClick={createSortHandler('current_rank')}
                                >
                                    현재순위
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'activate' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'activate'}
                                    direction={orderBy === 'activate' ? order : 'asc'}
                                    onClick={createSortHandler('activate')}
                                >
                                    자동입찰활성화
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sortDirection={orderBy === 'bid_cycle' ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === 'bid_cycle'}
                                    direction={orderBy === 'bid_cycle' ? order : 'asc'}
                                    onClick={createSortHandler('bid_cycle')}
                                >
                                    입찰주기
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableLists &&
                        (rowsPerPage > 0
                                ? tableLists.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableLists
                        ).map(row => {
                            const isListChecked = isChecked(row.nccKeywordId);

                            return (
                                <TableRow key={row.nccKeywordId}>
                                    <TableCell padding="checkbox" onClick={e => handleChecked(e, row.nccKeywordId)}>
                                        <Checkbox
                                            checked={isListChecked}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {row.num}
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
                                        {!!row.min_bid ? `${parseInt(row.min_bid).toLocaleString()} 원` : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {!!row.max_bid ? `${parseInt(row.max_bid).toLocaleString()} 원` : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {row.target_Rank}
                                    </TableCell>
                                    <TableCell>
                                        {parseInt(row.current_bid).toLocaleString()} 원
                                    </TableCell>

                                    {/*  88 순위밖, 99 - */}
                                    <TableCell>
                                        {(row.current_rank !== 55 && row.current_rank !== 66 && row.current_rank !== 77) && row.current_rank}
                                        {(row.current_rank === 55 && row.current_rank !== 66 && row.current_rank !== 77) && '순위 밖'}
                                        {(row.current_rank === 66 && row.current_rank !== 55 && row.current_rank !== 77) && '실행 전'}
                                        {(row.current_rank === 77 && row.current_rank !== 55 && row.current_rank !== 66) && '스케줄 밖'}
                                    </TableCell>
                                    <TableCell>
                                        {!!row.activate ? '활성화' : '비활성화'}
                                    </TableCell>
                                    <TableCell>
                                        {row.bid_cycle} 분
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell />
                        </TableRow>
                    </TableFooter>
                </CustomTable>

                <BottomTableBox>
                    <table>
                        <tbody>
                            <tr>
                                <TablePagination
                                    // rowsPerPageOptions={[10, 20, 30, {label: 'All', value: -1}]}
                                    rowsPerPageOptions={[10, 30, 50, 100]}
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
                            </tr>
                        </tbody>
                    </table>
                </BottomTableBox>
            </TableContainer>
        </TableWrapper>
    )
}

export default React.memo(MaterialTable);