import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItemsAsync,
  cartStatusSelector,
  cartItemCountSelector,
  clearCartAsync,
} from "../../redux/cart/cartSlice";
import { CartItemList } from "./CartItemList";
import { CartSummary } from "./CartSummary";
import { EmptyShoppingCart } from "./EmptyShoppingCart";

export function ShoppingCart() {
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
