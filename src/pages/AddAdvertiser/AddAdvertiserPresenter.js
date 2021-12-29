import React from 'react';
import styled from "styled-components";
import Header from "../../components/share/Header";
import colors from "../../styles/colors";
import StyledButton from "../../components/share/StyledButton";
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
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

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

  .css-hbtnrh-MuiTableCell-root {
    max-width: 40px;
  }

  .css-1ex1afd-MuiTableCell-root:nth-child(2),
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
  .css-1ex1afd-MuiTableCell-root:nth-child(12) {
    width: 50px;
  }
`;

const Wrapper = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 100px);
  padding: 30px 50px;
`;
const AdvertiserSearch = styled.div`
  margin: 45px 0 20px;
  display: flex;
  align-items: center;
`;
const Text = styled.div`
  color: ${({ fontColor }) => fontColor ? fontColor : colors.lightBlack};
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : 400};
`;
const InputBox = styled.div`
  width: 450px;
  height: 50px;
  padding: 0 20px;
  border: 1px solid ${colors.lightBorderColor};
  margin: 0 16px 0 24px;
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;

  &::placeholder {
    color: ${colors.borderColor};
    font-size: 16px;
  }
`;

const AddAdvertiserPresenter = ({
                                    title,
                                    handleCustomerChange,
                                    customer,
                                    customerList,
                                    customerDataList,
                                    page,
                                    rowsPerPage,
                                    handleChangePage,
                                    handleChangeRowsPerPage,
                                    checked,
                                    isChecked,
                                    handleAllChecked,
                                    handleChecked,
                                }) => {

    return (
        <>
            <Wrapper>
                <Header
                    title={title}
                    handleCustomerChange={handleCustomerChange}
                    customer={customer}
                    customerList={customerList}
                />
                <AdvertiserSearch>
                    <Text fontWeight={700}>광고주 로그인 ID</Text>
                    <InputBox>
                        <Input
                            placeholder="광고주 로그인 ID를 입력하세요."
                        />
                    </InputBox>
                    <StyledButton
                        title="검색"
                        width={116}
                        height={50}
                        bgColor={colors.blue}
                        fontColor={colors.white}
                        borderRadius={1}
                    />
                </AdvertiserSearch>

                <TableContainer component={Paper}>
                    <CustomTable>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onChange={handleAllChecked}
                                        checked={customerList.length > 0 && (rowsPerPage > 0 ? checked.length === rowsPerPage : checked.length === customerList.length)}
                                    />
                                </TableCell>
                                <TableCell padding="checkbox">
                                    광고주 로그인 ID
                                </TableCell>
                                <TableCell padding="checkbox">
                                    광고주 등록 여부
                                </TableCell>
                                <TableCell padding="checkbox">
                                    최종 동기화 시간
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {customerDataList.length > 0 &&
                            (rowsPerPage > 0
                                ? customerDataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : customerDataList
                            ).map(row => {
                                const isListChecked = isChecked(row.CUSTOMER_ID);

                                return (
                                    <TableRow key={row.CUSTOMER_ID}>
                                        <TableCell padding="checkbox" onClick={e => handleChecked(e, row.CUSTOMER_ID)}>
                                            <Checkbox
                                                checked={isListChecked}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row.show_login}
                                        </TableCell>
                                        <TableCell>
                                            {row.Autobid_ac === 1 ? <Text>등록</Text> : <Text fontColor={colors.yellow}>미등록</Text>}
                                        </TableCell>
                                        <TableCell>
                                            {row.editTm}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 30, {label: 'All', value: -1}]}
                                    colSpan={11}
                                    count={customerDataList.length}
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
            </Wrapper>
        </>
    )
}

export default AddAdvertiserPresenter;