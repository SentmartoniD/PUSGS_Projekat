





const Article = (props) => {

    const handleAddToCart = async () => {
        //berakom a local storagebe
        const proba = JSON.parse(localStorage.getItem("articles"));
        if (proba.includes(props.articleId))
            alert("Already added this item to My cart!");
        else {
            proba.push(props.articleId);
            alert("Successfully added to My cart!");
        }
        localStorage.setItem("articles", JSON.stringify(proba));
    }


    return (
        <article className="article" >
            <h2>{props.name}</h2>
            <img width={120} height={120} ></img>
            <p>{props.description}</p>
            <label>Price: {props.price}</label>
            <label>Available : {props.quantity}</label>
            <button onClick={handleAddToCart} >Add to cart!</button>
        </article>
    );
}




export default Article;