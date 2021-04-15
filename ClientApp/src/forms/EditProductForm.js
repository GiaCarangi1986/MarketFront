import React, { useState, useEffect } from 'react'
import '../Style.css'

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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
        //можно будет вывести сообщение о том, что нужно заполнить все поля
        if (!product.nowCost || !product.title || !product.scorGodnostiO || !product.idCategoryFk) return

        // вызываем updateProduct
        props.updateProduct(product.idProduct, product)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Цена</label>
            <Input type="text" name="nowCost" value={product.nowCost} onChange={handleInputChange} />

            <label>Название</label>
            <Input type="text" name="title" value={product.title} onChange={handleInputChange} />

            <label>Срок годности</label>
            <Input type="text" name="scorGodnostiO" value={product.scorGodnostiO} onChange={handleInputChange} />

            <label>ID категории</label>
            <Input type="text" name="idCategoryFk" value={product.idCategoryFk} onChange={handleInputChange} />
            <br />
            <br />
            <Button variant="contained" type="submit">Изменить</Button>

            <Button variant="contained"
                /* обновляем флаг editing, будет представлен в App позже */
                onClick={() => props.setEditing(false)}
            >
                Отмена
      </Button>
            <br />
            <br />
            <br />
        </form>
    )
}