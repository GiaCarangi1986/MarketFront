import React, { useState } from 'react'
import '../Style.css'

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

export default function AddProductForm(props) {
  const initialFormState = { idProduct: null, nowCost: '', title: '', scorGodnostiO: '', idCategoryFk: '' }
  // используем useState и передаем в качестве начального значения объект - initialFormState
  const [product, setProduct] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.currentTarget
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    //можно будет вывести сообщение о том, что нужно заполнить все поля
    if (!product.nowCost || !product.title || !product.scorGodnostiO || !product.idCategoryFk) return

    // вызываем addProduct из хука из App
    props.addProduct(product)
    // обнуляем форму, с помощью setProduct функции
    // которая у нас взята из хука в данном компоненте [1]
    setProduct(initialFormState)
  }

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

          <label>ID категории</label>
          <Input type="text" name="idCategoryFk" value={product.idCategoryFk} onChange={handleInputChange} />
        </div>
        <br />
        <Button variant="contained" type="submit">Добавить новый продукт</Button>
      </form>
      <br />
      <br />
    </div>
  )
}
