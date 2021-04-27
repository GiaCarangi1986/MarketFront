import React from 'react'
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import makeStyles from "../Style"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function orderLineTable(props) {
  const {
      setOrderLines,
      orderLines,
      updateCountProduct,
  } = props;

  const classes = makeStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow className={classes.TableRow_}>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="right">Кол-во продуктов, шт</StyledTableCell>
            <StyledTableCell align="right">Цена, руб</StyledTableCell>
            <StyledTableCell align="right">Название продукта</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderLines.length > 0 ? (
            orderLines.map(orderLine => (
              <StyledTableRow key={orderLine.idorderLine}>
                <StyledTableCell component="th" scope="row">
                  {orderLine.idOrderLine}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    id="outlined-number"
                    defaultValue={orderLine.muchOfProducts}
                    onChange={(e) => updateCountProduct(orderLine.idOrderLine, Number(e.target.value))}
                    type="number"
                    name={"muchOfProducts"}
                    InputProps={{
                      inputProps: {
                        max: orderLine.countMax, min: 1
                      }
                    }}
                    InputLabelProps={{
                      shrink: false,
                    }}
                    variant="outlined"
                  />

                </StyledTableCell>
                <StyledTableCell align="right">{orderLine.costForBuyer}</StyledTableCell>
                <StyledTableCell align="right">{orderLine.nameProduct}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="contained" onClick={() => { props.deleteOrderLine(orderLine.idOrderLine) }}>Удалить</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No orderLines</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </TableContainer>)
}
