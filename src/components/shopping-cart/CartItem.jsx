import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItemAsync,
  updateItemQuantityAsync
} from "../../redux/cart/thunks";

export function CartItem({ item }) {

  const dispatch = useDispatch();
  const [updateIsPending, setUpdateIsPending] = useState(false);
  const [removeIsPending, setRemoveIsPending] = useState(false);

  const removeThisItem = async () => {
    if (removeIsPending === true)
      return;
    try {
      setUpdateIsPending(true);
      await dispatch(removeCartItemAsync({ productId: item.productId }));
    } catch {
      //if error, state is not updated
    } finally {
      setRemoveIsPending(false);
    }
  };

  const changeThisQuantity = async (newQuantity) => {
    if (updateIsPending === true)
      return;
    try {
      setUpdateIsPending(true);
      await dispatch(updateItemQuantityAsync({ item, newQuantity }));
    } catch {
      //if error, state is not updated
    } finally {
      setUpdateIsPending(false);
    }
  };

  const priceWithDiscount = item.unitPrice * (1 - item.discount);

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border">
        <img
          src={item.imageUrl}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col font-bold">
        <div className="flex justify-between text-sm">
          <h3>
            <a href={item.href}>
              {item.productTitle}
              <i className="text-red-600 mb-6 align-text-top text-xs">
                {"  "}-{(item.discount * 100).toFixed(2)}%
              </i>
            </a>
          </h3>
        </div>
        <div className="flex justify-between text-sm self-end">
          <div className=" basis-1/3 flex flex-row justify-between">
            <input
              type="number"
              value={item.itemQuantity}
              onInput={(e) => changeThisQuantity(e.target.valueAsNumber)}
              className="input input-sm input-group w-20 border-none"
            />
            <button type="button" onClick={() => removeThisItem()}>
              <i className="bi bi-x text-lg"></i>
            </button>
          </div>
        </div>
        <div className="ml-4">
          <div className="flex">{priceWithDiscount.toFixed(2)}$</div>
          <div className="flex text-red-600 line-through">
            <p>{item.unitPrice.toFixed(2)}$</p>
          </div>
        </div>
      </div>
    </li>
  );
}
