import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  fetchCartItemsAsync,
  cartItemsSelector,
  cartStatusSelector,
  cartErrorSelector,
  removeCartItemAsync,
  updateItemQuantityAsync,
  cartItemCountSelector,
  clearCartAsync,
} from "../redux/cart/cartSlice";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(cartItemCountSelector);
  const cartStatus = useSelector(cartStatusSelector);

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(fetchCartItemsAsync());
    }
  }, []);

  const clearThisCart = async () => {
    await dispatch(clearCartAsync());
  };

  if (cartStatus === "pending" || cartStatus === "idle")
    return <div>Loading...</div>;
  if (cartStatus === "failed")
    return <div>Sorry. we can't get your shopping cart</div>;
  if (cartItemCount === 0) return <EmptyShoppingCart />;

  return (
    <div className="flex flex-col grow m-2 bg-white">
      <p className="font-bold text-lg text-left py-1 pl-3 sticky top-0 bg-white">
        Shopping Cart
        <hr className="w-3/5 mt-2" />
      </p>
      <div className="flex flex-col md:flex-row">
        <CartItemList />
        <div className="basis-2/5 flex flex-col justify-top">
          <div className="flex flex-col sticky top-2">
            <CartSummary />
            <div className="text-left order-first md:order-last">
              <button
                onClick={clearThisCart}
                className="m-3 text-3xl self-start"
              >
                <i className="bi bi-x-square"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyShoppingCart() {
  return (
    <p className="font-bold text-x-dark-green">
      <p>You don't have any products in your cart yet :(</p>
      <NavLink to="/catalog">
        <button className="text-x-white bg-x-red rounded-lg p-3">
          Go shopping!
        </button>
      </NavLink>
    </p>
  );
}

export function CartItemList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const cartStatus = useSelector(cartStatusSelector);
  const cartError = useSelector(cartErrorSelector);

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(fetchCartItemsAsync());
    }
  }, []);

  let content;
  if (cartStatus === "loading" || cartStatus == "idle")
    content = <div>Loading...</div>;
  else if (cartStatus === "succeeded")
    content = cartItems.map((item, i) => <CartItem key={i} item={item} />);
  else if (cartStatus === "failed") content = <div>Error: {cartError}</div>;

  return (
    <div className="basis-3/5">
      <div className="">
        <ul
          role="list"
          className="divide-y divide-solid divide-gray-300 ml-4 mr-6"
        >
          {content}
        </ul>
      </div>
    </div>
  );
}

export function CartItem({ item }) {
  const dispatch = useDispatch();
  const [updateStatus, setUpdateStatus] = useState("idle");
  const [removeStatus, setRemoveStatus] = useState("idle");

  const removeThisItem = async () => {
    if (removeStatus === "pending") return;
    try {
      setUpdateStatus("pending");
      await dispatch(removeCartItemAsync({ productId: item.productId }));
    } catch {
      //if error, state is not updated
    } finally {
      setRemoveStatus("idle");
    }
  };

  const changeThisQuantity = async (newQuantity) => {
    if (updateStatus === "pending") return;
    try {
      setUpdateStatus("pending");
      await dispatch(updateItemQuantityAsync({ item, newQuantity }));
    } catch {
      //if error, state is not updated
    } finally {
      setUpdateStatus("idle");
    }
  };

  const priceWithDiscount = item.unitPrice * item.discount;

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.imageSrc}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col font-bold">
        <div className="flex justify-between text-sm">
          <h3>
            <a href={item.href}>
              {item.productTitle}
              <i className="text-red-600 mb-6 align-text-top text-xs">
                {"  "}-{item.discount * 100}%
              </i>
            </a>
          </h3>
          <input
            type="number"
            value={item.quantity}
            onInput={(e) => changeThisQuantity(e.target.valueAsNumber)}
            className="input input-sm w-20 border-none"
          />
          <button type="button" onClick={() => removeThisItem()}>
            <i className="bi bi-x text-lg"></i>
          </button>
        </div>
        <div className="ml-4">
          <div className="flex">
            <p>{item.unitPrice.toFixed(2)}$</p>
          </div>
          <div className="flex text-red-600 line-through">
            {priceWithDiscount.toFixed(2)}$
          </div>
        </div>
      </div>
    </li>
  );
}

export function CartSummary() {
  const cartItems = useSelector(cartItemsSelector);
  const cartStatus = useSelector(cartStatusSelector);

  if (cartStatus === "loading" || cartStatus === "idle")
    return <div>Loading...</div>;
  else if (cartStatus === "failed")
    return <div>Sorry. We can't load your shopping cart.</div>;

  const personalDiscount = 0.0;

  const sum = cartItems
    .map(product => product.unitPrice * product.quantity)
    .reduce((sum, next) => sum + next);

  const sumWithDiscounts = cartItems
    .map(product => product.unitPrice * (1 - product.discount) * product.quantity)
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

      <Link
        to="make-order"
        className="bg-x-green text-x-white mx-4 my-2 py-2 rounded-md font-bold"
      >
        <button>Make Order</button>
      </Link>
    </section>
  );
}
