export const serviceableLocations = [
  "Bronx, NY",
  "Los Angeles, CA",
  "Long Island City, NY",
  "New York City, NY"
];

export const unserviceableLocations = [
  "Chicago, IL",
  "Austin, TX",
  "Miami, FL",
  "Seattle, WA"
];

const getImageUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

export const carsData = [
  {
    id: 1,
    name: "Volkswagen ID.4",
    type: "SUV",
    brand: "Volkswagen",
    model: "ID.4",
    priceDay: 95,
    priceTrip: 95,
    image: getImageUrl("images/vw_id4.png"),
    seats: 5,
    range: 280,
    location: "Bronx, NY"
  },
  {
    id: 2,
    name: "Rivian R1T",
    type: "Truck",
    brand: "Rivian",
    model: "R1T",
    priceDay: 122,
    priceTrip: 122,
    image: getImageUrl("images/rivian_r1t.png"),
    seats: 5,
    range: 410,
    location: "Bronx, NY"
  },
  {
    id: 3,
    name: "Lucid Motors Air",
    type: "Sedan",
    brand: "Lucid Motors",
    model: "Air",
    priceDay: 137,
    priceTrip: 137,
    image: getImageUrl("images/lucid_air.png"),
    seats: 5,
    range: 516,
    location: "Bronx, NY"
  },
  {
    id: 4,
    name: "Volkswagen ID.Buzz",
    type: "SUV", // classifying as SUV based on the screenshot
    brand: "Volkswagen",
    model: "ID.Buzz",
    priceDay: 110,
    priceTrip: 110,
    image: getImageUrl("images/vw_idbuzz.png"),
    seats: 7,
    range: 260,
    location: "Bronx, NY"
  },
  {
    id: 5,
    name: "Tesla Model 3",
    type: "Sedan",
    brand: "Tesla",
    model: "Model 3",
    priceDay: 89,
    priceTrip: 89,
    image: getImageUrl("images/tesla_model3.png"),
    seats: 5,
    range: 358,
    location: "Bronx, NY"
  }
];

export const vehicleTypes = ["SUV", "Truck", "Sedan"];
export const vehicleBrands = ["Cadillac", "CHEVROLET", "Ford", "Hyundai", "Lucid Motors", "Rivian", "Tesla", "Volkswagen"];
export const vehicleModels = ["Air", "Equinox", "Escalade IQL", "ID.4", "ID.Buzz", "IONIQ 5", "LYRIQ", "Model 3", "Model X"];
