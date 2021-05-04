import React, { useState, useEffect } from 'react'
import OrderLine from '../tables/OrderLineTable'


export default function App({userId, setUserId}) {
  const url = "https://localhost:44332/api/orderLines/";

  const [orderLines, setOrderLines] = useState([])

  //в orderLines загружаем все строки заказа для этого пользователя из бд (get запрос)
  useEffect(() =>{
    fetch(url+'user/'+userId)
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
    const idxUpdatedProduct = updatedProducts.findIndex(i => i.idOrderLine == id);
    if (idxUpdatedProduct !== -1) {
      updatedProducts[idxUpdatedProduct].muchOfProducts = count;
    }
    //updatedProducts[id].muchOfProducts = count;
    setOrderLines(updatedProducts);
    
    // updated array
    fetch(url + id, {
      method: "PUT",
      body: JSON.stringify(updatedProducts[idxUpdatedProduct]),
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    });
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

