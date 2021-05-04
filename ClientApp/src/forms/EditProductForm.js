import React, { useState, useEffect } from 'react'
import '../Style.css'

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Select, MenuItem } from '@material-ui/core';

export default function EditProductForm(props) {
    // в качестве начального аргумента передаем
    // пользователя, которого собираемся редактировать
    const [product, setProduct] = useState(props.currentProduct)

    // используем effect-hook
    useEffect(
        () => {
            // вызывай данную функцию
            setProduct(props.currentProduct)
        },
        [props] // всегда, если изменились props
    )

    const handleInputChange = event => {
        const { name, value } = event.target

        setProduct({ ...product, [name]: value }) //свойства продукта остаются прежними, а измененный параметр меняем
    }

    const handleSubmit = event => {
        event.preventDefault()
        product.idCategoryFk = idCategory;
        product.nameCategory = (props.categories.find(e => e.idCategory === idCategory)).name;

        //можно будет вывести сообщение о том, что нужно заполнить все поля
        if (!product.nowCost || !product.title || !product.scorGodnostiO || !product.idCategoryFk) {
            alert('Не все поля заполнены => продукт не был обнавлен');
            return
        }
        setIdCategory(-1); //обнулить шапку комбобокса

        // вызываем updateProduct
        props.updateProduct(product.idProduct, product)
    }

      //тут если выбираем категорию, то меняем ее id ()
  const [idCategory, setIdCategory] = useState(product.idCategoryFk);

  const handleChangeCategory = (event) => {
    setIdCategory(Number(event.target.value));
  };

    return (
        <div>
        <form onSubmit={handleSubmit} class="each">

            <label>Цена, руб</label>
            <Input type="number" name="nowCost" value={product.nowCost} onChange={handleInputChange} min='1'/>

            <label>Название</label>
            <Input type="text" name="title" value={product.title} onChange={handleInputChange} />

            <label>Срок годности, ч</label>
            <Input type="number" name="scorGodnostiO" value={product.scorGodnostiO} onChange={handleInputChange} min='1'/>

            <label>Категория</label>
            {/*<Input type="text" name="idCategoryFk" value={product.idCategoryFk} onChange={handleInputChange} />*/}
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={idCategory}
            onChange={handleChangeCategory}
            //className={classes.input} //как тут желтенкую сделать)))
          >
            {props.categories.map((i) => <MenuItem value={i.idCategory}>{i.name}</MenuItem>)}
          </Select>

            <br />
            <br />
            <Button variant="contained" type="submit">Изменить</Button>

            <Button variant="contained"
                /* обновляем флаг editing, будет представлен в App позже */
                onClick={() => props.setEditing(false)}
            >
            Отмена
      </Button>
            
            
        </form >
        <br />
            <br />
        </div>
    )
}