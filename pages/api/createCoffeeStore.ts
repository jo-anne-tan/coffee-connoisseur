import { NextApiHandler } from "next";
import {
  base_coffee_stores,
  getMinifiedRecord,
  getMinifiedRecords,
} from "../../lib/airtable";

const createCoffeeStore: NextApiHandler = async (req, res) => {
  const { id, neighbourhood, address, name, image_url, voting } = req.body;

  if (req.method !== "POST")
    return res.status(404).json({ error: "Page not found" });

  if (!name || !id)
    return res.status(400).json({ message: "ID or name is missing" });

  try {
    // ------ find coffee store by id
    const data = await base_coffee_stores
      .select({
        view: "Grid view",
        filterByFormula: `id="${id}"`,
      })
      .firstPage();

    if (data.length === 0) {
      // ------ if it doesn't exists, create coffee store
      // console.log("create");
      const record = await base_coffee_stores.create({
        id,
        name,
        address,
        neighbourhood,
        image_url,
        voting,
      });
      const coffee_store = getMinifiedRecord(record);

      return res.json({ coffee_store });
    } else {
      // if it exists, return existing
      // console.log("return existing");
      const coffee_store = getMinifiedRecords(data);
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