import { NextApiHandler } from "next";
import {
  base_coffee_stores,
  filterCoffeeStoreById,
  getMinifiedRecords,
} from "../../lib/airtable";

const upvoteCoffeeStore: NextApiHandler = async (req, res) => {
  if (req.method !== "PUT")
    return res.status(404).json({ error: "Page not found" });

  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "Id is missing" });

  const idStr = id.toString();

  try {
    const coffeeStores = await filterCoffeeStoreById(idStr);

    if (coffeeStores.length > 0) {
      const store = coffeeStores[0];
      const currentVote = store.voting ? +store.voting : 0;
      const storeUpdated = await base_coffee_stores.update([
        {
          id: store.recordId,
          fields: { voting: currentVote + 1 },
        },
      ]);
      const storeMinified = getMinifiedRecords(storeUpdated)[0];
      return res.json(storeMinified);
    } else {
      return res
        .status(400)
        .json({ error: "No coffee store exists with this id" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error upvoting coffee store", error });
  }
};
export default upvoteCoffeeStore;
