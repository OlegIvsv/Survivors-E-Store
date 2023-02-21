import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  cartItemsSelector,
  cartStatusSelector
} from "../../redux/cart/cartSelectors";


export function CartSummary() {
  const cartItems = useSelector(cartItemsSelector);
  const cartStatus = useSelector(cartStatusSelector);

  if (cartStatus === "loading" || cartStatus === "idle")
    return <div>Loading...</div>;
  else if (cartStatus === "failed")
    return <div>Sorry. We can't load your shopping cart.</div>;

  const personalDiscount = 0.0;

  const sum = cartItems
    .map(product => product.unitPrice * product.itemQuantity)
    .reduce((sum, next) => sum + next);

  const sumWithDiscounts = cartItems
    .map(product => product.unitPrice * (1 - product.discount) * product.itemQuantity)
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
