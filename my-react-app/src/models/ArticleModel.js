class Article {
    constructor(articleId, name, price, quantity, description, imageFile, userSellerId, userSeller) {
        this.articleId = articleId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.imageFile = imageFile;
        this.userSellerId = userSellerId;
        this.userSeller = userSeller;
    }
}

export default Article;