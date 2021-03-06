import React from 'react';
import styled, {css} from "styled-components";
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
  padding: 58px 0;
  position: relative;
  overflow-x: scroll;

  // Paper Component
  .css-11xur9t-MuiPaper-root-MuiTableContainer-root {
    width: 100%;
    height: 552px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    .css-11xur9t-MuiPaper-root-MuiTableContainer-root::-webkit-scrollbar {
      display: none;
    }
  }

  // 테이블 헤더 span 
  .css-1qgma8u-MuiButtonBase-root-MuiTableSortLabel-root {
    position: relative;
    left: 12px;
  }

  table {
    width: 2000px !important;
  }
  
  thead {
    width: 2000px !important;
    position: absolute;
    top: 0;
    background: ${colors.ultraLightGray};
  }
  
  th {
    padding: 10px 0;
  }

  th,
  td {
    text-align: center;
  }

  td {
    padding: 6px 0;
  }

  thead th:nth-child(1),
  tbody td:nth-child(1),
  thead th:nth-child(2),
  tbody td:nth-child(2) {
    width: 60px !important;
    padding: 6px 4px;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 120px !important;
  }

  th:nth-child(4),
  td:nth-child(4),
  th:nth-child(5),
  td:nth-child(5) {
    width: 280px !important;
    white-space: pre;
  }

  th:nth-child(6),
  td:nth-child(6) {
    width: 200px !important;
  }

  th:nth-child(7),
  td:nth-child(7),
  th:nth-child(10),
  td:nth-child(10),
  th:nth-child(12),
  td:nth-child(12),
  th:nth-child(14),
  td:nth-child(14) {
    width: 110px !important;
  }

  th:nth-child(8),
  td:nth-child(8),
  th:nth-child(9),
  td:nth-child(9) {
    width: 150px !important;
  }

  th:nth-child(11),
  td:nth-child(11) {
    width: 130px !important;
  }

  th:nth-child(13),
  td:nth-child(13) {
    width: 130px !important;
  }

  tfoot td {
    border-bottom: none;
    & > div {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none;
    }
  }
`;

const MaterialTable = ({
                           tableLists = [],
                           checked,
                           isChecked,
                           handleChecked,
                           handleAllChecked,

                           orderBy,
                           order,
                           handleRequestSort,
                           getComparator,

                           page = 0,
                           rowsPerPage = 10,
                           handleChangePage,
                           handleChangeRowsPerPage,
                       }) => {
    // 남는 column row 채우기
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableLists.length) : 0;
    // 정렬 handler
    const createSortHandler = property => e => handleRequestSort(e, property);

    return (
        <TableWrapper>
            <TableContainer component={Paper} style={{ width: 2000 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    onChange={handleAllChecked}
                                    checked={tableLists.length > 0 && checked.length === tableLists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length}
                                />
                            </TableCell>
                            <TableCell
                                padding="checkbox"
                                size="small"
                            >
                                순서
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
                                    고유번호
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
                            ).map((row, index) => {
                                const isListChecked = isChecked(row.nccKeywordId);

                                return (
                                    <TableRow key={row.nccKeywordId}>
                                        <TableCell padding="checkbox" onClick={e => handleChecked(e, row.nccKeywordId)}>
                                            <Checkbox
                                                checked={isListChecked}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row.idx}
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

                                        <TableCell>
                                            {(row.current_rank !== 55 && row.current_rank !== 60 && row.current_rank !== 65 && row.current_rank !== 66 && row.current_rank !== 70 && row.current_rank !== 77 && row.current_rank !== 100) && row.current_rank}
                                            {row.current_rank === 55 && '순위밖'}
                                            {row.current_rank === 60 && '광고그룹정지'}
                                            {row.current_rank === 65 && '노출없음'}
                                            {row.current_rank === 66 && '실행전'}
                                            {row.current_rank === 70 && '비활성화'}
                                            {row.current_rank === 77 && '스케줄밖'}
                                            {row.current_rank === 100 && '기능 정지'}
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
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TableWrapper>
    )
}

export default React.memo(MaterialTable);