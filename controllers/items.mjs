export default function initItemsController(db) {
  const index = async (request, response) => {
    try {
      const items = await db.Item.findAll();
      response.send({ items });
    } catch (error) {
      console.log(error);
    }
  };

  // Creates new item inside our 'items' table
  const add = async (request, response) => {
    const { nameInput, descriptionInput, priceInput } = request.body;

    try {
      const newItem = await db.Item.create({
        name: nameInput,
        description: descriptionInput,
        price: priceInput,

      });
      // Sends back the new item
      response.send(newItem);
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async (request, response) => {
    const { cart } = request.body;

    try {
      // Creates new row in 'orders' table
      // Get hold of the order_id here that should be references inside the item
      const newOrder = await db.Order.create({
        quantity: cart.quantity,
      });
      response.send(newOrder);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index, add, checkout,
  };
}
