export const mockProperties = [
  {
    id: 1,
    name: "Downtown Apartment",
    overview: {
      guests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 3,
    },
    about: "A modern and stylish apartment located in the heart of downtown, perfect for couples or small families.",
    amenities: [
      "Wi-Fi",
      "Air Conditioning",
      "Heating",
      "Smart TV",
      "Kitchen",
      "Washing Machine",
      "Coffee Maker",
      "Workspace",
      "Balcony",
    ],
    stayPolicies: {
      arrivalDepartures: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
      },
      houseRules: [
        "No smoking",
        "No pets",
        "No parties or events",
        "Quiet hours after 10 PM",
      ],
      cancellationPolicy: {
        lessThan28Days: [
          "50% refund if canceled 7 days before check-in",
          "No refund if canceled within 7 days",
        ],
        moreThan28Days: [
          "Full refund if canceled 14 days before check-in",
          "50% refund if canceled within 14 days",
        ],
      },
    },
  },
  {
    id: 2,
    name: "Beach House",
    overview: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      beds: 4,
    },
    about: "A spacious house just steps away from the beach, with stunning sea views and modern amenities.",
    amenities: [
      "Private Pool",
      "Wi-Fi",
      "Fully Equipped Kitchen",
      "Air Conditioning",
      "Outdoor BBQ",
      "Parking",
      "Washer & Dryer",
      "TV with streaming services",
      "Beach Access",
    ],
    stayPolicies: {
      arrivalDepartures: {
        checkIn: "2:00 PM",
        checkOut: "10:00 AM",
      },
      houseRules: [
        "No smoking indoors",
        "No glass near pool",
        "No loud music after midnight",
        "Pets allowed with prior approval",
      ],
      cancellationPolicy: {
        lessThan28Days: [
          "25% refund if canceled 14 days before check-in",
          "No refund if canceled within 14 days",
        ],
        moreThan28Days: [
          "Full refund if canceled 30 days before check-in",
          "50% refund if canceled within 30 days",
        ],
      },
    },
  },
  {
    id: 3,
    name: "Mountain Cabin",
    overview: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 2,
      beds: 6,
    },
    about: "A rustic cabin surrounded by nature, perfect for families and groups looking for a peaceful mountain escape.",
    amenities: [
      "Fireplace",
      "Wi-Fi",
      "Hot Tub",
      "Outdoor Grill",
      "Hiking Trails Nearby",
      "Board Games",
      "Fully Equipped Kitchen",
      "Parking",
      "Pet Friendly",
    ],
    stayPolicies: {
      arrivalDepartures: {
        checkIn: "4:00 PM",
        checkOut: "12:00 PM",
      },
      houseRules: [
        "No smoking",
        "Respect wildlife",
        "Fires only in designated pits",
        "Quiet hours after 11 PM",
      ],
      cancellationPolicy: {
        lessThan28Days: [
          "50% refund if canceled 10 days before check-in",
          "No refund if canceled within 10 days",
        ],
        moreThan28Days: [
          "Full refund if canceled 21 days before check-in",
          "50% refund if canceled within 21 days",
        ],
      },
    },
  },
];
