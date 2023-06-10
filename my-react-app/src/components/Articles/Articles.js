import { useState, useEffect } from "react";
import { CreateArticle, GetArticlesByEmail, DeleteArticle, UpdateArticle, UploadImageForArticle } from "../../services/ArticleService";


function Articles() {
    const [name, setName] = useState(""); const [nameModify, setNameModify] = useState("");
    const [price, setPrice] = useState(0); const [priceModify, setPriceModify] = useState(0);
    const [quantity, setQuantity] = useState(0); const [quantityModify, setQuantityModify] = useState(0);
    const [description, setDescription] = useState(""); const [descriptionModify, setDescriptionModify] = useState("");
    const [image, setImage] = useState(""); const [imageModify, setImageModify] = useState("");
    const [file, setFile] = useState();
    const [trigger, setTrigger] = useState(0);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const GetAllArticles = async () => {
            try {
                const resp = await GetArticlesByEmail();
                setArticles(resp.data);
                console.log(resp.data);
            }
            catch (err) {
                if (!err?.response)
                    alert("No server response, geting articles failed!");
                else
                    alert(JSON.stringify(err.response.data));
            }
        }
        GetAllArticles();
    }, [trigger]);

    const handleAddArticle = async (e) => {
        e.preventDefault();
        //A KEP MUSAJ HOGY PNG LEGYEN VAGY ESETLEG JPEG, ES NEM SZABAD HOGY TUL NAGY LEGYEN
        if (name === "" || price === 0 || quantity === 0 || description === "" || image === "") {
            alert("Must fill all fields, price and quantity have to be a number!")
            return;
        }

        try {
            const resp = await CreateArticle(name, price, quantity, description);
            console.log(resp.data);
            const resp1 = await UploadImageForArticle(file, resp.data.articleId);
            setImageModify("");
            alert("Successfully added the article!")
        }
        catch (err) {
            if (!err?.response)
                alert("No server response, creating article failed!");
            else
                alert(JSON.stringify(err.response.data));
        }
        setTrigger(trigger + 1);
    }

    const handleDeleteArticle = async (id) => {
        try {
            const resp = await DeleteArticle(id);
            alert("Successfully deleted the article!");
        }
        catch (err) {
            if (!err?.response)
                alert("No server response, creating article failed!");
            else
                alert(JSON.stringify(err.response.data));
        }
        setTrigger(trigger + 1);
    }

    const handleUpdateArticle = async (id) => {
        if (nameModify === "" && priceModify === 0 && quantityModify === 0 && descriptionModify === "" && imageModify === "") {
            alert("Your profile wont be updated, you didnt change any information!");
            return;
        }
        try {
            const resp = await UpdateArticle(id, nameModify, priceModify, quantityModify, descriptionModify);
            console.log(resp.data);
            alert("Successfully updated the article!");
            if (imageModify !== undefined) {
                const resp1 = await UploadImageForArticle(file, id);
            }
        }
        catch (err) {
            if (!err?.response)
                alert("No server response, creating article failed!");
            else
                alert(JSON.stringify(err.response.data));
        }
        setTrigger(trigger + 1);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImage(URL.createObjectURL(file));
    }

    const handleModifyImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImageModify(URL.createObjectURL(file));
    }


    return (
        <section className="container-articles" >
            <div className="box-add" >
                <h1 className="h1-articles" >Add new article!</h1>
                <form className="form-control-articles" >
                    <label htmlFor="name" >Name : </label>
                    <input id="name" type="text" className="input-articles" required onChange={(e) => setName(e.target.value)} ></input>
                    <label htmlFor="price" >Price(din) : </label>
                    <input id="price" type="number" className="input-articles" required onChange={(e) => setPrice(e.target.value)} ></input>
                    <label htmlFor="quantity" >Quantity : </label>
                    <input id="quantity" type="number" className="input-articles" required onChange={(e) => setQuantity(e.target.value)} ></input>
                    <label htmlFor="description" >Description : </label>
                    <input id="description" type="text" className="input-articles" required onChange={(e) => setDescription(e.target.value)} ></input>
                    <img className="image-articles" width={100} height={100} src={image} ></img>
                    <label htmlFor="image_file" >Image : </label>
                    <input id="image_file" type='file' accept='image/png' className="input-articles-image" required onChange={handleImageChange} ></input>
                    <button className="button-9-articles" onClick={handleAddArticle} >Add</button>
                </form>
            </div>
            <div className="box-view" >
                <h1 className="h1-articles" >Modify articles!</h1>
                {articles.length === 0 ? <></> :
                    <ul className="ul-items-articles" >
                        {
                            articles.map((article) => (
                                <li id={article.articleId} className="item-articles" >
                                    <div>
                                        <label htmlFor={"name" + article.articleId} className="label-articles-view" >Name : </label>
                                        <input id={"name" + article.articleId} type="text" className="input-articles" defaultValue={article.name} required onChange={(e) => setNameModify(e.target.value)} ></input>
                                        <label htmlFor={"price" + article.articleId} >Price(din) : </label>
                                        <input id={"price" + article.articleId} type="number" className="input-articles" defaultValue={article.price} required onChange={(e) => setPriceModify(e.target.value)} ></input>
                                        <label htmlFor={"quantity" + article.articleId} >Quantity : </label>
                                        <input id={"quantity" + article.articleId} type="number" className="input-articles" defaultValue={article.quantity} required onChange={(e) => setQuantityModify(e.target.value)} ></input>
                                        <label htmlFor={"description" + article.articleId} >Description : </label>
                                        <input id={"description" + article.articleId} type="text" className="input-articles" defaultValue={article.description} required onChange={(e) => setDescriptionModify(e.target.value)} ></input>
                                        <label htmlFor={"image_file" + article.articleId} >Image : </label>
                                        <input id={"image_file" + article.articleId} type='file' accept='image/ng' className="input-articles-image" required onChange={handleModifyImageChange} ></input>
                                    </div>
                                    <img width={90} height={90} src={`data:image/png;base64,${article.imageFile}`} ></img>
                                    <button onClick={() => handleUpdateArticle(article.articleId)} >Modify!</button>
                                    <button onClick={() => handleDeleteArticle(article.articleId)} >Delete!</button>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
        </section>
    )
}

export default Articles;