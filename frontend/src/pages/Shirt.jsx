import React, { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getproduct, deleteproduct } from "../redux/productSlice";
function Shirt({ searchWord }) {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 3;
  const pagesVisited = pageNumber * productsPerPage;

  const { userInfo } = useSelector((state) => state.user);
  const { productInfo, productLoading, productError } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproduct());
  }, []);

  var productsShirtInfo = productInfo.filter((x) => x.type === "Shirt");

  function deleteProduct(id) {
    dispatch(deleteproduct(id));
  }

  var displayProductsShirt = productsShirtInfo
    .filter((product) => {
      return product.name.toLowerCase().includes(searchWord);
    })
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => {
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
            {userInfo.email !== "" && userInfo.isAdmin === 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteProduct(product.id);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} /> Delete Product
              </button>
            )}
          </div>

          <p>.................................</p>
        </div>
      );
    });

  const pageCount = Math.ceil(productsShirtInfo.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="container mt-5">
      <h3> Shirts: </h3>
      {productLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div>
          {" "}
          {displayProductsShirt}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      )}
      {productError && <p>Error </p>}
    </div>
  );
}

export default memo(Shirt);
