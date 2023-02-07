import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { authStateSelector } from '../redux/auth/authSlice';
import { useCartQuery, useRemoveItemMutation, useUpdateItemMutation } from '../redux/cart/cartApiSlice';

export default function ShoppingCart() {
    
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
              <button className="m-3 text-3xl self-start">
                <i className="bi bi-x-square"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CartItemList(){
  var {id} = useSelector(authStateSelector);
  const {
    data: cart, 
    isFetching, 
    isError
  } = useCartQuery({customerId:id});

    return (
      <div className="basis-3/5">
        {isFetching ? (
          <Skeleton />
        ) : (
          <div className="">
            <ul
              role="list"
              className="divide-y divide-solid divide-gray-300 ml-4 mr-6"
            >
              {cart.items.map((item, i) => (
                <CartItem key={i} item={item} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
}

export function CartItem({ item }){

  var {id} = useSelector(authStateSelector);
  const [removeItem] = useRemoveItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const removeThisItem = async () => {
    await removeItem({
      customerId: id,
      productId: item.productId
    }).unwrap();
  };

  const changeThisQuantity = async (newQuantity) => {
    await updateItem({
      customerId: id,
      item: {
        ...item,
        itemQuantity: newQuantity,
      },
    }).unwrap();
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
};

export function CartSummary() {

  var {id} = useSelector(authStateSelector);
  const {
    data: cart, 
    isFetching, 
    isError
  } = useCartQuery({customerId:id});

  const personalDiscount = 0.00;
  const emptyValue = 0;

  const items = isFetching ? emptyValue : cart.items;

  const sum = isFetching 
    ? emptyValue 
    : items.map((product) => product.unitPrice * product.quantity)
      .reduce((sum, next) => sum + next);

  const sumWithDiscounts = isFetching 
    ? emptyValue 
    : items
      .map((product) => product.unitPrice * (1 - product.discount) * product.quantity)
      .reduce((sum, next) => sum + next);

  const sumWithPersonalDiscount = isFetching 
    ? emptyValue 
    : sumWithDiscounts * (1 - personalDiscount);
  
  const total = sumWithPersonalDiscount;

  return (
    <section className="flex flex-col border border-gray-300 rounded-lg m-3 px-3">

      <span className="text-start my-2 font-bold">Order Summary</span>

      <div className="flex flex-row justify-between my-2">
        <p>Subtotal</p>
        <p className="font-bold">{sum.toFixed(2)}$</p>
      </div>
      <hr/>
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

