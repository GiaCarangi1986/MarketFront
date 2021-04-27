import React, { useState, useEffect } from 'react'
import OrderLine from '../tables/OrderLineTable'


export default function App() {
  const url = "https://localhost:44332/api/orderLines/";

  const [orderLines, setOrderLines] = useState([])

  //в orderLines загружаем все строки заказа для этого пользователя из бд (get запрос)
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setOrderLines(data));
  }, []);

  // удаление строки заказа
  // в очередной раз вызываем setOrderLines
  // и передаем в setOrderLines массив без элемента, который нужно удалить
  const deleteOrderLine = id => {
    //в бд
    fetch(url + id, {
      method: "DELETE",
      credentials: 'include'
    });

    setOrderLines(orderLines.filter(orderLine => orderLine.idOrderLine !== id))
  }

  const updateCountProduct = (id, count) => {
    const updatedProducts = [...orderLines];
    const idxUpdatedProduct = updatedProducts.indexOf(i => i.idorderLine === id);
    if (idxUpdatedProduct !== -1) {
      updatedProducts[idxUpdatedProduct].muchOfProducts = count;
    }
    setOrderLines(updatedProducts);
    // updated array
  }

  return (
    <div className="container">
        <div>
          <div className="flex-row">
              <div className="flex-large">
                <h2>Список заказанных продуктов</h2>
                <OrderLine orderLines={orderLines} updateCountProduct={updateCountProduct} deleteOrderLine={deleteOrderLine} setOrderLines={setOrderLines}/>
              </div>
          </div>
        </div>
    </div>
  )
}

