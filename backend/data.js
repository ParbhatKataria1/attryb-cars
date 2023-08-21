// inventory 
const data = {
    "data": [
      {
        "image": "https://imgd.aeplcdn.com/370x208/n/cw/ec/144793/maruti-suzuki-fronx-left-front-three-quarter1.jpeg?isig=0&wm=1&q=75",
        "odometer": 11000,
        "scratches": 4,
        "original_paint": "yellow",
        "reported_accident": 3,
        "previous_buyer": 1,
        "registration_place": "Delhi",
        "oem_spec": "64e349917b89d2d2eadade1a",
        "user":"64e322603213d43430a789be" ,
        "description": [
          "Sleek and stylish",
          "Powerful performance:",
          "Comfort and luxury"
        ],
        "title":"Cruze"
      },
      {
        "_id": "648162fbd6bb5dcdef8e3683",
        "image": "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-4.jpeg?isig=0&q=75",
        "odometer": 7000,
        "scratches": 2,
        "original_paint": "blue",
        "reported_accident": 1,
        "previous_buyer": 2,
        "registration_place": "Hydrabad",
        "oem_spec": "64e349917b89d2d2eadade1b",
        "user": "64e322603213d43430a789be",
        "description": [
          "Sleek and stylish",
          "Powerful performance:",
          "Comfort and luxury"
        ],
        "title":"Honda"
      },
      {
        "_id": "6482a48d3aac17b93bd1341f",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQiWykmk3qytsvRqSjQFF6abCG2RJniQG_BfiKtwVsxXaFJk-HLld9eRlnR0w9DG3o6963RT4d7IE&usqp=CAU&ec=48600112",
        "odometer": 24000,
        "scratches": 3,
        "original_paint": "white",
        "reported_accident": 4,
        "previous_buyer": 1,
        "registration_place": "Mumbai",
        "oem_spec": "64e349917b89d2d2eadade1c",
        "user": "64e322603213d43430a789be",
        "description": [
          "Electric",
          "Super Charging Support",
          "Efficient"
        ],
        "title": "Ford"
      },
      {
        "_id": "6482a589b56e9fdbca42d8d8",
        "image": "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/X5ModelImage.jpg&w=872&h=578&q=75&c=1",
        "odometer": 50000,
        "scratches": 3,
        "original_paint": "silver",
        "reported_accident": 3,
        "previous_buyer": 5,
        "registration_place": "Pune",
        "oem_spec": "64e349917b89d2d2eadade1d",
        "user": "64e322603213d43430a789be",
        "description": [
          "Efficient",
          "Head Lights",
          "Power",
          "Fuel Efficiency"
        ],
        "title": "Toyota"
      },
      {
        "_id": "6482d9d8f032be59290b4ce5",
        "image": "https://media.zigcdn.com/media/model/2022/Feb/honda_city_360x240.jpg",
        "odometer": 60000,
        "scratches": 0,
        "original_paint": "red",
        "reported_accident": 2,
        "previous_buyer": 3,
        "registration_place": "4",
        "oem_spec": "64e349917b89d2d2eadade1e",
        "user": "64e322603213d43430a789be",
        "description": [
          "Top class model",
          "New Model in the Market",
          "Not much damage",
          "Efficiency"
        ],
        "title": "Audi "
      },
      {
        "_id": "648315a26f9e42d95cce5f92",
        "image": "https://imgd.aeplcdn.com/0x0/n/cw/ec/48067/s-class-exterior-right-front-three-quarter-3.jpeg",
        "odometer": 34000,
        "scratches": 2,
        "original_paint": "white",
        "reported_accident": 4,
        "previous_buyer": 2,
        "registration_place": "Pune",
        "oem_spec": "64e349917b89d2d2eadade1f",
        "user": "64e322603213d43430a789be",
        "description": [
          "Shinny",
          "cool",
          "Exclusive leather upholstery",
          "Keyless start"
        ],
        "title": "BMW"
      }
    ],
  }

  // oem 

  export const oem = [
    {
      "model": "Chevrolet Cruze",
      "year": 2022,
      "price": 22000,
      "color": [
        "black",
        "silver",
        "blue"
      ],
      "mileage": 38,
      "power": 153,
      "speed": 120
    },
    {
      "model": "Honda Civic",
      "year": 2022,
      "price": 25000,
      "color": [
        "red",
        "blue",
        "white"
      ],
      "mileage": 38,
      "power": 174,
      "speed": 130
    },
    {
      "model": "Ford Mustang",
      "year": 2022,
      "price": 40000,
      "color": [
        "yellow",
        "black",
        "red"
      ],
      "mileage": 28,
      "power": 310,
      "speed": 155
    },
    {
      "model": "Toyota Camry",
      "year": 2023,
      "price": 30000,
      "color": [
        "silver",
        "black",
        "gray"
      ],
      "mileage": 39,
      "power": 203,
      "speed": 135
    },
    {
      "model": "Audi A4",
      "year": 2022,
      "price": 42000,
      "color": [
        "silver",
        "black",
        "blue"
      ],
      "mileage": 32,
      "power": 248,
      "speed": 130
    },
    {
      "model": "BMW X5",
      "year": 2023,
      "price": 65000,
      "color": [
        "white",
        "gray",
        "red"
      ],
      "mileage": 26,
      "power": 335,
      "speed": 155
    },
    {
      "model": "Tesla Model 3",
      "year": 2022,
      "price": 45000,
      "color": [
        "black",
        "white",
        "red"
      ],
      "mileage": 124,
      "power": 283,
      "speed": 145
    },
    {
      "model": "Mercedes-Benz C-Class",
      "year": 2023,
      "price": 55000,
      "color": [
        "silver",
        "blue",
        "gray"
      ],
      "mileage": 35,
      "power": 255,
      "speed": 155
    },
    {
      "model": "Volkswagen Golf GTI",
      "year": 2022,
      "price": 32000,
      "color": [
        "red",
        "black",
        "white"
      ],
      "mileage": 32,
      "power": 228,
      "speed": 155
    }
  ]