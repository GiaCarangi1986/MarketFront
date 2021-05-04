import React, { useState, useEffect } from 'react'
import AddProductForm from './forms/AddProductForm'
import EditProductForm from './forms/EditProductForm'
import ProductTable from './tables/ProductTable'
import Authorization from './authorization/Authorization'
import OrderLineData from './Data/OrderLineData'
import { addOrderLine } from './requests/OrderLineRequests' //тут из табл буду вызывать добавить в корзину для конкретного продукта
import { checkOrderLine } from './requests/OrderLineRequests'

import DoneAllIcon from '@material-ui/icons/DoneAll';

export default function App() {
  const url = "https://localhost:44332/api/products/";

  // добавили данные
  const productsData = [
    //{ idProduct: 1, nowCost: '40', title: 'морковка', scorGodnostiO: '10', idCategoryFk: '1' },
    //{ idProduct: 3, nowCost: '50', title: 'огурчик', scorGodnostiO: '15', idCategoryFk: '1' },
  ]

  //id пользователя, для корзины потом
  const[userId, setUserId] = useState([])

  const [products, setProducts] = useState(productsData)

  // флаг editing - изначально false, функция установки флага
  const [editing, setEditing] = useState(false)
  // начальное значение для формы редактирования
  // так как мы не знаем, кто редактируется - пустые поля
  const initialFormState = { idProduct: null, nowCost: '', title: '', scorGodnostiO: '', idCategoryFk: '', NameCategory: '' }
  // значение "текущий пользователь на редактировании" + функция установки этого значения
  const [currentProduct, setCurrentProduct] = useState(initialFormState)

  //корзина (будет строка заказа и сам заказ - у каждого клиента есть своя 1 корзина)
  const [basket, setBasket] = useState(false)

  //список категорий, который оправим в add и edit
  const [categories, setCategories] = useState([])

  //в products загружаем все продукты из бд (get запрос) и категории
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data));
    
      fetch("https://localhost:44332/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  //данные статуса (201 - админ, 401 - все другие)
  //"admin" (все доступно), "user"(смотреть записи), ""(регистрироваться или войти)
  //const [authorisation, setAuthorisation] = useState([])

  const [role, setRole] = useState([])

  // функция добавления продукта
  const addProduct = product => {
    //в бд добавляю
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        NowCost: product.nowCost,
        Title: product.title,
        ScorGodnostiO: product.scorGodnostiO,
        IdCategoryFk: product.idCategoryFk,
        NameCategory: product.nameCategory
      }),
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    }).then(function (data) {
      //data.json().then((dataJson) => console.log(dataJson))
      data.json()
        .then((dataJson) => setProducts([...products, dataJson]))
    });

    // создаем id значением на 1 больше (автоинкремент)
    //product.idProduct = products.length + 1
    // вызываем setProducts определенную выше в хуке useState
    // передаем туда все, что было в products + новый элемент product
    //setProducts([...products, product])
  }

  // удаление продукта
  // в очередной раз вызываем setProducts [1]
  // и передаем в setProducts массив без элемента, который нужно удалить
  const deleteProduct = id => {
    //в бд
    fetch(url + id, {
      method: "DELETE",
      credentials: 'include'
    });

    setEditing(false) //очищаем форму, если редактировали этот продукт в момент удаления
    setProducts(products.filter(product => product.idProduct !== id))
  }

  // обновление продукта
  const updateProduct = (id, updatedProduct) => {
    //в бд
    fetch(url + id, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    });

    // когда мы готовы обновить пользователя, ставим флажок editing в false
    setEditing(false)
    // и обновляем пользователя, если нашли его по id
    setProducts(products.map(product => (product.idProduct === id ? updatedProduct : product)))
  }

  // редактирование продукта
  const editRow = product => {
    // готовы редактировать - флажок в true
    setEditing(true)
    // устанавливаем значения полей для формы редактирования
    // на основании выбранного "юзера"
    setCurrentProduct({ idProduct: product.idProduct, nowCost: product.nowCost, title: product.title, scorGodnostiO: product.scorGodnostiO, idCategoryFk: product.idCategoryFk })
  }

  // добавление продукта в корзину
  const basketTo = async (product) => {
    //(не, тут надо модальное окно чтобы вылезло - либо добавлен в корзину
    //либо уже добавлен, так и так надо посылать запрос о добавлении продукта в таблицу СТРОКА ЗАКАЗА)

    //проверка того, есть ли этот продукт уже в строке заказа
    var result = await checkOrderLine(product.idProduct, userId);
    if (result == 1) //1 - такая строка уже есть; 2 - строки не было, дабавим
      alert('Продукт уже в корзине');
    else {
      alert('Продукт добавлен в корзину');
      addOrderLine(product, userId);
    }
  }
  //жмем по корзине
  const ClickBasketTo = () => {
    setBasket(!basket);
  };
  return (
    <div className="container">
      {console.log(products)}
      <Authorization setRole={setRole} ClickBasketTo={ClickBasketTo} role={role} setBasket={setBasket} setUserId={setUserId}/>
      <br />
      {!basket &&
        <div>
          {role == "admin" &&
            <h1><DoneAllIcon /> CRUD операции с продуктами</h1>
          }
          <div className="flex-row">

            {role == "admin" &&
              <div className="flex-large">
                {/* редактируем ? рисуй форму редактирования, иначе - форму добавления */}
                {editing ? (
                  <div>
                    <h2>Изменить продукт</h2>
                    <EditProductForm
                      editing={editing}
                      setEditing={setEditing}
                      currentProduct={currentProduct}
                      updateProduct={updateProduct}
                      categories={categories}
                    />
                  </div>
                ) : (
                  <div>
                    <h2>Добавить продукт</h2>
                    {/* добавили форму */}
                    <AddProductForm addProduct={addProduct} categories={categories}/>
                  </div>
                )}
              </div>
            }

            {(role == "admin" || role == "user") &&
              <div className="flex-large">
                <h2>Список продуктов</h2>
                {/* добавили таблицу */}
                <ProductTable products={products} editRow={editRow} deleteProduct={deleteProduct} role={role} basketTo={basketTo} />
              </div>
            }
          </div>
        </div>
      }
      {basket &&
        <OrderLineData userId={userId} setUserId={setUserId}/>
      }
    </div>
  )
}

