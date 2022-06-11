import { NextApiHandler } from "next";
import { filterCoffeeStoreById } from "../../lib/airtable";

const getCoffeeStoreById: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "Id is missing" });

  try {
    // ------ find coffee store by id
    const coffeeStore = await filterCoffeeStoreById(id.toString());

    if (coffeeStore.length > 0) {
      return res.json({ coffeeStore: coffeeStore[0] });
    } else {
      return res
        .status(400)
        .json({ error: "No coffee store exists with this id" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoreById;
