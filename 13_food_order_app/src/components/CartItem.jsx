function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {price}
      </p>
      <p>
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}

export default CartItem;
