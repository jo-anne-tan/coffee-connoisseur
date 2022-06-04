export type CoffeeStore = {
  categories: {
    id: number;
    name: string;
    icon: {
      prefix: string;
      suffix: string;
    };
  }[];
  chains: {
    id: string;
    name: string;
  }[];
  distance: number;
  fsq_id: string;
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
    roof: {
      latitude: number;
      longitude: number;
    };
    link: string;
  };
  location: {
    address: string;
    country: string;
    cross_street: string;
    formatted_address: string;
    locality: string;
    neighborhood: string[];
    postcode: string;
    region: string;
  };
  name: string;
  related_places: {
    parent?: { fsq_id: string; name: string };
  };
  timezone: string;
};
