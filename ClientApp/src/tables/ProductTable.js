import React from 'react'

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

export default function ProductTable(props) {
  const classes = makeStyles();

  const handleDeleteProduct = idProduct => {
    // не забываем спросить пользователя,
    // действительно ли он хочет удалить запись
    let answer = window.confirm('Are you sure?')

    if (answer) {
      props.deleteProduct(idProduct)
    }

  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow className={classes.TableRow_}>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="right">Цена, руб</StyledTableCell>
            <StyledTableCell align="right">Название</StyledTableCell>
            <StyledTableCell align="right">Срок годности, ч</StyledTableCell>
            <StyledTableCell align="right">ID категории</StyledTableCell>
            {(props.role == "admin" || props.role == "user" )&&
              <StyledTableCell align="right"></StyledTableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.length > 0 ? (
            props.products.map(product => (
              <StyledTableRow key={product.idProduct}>
                <StyledTableCell component="th" scope="row">
                  {product.idProduct}
                </StyledTableCell>
                <StyledTableCell align="right">{product.nowCost}</StyledTableCell>
                <StyledTableCell align="right">{product.title}</StyledTableCell>
                <StyledTableCell align="right">{product.scorGodnostiO}</StyledTableCell>
                <StyledTableCell align="right">{product.idCategoryFk}</StyledTableCell>
                {props.role == "admin" &&
                  <StyledTableCell align="right">
                    <Button variant="contained" onClick={() => { props.editRow(product) }}>Редактировать</Button>
                    <Button variant="contained" onClick={() => handleDeleteProduct(product.idProduct)}>Удалить</Button>
                  </StyledTableCell>
                }
                {props.role == "user" &&
                  <StyledTableCell align="right">
                    <Button variant="contained" onClick={props.basketTo}>Добавить в корзину</Button>
                  </StyledTableCell>
                }
              </StyledTableRow>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No products</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </TableContainer>)
}
