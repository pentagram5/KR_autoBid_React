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
  td {
    padding: 6px 0;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  width: calc(100vw - 300px);
  max-width: 1920px;
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
const ButtonGroup = styled.div`
  text-align: center;
  margin: 100px 0 200px;
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
                                    handleAdvertiserRegister,
                                    searchTerm,
                                    handleSearchAdvertiser,

                                    confirmOpen,
                                    handleConfirmClose,
                                    customerName,
                                    onConfirmChange,
                                    onConfirmCancel,
                                }) => {

    return (
        <>
            <Wrapper>
                <Header
                    title={title}
                    handleCustomerChange={handleCustomerChange}
                    customer={customer}
                    customerList={customerList}

                    confirmOpen={confirmOpen}
                    handleConfirmClose={handleConfirmClose}
                    customerName={customerName}
                    onConfirmChange={onConfirmChange}
                    onConfirmCancel={onConfirmCancel}
                />
                <AdvertiserSearch>
                    <Text fontWeight={700}>????????? ????????? ID</Text>
                    <InputBox>
                        <Input
                            value={searchTerm}
                            onChange={handleSearchAdvertiser}
                            placeholder="????????? ????????? ID??? ???????????????."
                        />
                    </InputBox>

                </AdvertiserSearch>

                <TableContainer component={Paper}>
                    <CustomTable>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onChange={handleAllChecked}
                                        checked={customerDataList.length > 0 && (rowsPerPage > 0 ? (checked.length === rowsPerPage || checked.length === customerDataList.length) : checked.length === customerDataList.length)}
                                    />
                                </TableCell>
                                <TableCell>
                                    ????????? ????????? ID
                                </TableCell>
                                <TableCell>
                                    ????????? ?????? ??????
                                </TableCell>
                                <TableCell>
                                    ?????? ????????? ??????
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
                                            {row.Autobid_ac === 1 ? <Text>??????</Text> : <Text fontColor={colors.yellow}>?????????</Text>}
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

                <ButtonGroup>
                    <StyledButton
                        title="??? ??? ???"
                        width={200}
                        height={65}
                        border={`1px solid  ${colors.blue}`}
                        bgColor={colors.white}
                        fontColor={colors.blue}
                        borderRadius={1}
                        margin="0 12px 0 0"
                        onClick={() => handleAdvertiserRegister(0)}
                    />
                    <StyledButton
                        title="??? ???"
                        width={200}
                        height={65}
                        bgColor={colors.blue}
                        fontColor={colors.white}
                        borderRadius={1}
                        onClick={() => handleAdvertiserRegister(1)}
                    />
                </ButtonGroup>
            </Wrapper>
        </>
    )
}

export default React.memo(AddAdvertiserPresenter);