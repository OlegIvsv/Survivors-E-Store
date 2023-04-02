import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { putItemToCartAsync } from '../../redux/cart/thunks';

export function ProductCell({ product }) {

  const dispatch = useDispatch();

  const addThisToCart = async () => {
    await dispatch(putItemToCartAsync({
      item: toItem(product)
    }));
  }

  return (
    <div className="flex flex-col w-full ">
      <div className="basis-4/7 overflow-hidden rounded-lg rounded-b-none aspect-w-1 aspect-h-1">
        <img
          className="object-cover object-center w-full h-full"
          src={product.imageUrl}
        />
      </div>
      <div className="basis-2/7 text-left px-1 pb-3 border-gray-400 shadow-xl">
        <Link 
          to={`/product/${product.productId}`} 
          className="line-clamp-2 font-bold hover:text-x-green min-h-12">
          {product.productTitle}
        </Link>
        <span className="font-bold text-2xl font-mono">
          {product.unitPrice.toFixed(2)}₴
        </span>
        {" "}
        {product.discount == 0 || (
          <span className="font-bold font-mono text-xl text-red-400 line-through">
            {(product.unitPrice * (1 - product.discount)).toFixed(2)}₴
          </span>
        )}
        <small className="text-gray-400 line-clamp-3">
          {product.description}
        </small>
        <button className="buy-btn mt-2" onClick={addThisToCart}>+ Add to Cart</button>
      </div>
    </div>
  );
}

export function ProductRow({ product }) {

  const dispatch = useDispatch();

  const addThisToCart = async () => {
    await dispatch(putItemToCartAsync({
      item: toItem(product)
    }));
  }

  return (
    <div className="flex flex-row h-full shadow-lg">
      <div className="w-1/3 overflow-hidden rounded-lg rounded-r-none">
        <img
          className="object-cover object-center w-full h-full"
          src={product.imageUrl}
        />
      </div>
      <div className="flex flex-col justify-between w-2/3 text-left ml-2 py-3">
        <div>
          <Link to={`/product/${product.productId}`} className="line-clamp-2 text-lg font-bold hover:text-x-green">
            {product.productTitle}
          </Link>
          <div>
            <span className="font-bold text-2xl font-mono">
              {product.unitPrice.toFixed(2)}₴
            </span>
            {product.discount == 0 || (
              <span className="font-bold text-xl text-red-400 line-through font-mono">
                {(product.unitPrice * (1 - product.discount)).toFixed(2)}₴
              </span>
            )}
          </div>
          <small class="line-clamp-4 text-gray-400 mt-3">
            {product.description}
          </small>
        </div>
        <div>
          <button className="buy-btn px-4 w-full" onClick={addThisToCart}>+ Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

function toItem(product){
  return {
    productId: product.productId,
    itemQuantity: 1,
    productTitle: product.productTitle,
    imageUrl: product.imageUrl,
    discount: product.discount,
    unitPrice: product.unitPrice
  };
}