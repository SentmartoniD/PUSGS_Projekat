class Order {
    constructor(orderId, comment, address, price, dateOfOrder, userBuyerId, userBuyer, articleIds, amountoOfArticles) {
        this.orderId = orderId;
        this.comment = comment;
        this.address = address;
        this.price = price;
        this.dateOfOrder = dateOfOrder;
        this.userBuyerId = userBuyerId;
        this.userBuyer = userBuyer;
        this.articleIds = articleIds;
        this.amountoOfArticles = amountoOfArticles;
    }
}

export default Order;