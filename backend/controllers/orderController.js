import Order from '../models/Order.js';
import User from '../models/User.js';

// @route POST /api/orders  (creates order from current cart, then clears cart)
export const createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    if (!user.cart.length) return res.status(400).json({ message: 'Cart is empty' });

    const orderItems = user.cart.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
    });

    user.cart = [];
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};
