import React, { useState } from 'react'
import '../Style.css'
import makeStyles from "../Style"
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { Select, MenuItem } from '@material-ui/core';

export default function AddProductForm(props) {
  const classes = makeStyles();

  const initialFormState = { idProduct: null, nowCost: '', title: '', scorGodnostiO: '', nameCategory: null }
  // используем useState и передаем в качестве начального значения объект - initialFormState
  const [product, setProduct] = useState(initialFormState)
  /*const [categories, setCategories] = useState([
    {
      idCategory: 1,
      name: 'category 1'
    },
    {
      idCategory: 2,
      name: 'category 2'
    },
  ])*/

  const handleInputChange = event => {
    const { name, value } = event.currentTarget
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    product.idCategoryFk = idCategory;
    product.nameCategory = (props.categories.find(e => e.idCategory === idCategory)).name;


    //можно будет вывести сообщение о том, что нужно заполнить все поля
    if (!product.nowCost || !product.title || !product.scorGodnostiO || !product.idCategoryFk) {
      alert('Не все поля заполнены => продукт не был добавлен');
      return
    }

    setIdCategory(-1); //обнулить шапку комбобокса

    // вызываем addProduct из хука из App
    props.addProduct(product)
    // обнуляем форму, с помощью setProduct функции
    // которая у нас взята из хука в данном компоненте [1]
    setProduct(initialFormState)
  }

  //тут если выбираем категорию, то меняем ее id ()
  const [idCategory, setIdCategory] = useState("");

  const handleChangeCategory = (event) => {
    setIdCategory(Number(event.target.value));
  };


  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div class="each">
          <label>Цена, руб</label>
          <Input type="text" name="nowCost" value={product.nowCost} onChange={handleInputChange} />

          <label>Название</label>
          <Input type="text" name="title" value={product.title} onChange={handleInputChange} />

          <label>Срок годности, ч</label>
          <Input type="text" name="scorGodnostiO" value={product.scorGodnostiO} onChange={handleInputChange} />

          <label>Категория</label>
          {/* <Input type="text" name="idCategoryFk" value={product.idCategoryFk} onChange={handleInputChange} /> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={idCategory}
            onChange={handleChangeCategory}
            //className={classes.input} //как тут желтенкую сделать)))
          >
            {props.categories.map((i) => <MenuItem value={i.idCategory}>{i.name}</MenuItem>)}
          </Select>
        </div>
        <br />
        <Button variant="contained" type="submit">Добавить новый продукт</Button>
      </form>
      <br />
      <br />
    </div>
  )
}
