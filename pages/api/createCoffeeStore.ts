import { NextApiHandler } from "next";
import {
  base_coffee_stores,
  filterCoffeeStoreById,
  getMinifiedRecord,
} from "../../lib/airtable";

const createCoffeeStore: NextApiHandler = async (req, res) => {
  const { id, neighbourhood, address, name, image_url, voting } = req.body;

  if (req.method !== "POST")
    return res.status(404).json({ error: "Page not found" });

  if (!name || !id)
    return res.status(400).json({ message: "ID or name is missing" });

  try {
    // ------ find coffee store by id
    const coffeeStore = await filterCoffeeStoreById(id.toString());
    if (coffeeStore.length === 0) {
      // ------ if it doesn't exists, create coffee store
      const record = await base_coffee_stores.create({
        id,
        name,
        address,
        neighbourhood,
        image_url,
        voting: 0,
      });
      const coffee_store = getMinifiedRecord(record);

      return res.json({ coffee_store });
    } else {
      // if it exists, return existing
      const coffee_store = coffeeStore[0];
      return res.json({ coffee_store });
    }
  } catch (error) {
    console.error("Error finding or creating store", error);
    return res
      .status(500)
      .json({ message: "Error finding or creating store", error });
  }
};

export default createCoffeeStore;
