import { useState } from "react";



function Articles() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [trigger, setTrigger] = useState(0);

    const handleAddArticle = async (e) => {
        //A KEP MUSAJ HOGY PNG LEGYEN VAGY ESETLEG JPEG, ES NEM SZABAD HOGY TUL NAGY LEGYEN!

    }

    return (
        <section className="container-articles" >
            <div className="box-add" >
                <h1 className="h1-articles" >Add new article!</h1>
                <form className="form-control-articles" >
                    <label htmlFor="name" >Name : </label>
                    <input id="name" type="text" className="input-articles" required ></input>
                    <label htmlFor="price" >Price(din) : </label>
                    <input id="price" type="number" className="input-articles" required ></input>
                    <label htmlFor="quantity" >Quantity : </label>
                    <input id="quantity" type="number" className="input-articles" required ></input>
                    <label htmlFor="description" >Description : </label>
                    <input id="description" type="text" className="input-articles" required ></input>
                    <img className="image-articles" width={100} height={100} ></img>
                    <label htmlFor="image_file" >Image : </label>
                    <input id="image_file" type='file' accept='image/png' className="input-articles-image" required ></input>
                    <button className="button-9-articles" onClick={handleAddArticle} >Add</button>
                </form>
            </div>
            <div className="box-view" >
                <h1 className="h1-articles" >Modify articles!</h1>
            </div>
        </section>
    )
}

export default Articles;