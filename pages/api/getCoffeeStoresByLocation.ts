import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  const { latLong, limit = 30 } = req.query;

  if (!latLong) return res.status(400).json({ error: "missing latlong" });

  try {
    const coffeeStores = await fetchCoffeeStores(latLong, limit);

    return res.json({ coffeeStores });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({});
  }
};

export default getCoffeeStoresByLocation;
