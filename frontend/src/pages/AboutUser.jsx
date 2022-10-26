import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getproduct,
  updateproduct,
  deleteproduct,
} from "../redux/productSlice";
function AboutUser() {
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { userInfo, userPending, userError } = useSelector(
    (state) => state.user
  );

  const { productInfo, productLoading, productError } = useSelector(
    (state) => state.product
  );

  var productsOfUserInfo = productInfo.filter(
    (x) => x.owner_email === userInfo.email
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproduct());
  }, []);

  function handleUpdateProduct(id) {
    dispatch(
      updateproduct({
        id: id,
        newDescription: newDescription,
        newPrice: newPrice,
      })
    );
    setNewDescription("");
    setNewPrice("");
  }

  function deleteProduct(id) {
    dispatch(deleteproduct(id));
  }

  var displayProducts = productsOfUserInfo.map((product) => {
    return (
      <div key={product.id}>
        <div className="card">
          <img
            className="card-img-top img-fluid w-50"
            alt=""
            src={product.url_img}
          />
          <div className="card-body">
            <h4 className="card-title"> {product.name} </h4>
            <p className="card-text"> ID: {product.id} </p>
            <p className="card-text"> Description: {product.description} </p>
            <p className="card-text"> Type: {product.type} </p>
            <p className="card-text"> Price: {product.price} $ </p>
            <p className="card-text"> Owner email: {product.owner_email} </p>
            <p className="card-text"> Tel: {product.tel} </p>
            <p className="card-text"> City: {product.city} </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProduct(product.id);
            }}
          >
            <input
              type="number"
              placeholder="New Price"
              value={newPrice}
              onChange={(event) => setNewPrice(event.target.value)}
              required
            />
            <br />
            <textarea
              className="mt-3"
              cols="30"
              rows="5"
              placeholder="New Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required
            ></textarea>
            <br /> <br />
            <button type="submit">
              <FontAwesomeIcon icon={faPen} /> Update Product
            </button>{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteProduct(product.id);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} /> Delete Product
            </button>
          </form>
        </div>

        <p>.................................</p>
      </div>
    );
  });

  return (
    <div className="container mt-1">
      <br />
      <h3>
        <FontAwesomeIcon icon={faUserCircle} /> Profile Of User{" "}
      </h3>
      {userPending && <Spinner animation="border" variant="primary" />}
      {userError && <p>Error </p>}
      <p>ID: {userInfo.id} </p>
      <p>Name: {userInfo.name} </p>
      <p>Email: {userInfo.email} </p>
      <p>.................................</p>

      <h3>{productsOfUserInfo.length} Products of the user </h3>
      {productLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div> {displayProducts} </div>
      )}
      {productError && <p>Error </p>}
      {userInfo.email === "" && <Navigate to="/" />}
    </div>
  );
}

export default AboutUser;
