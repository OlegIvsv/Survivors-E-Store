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

  const priceWithDiscount = item.unitPrice * item.itemQuantity * (1 - item.discount);
  const priceWithoutDiscount = item.unitPrice * item.itemQuantity;

  return (
    <li className="flex py-2">
      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg border">
        <img
          src={item.imageUrl}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col font-bold">
        <div className="flex justify-between text-sm">
          <h3>
            <a href={item.href} className="line-clamp-1 font-semibold">
              {item.productTitle}
              {item.discount === 0 || (
                <i className="text-red-600 mb-6 align-text-top text-xs font-bold">
                  {"  "}-{(item.discount * 100).toFixed()}%
                </i>
              )}
            </a>
          </h3>
        </div>
        <div className="flex justify-between text-sm self-end">
          <div className=" basis-1/3 flex flex-row justify-between">
            <input
              type="number"
              value={item.itemQuantity}
              onInput={(e) => changeThisQuantity(e.target.valueAsNumber)}
              className="input input-md input-group w-20 border-none font-mono text-lg"
            />
            <button type="button" onClick={() => removeThisItem()}>
              <i className="bi bi-x text-lg"></i>
            </button>
          </div>
        </div>
        <div className="ml-4 -mt-5">
          <div className="flex text-xl font-mono">
            {priceWithDiscount.toFixed(2)}₴
          </div>
          {item.discount === 0 || (
            <div className="flex text-red-600 line-through font-mono">
              <p>{priceWithoutDiscount.toFixed(2)}₴</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
