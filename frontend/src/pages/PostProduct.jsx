import React, { useState } from "react";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postproduct } from "../redux/productSlice";
function PostProduct() {
  var navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [ownerTel, setOwnerTel] = useState("");
  const [city, setCity] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function resetProduct() {
    setProductName("");
    setProductDescription("");
    setProductType("");
    setProductPrice(0);
    setFile(null);
    setOwnerTel("");
    setCity("");
  }
  function handleNewProduct(e) {
    e.preventDefault();
    var formData = new FormData();

    var details = JSON.stringify({
      name: productName,
      description: productDescription,
      type: productType,
      price: productPrice,
      tel: ownerTel,
      city: city,
    });
    formData.append("image", file);
    formData.append("document", details);

    dispatch(postproduct(formData));
    resetProduct();
  }

  return (
    <div>
      {userInfo.email !== "" ? (
        <div>
          <h3>CREATE PRODUCT</h3>
          <form className="mt-2" onSubmit={handleNewProduct}>
            <br />
            <label> Name: </label>
            <br />
            <input
              type="text"
              placeholder="Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <br />
            <label> Description: </label>
            <br />
            <textarea
              className="mt-2"
              cols="30"
              rows="5"
              placeholder="Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            ></textarea>

            <br />
            <label> Type: </label>
            <br />
            <select
              required
              className="mt-2"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="None"> Choose a type: </option>
              <option value="Jeans"> Jeans </option>
              <option value="T-shirt"> T-shirt </option>
              <option value="Shirt"> Shirt </option>
            </select>
            <br />
            <label> Price: </label>
            <br />
            <input
              className="mt-2"
              type="number"
              placeholder="Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
            <br />
            <label> Choose an image: </label>
            <br />
            <input
              className="mt-2"
              type="file"
              required
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <br />
            <label> Tel: </label>
            <br />
            <input
              className="mt-2"
              type="text"
              placeholder="Tel"
              value={ownerTel}
              onChange={(e) => setOwnerTel(e.target.value)}
              required
            />
            <br />
            <label> City: </label>
            <br />
            <select
              required
              className="mt-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="None"> Choose a city: </option>
              <option value="Hanoi"> Hanoi </option>
              <option value="Haiphong"> Haiphong </option>
              <option value="Saigon"> Saigon </option>
            </select>
            <br />

            <button className="mt-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p> Register or login to be able to post about a product. </p>
          <p> Hãy đăng ký hoặc đăng nhập để có thể đăng tin. </p>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>{" "}
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default PostProduct;
