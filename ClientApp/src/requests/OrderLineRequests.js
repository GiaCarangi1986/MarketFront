  // функция добавления строки заказа
  export async function addOrderLine (product) {
    //в бд добавляю
    let result = await fetch("https://localhost:44332/api/orderLines/", {
      method: "POST",
      body: JSON.stringify({
        IdProduct: product.idProduct,
        NowCost: product.nowCost,
        scorGodnostiO: product.scorGodnostiO,
        Title: product.title,
        IdCategoryFk: product.idCategoryFk
      }),
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    });
    
    result = await result.json();
    return result;
}

  // функция обновления строки заказа
  export async function updateOrderLine (id, updatedOrderLine) {
    let result = await fetch("https://localhost:44332/api/orderLines/" + id, {
        method: "PUT",
        body: JSON.stringify(updatedOrderLine),
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
    });
    
    //result = await result.json();
    return result;
}

  // функция проверки: есть ли уже такой продукт в корзине
  export async function checkOrderLine (id) {
    let result = await fetch("https://localhost:44332/api/orderLines/" + id, {
      method: "GET",
      credentials: 'include'
    });
    
    result = await result.json();
    return result;
}