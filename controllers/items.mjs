export default function initItemsController(db) {
  const index = async (request, response) => {
    try {
      const items = await db.Item.findAll();
      response.send({ items });
    } catch (error) {
      console.log(error);
    }
  };

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

  return {
    index, add,
  };
}
