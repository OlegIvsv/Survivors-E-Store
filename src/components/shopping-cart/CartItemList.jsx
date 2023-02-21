import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartStatus } from "../../redux/cart/cartStatus";
import { CartItem } from "./CartItem";
import {
  cartItemsSelector,
  cartStatusSelector,
  cartErrorSelector
} from "../../redux/cart/cartSelectors";
import { fetchCartItemsAsync } from "../../redux/cart/thunks";


export function CartItemList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const cartStatus = useSelector(cartStatusSelector);
  const cartError = useSelector(cartErrorSelector);

  useEffect(() => {
    if (cartStatus === CartStatus.Idle) {
      dispatch(fetchCartItemsAsync());
    }
  }, []);

  let content;
  if (cartStatus === CartStatus.Loading || cartStatus === CartStatus.Idle)
    content = <div>Loading...</div>;
  else if (cartStatus === CartStatus.Succeeded)
    content = cartItems.map((item, i) => <CartItem key={i} item={item} />);
  else if (cartStatus === CartStatus.Failed)
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
