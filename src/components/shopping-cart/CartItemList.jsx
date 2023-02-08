import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItemsAsync,
  cartItemsSelector,
  cartStatusSelector,
  cartErrorSelector
} from "../../redux/cart/cartSlice";
import { CartItem } from "./CartItem";


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
  else if (cartStatus === "failed")
    content = <div>Error: {cartError}</div>;

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
