export function createOrder(order) {
    console.log(order);
    let orders = localStorage.getItem("orders_x101");
    if (!orders) orders = [];
    else orders = JSON.parse(orders);
    orders.push(order);
    localStorage.setItem("orders_x101", JSON.stringify(orders));
}

export function getUserOrders(username) {
    let orders = localStorage.getItem("orders_x101");
    if (!orders) return [];
    return JSON.parse(orders)
               .filter(order => order.username === username);
}