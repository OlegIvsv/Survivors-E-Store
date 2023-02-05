import React from 'react'
import { useSelector } from 'react-redux';
import { getItemsFromCart } from '../redux/cartSlice';


export default function ShoppingCart() {
  
    const products = useSelector(getItemsFromCart);

    return (
      <div className="flex flex-col grow m-2 bg-white">
        <p className="font-bold text-lg text-left py-1 pl-3 sticky top-0 bg-white">
          Shopping Cart
          <hr className='w-3/5 mt-2'/>
        </p>
        <div className='flex flex-col md:flex-row'>
          <div className="basis-3/5">
            <div className="">
              <ul role="list" className="divide-y divide-solid divide-gray-300 ml-4 mr-6">
                {
                  products.map((p) => (<CartItem product={p} />))
                }
              </ul>
            </div>
          </div>
          <div className='basis-2/5 flex flex-col justify-top'>
            <div className='flex flex-col sticky top-2'>
              <CartSummary products={products} />
              <div className='text-left order-first md:order-last'>
                <button className="m-3 text-3xl self-start">
                  <i class="bi bi-x-square"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export function CartItem({ product }) {

  const priceWithDiscount = product.price * product.discount;

  return (
    <li key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col font-bold">
        <div className="flex justify-between text-sm">
            <h3>
              <a href={product.href}>
                {product.name}
                <i className='text-red-600 mb-6 align-text-top text-xs'>
                  {'  '}-{product.discount * 100}%
                </i> 
              </a>
            </h3>
            <input type="number" className="input input-sm w-20 border-none" />            
            <button type="button">
              <i class="bi bi-x text-lg"></i>            
            </button>
        </div>
        <div className='ml-4'>
          <div className="flex">
            <p>{product.price}$</p>
          </div>
          <div className="flex text-red-600 line-through">
            {priceWithDiscount.toFixed(2)}$
          </div>
        </div>
      </div>
    </li>
  );
}

export function CartSummary({ products }) {
  const personalDiscount = 0.05;
  const sum = products
    .map((product) => product.price)
    .reduce((sum, next) => sum + next);
  const sumWithDiscounts = products
    .map((product) => product.price * (1 - product.discount))
    .reduce((sum, next) => sum + next);
  const sumWithPersonalDiscount = sumWithDiscounts * (1 - personalDiscount);
  const total = sumWithPersonalDiscount;

  return (
    <section className="flex flex-col border border-gray-300 rounded-lg m-3 px-3">
      <span className="text-start my-2 font-bold">Order Summary</span>
      <div className="flex flex-row justify-between my-2">
        <p>Subtotal</p>
        <p className="font-bold">{sum.toFixed(2)}$</p>
      </div>
      <hr />
      <div className="flex flex-row justify-between my-2">
        <p>With Discount</p>
        <p className="font-bold">{sumWithDiscounts.toFixed(2)}$</p>
      </div>
      <hr />
      <div className="flex flex-row justify-between my-2">
        <p>With The Personal Discount</p>
        <p className="font-bold">{sumWithPersonalDiscount.toFixed(2)}$</p>
      </div>
      <hr />
      <div className="flex flex-row justify-between my-2 font-bold text-lg">
        <p>Total</p>
        <p>{total.toFixed(2)}$</p>
      </div>
      <hr />
      <button className="bg-x-green text-x-white mx-4 my-2 py-2 rounded-md font-bold ">
        Make Order
      </button>
    </section>
  );
}

