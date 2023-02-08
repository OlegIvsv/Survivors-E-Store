import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItemAsync,
  updateItemQuantityAsync
} from "../../redux/cart/cartSlice";


export function CartItem({ item }) {
  const dispatch = useDispatch();
  const [updateStatus, setUpdateStatus] = useState("idle");
  const [removeStatus, setRemoveStatus] = useState("idle");

  const removeThisItem = async () => {
    if (removeStatus === "pending")
      return;
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
    if (updateStatus === "pending")
      return;
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
          className="h-full w-full object-cover object-center" />
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
            className="input input-sm w-20 border-none" />
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
