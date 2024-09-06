import Cart from "../models/cart.mode.js";
import CheckD from "../models/checkout.model.js";
import Items from "../models/items.model.js";

//add new items
export const Itcreate = async (req, res, next) => {
  const { ItemsN, price, quantity, image} = req.body;

  const newItems = new Items({
    ItemsN,
    price,
    quantity,
    image,
  });
  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

//get all items
export const getAllItems = async (req, res, next) => {
  try {
    const items = await Items.find();

    if (items.length > 0) {
      res.json({ message: "Items details retrieved successfully", items });
    } else {
      return next(errorHandle(404, " student not fonud "));
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

//add cart
export const Cartcrete = async (req, res, next) => {
  const { CurrentuserId, ItemsN, price, quantity, image, } =
    req.body;

  const newItems = new Cart({
    CurrentuserId,
    ItemsN,
    price,
    quantity,
    image,
    
  });
  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// display in the cart
export const getCartItem = async (req, res, next) => {
    try {
      const { CurrentuserId } = req.params;
      console.log(CurrentuserId);
  
      // Query the database for documents matching CurrentuserId
      const items = await Cart.find({ CurrentuserId });
      console.log(items);
  
      // Send extracted data as response
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

//romove 1 items in the cart
export const deleteItems = async (req, res, next) => {
    try {
      await Cart.findByIdAndDelete(req.params.itemsId);
      res.status(200).json("The post has been deleted");
    } catch (error) {
      next(error);
    }
  };

  // clear the cart
export const deleteItemss = async (req, res, next) => {
    try {
      const { CurrentuserId } = req.params;
  
      // Delete items associated with the specified CurrentUserId
      await Cart.deleteMany({ CurrentuserId });
  
      res.status(200).json({ message: "Items have been deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };


  //after click the check out those data save the chekd database
export const CheckOutcrete = async (req, res, next) => {
    const {
      
      length,
      totalPrice,
      CurrentuserId,
      items,
    } = req.body;
  
  
    const newItems = new CheckD({
      
      length,
      totalPrice,
      CurrentuserId,
      items,
    });
    try {
      const savedItems = await newItems.save();
      res.status(201).json(savedItems);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };




  // display in the cart
export const getcheckdetails = async (req, res, next) => {
  try {
    const { CurrentuserId } = req.params;
    console.log(CurrentuserId);

    // Query the database for documents matching CurrentuserId
    const items = await CheckD.find({ CurrentuserId });
    console.log(items);

    // Send extracted data as response
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


