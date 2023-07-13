const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());


//room
const rooms = [
  {
    name: "Elite",
    seats: 30,
    amenities: "wifi,AC",
    price: 1500,
    roomId: "2001",
    bookingDetails: [
      {
        customerName: "Ramesh",
        date: new Date("2023-07-13"),
        start: "07:00",
        end: "8:00",
        status: "confirmed",
      },
    ],
  },
  {
    name: "Premium",
    seats: 100,
    amenities: "wifi,AC",
    price: 3000,
    roomId: "3001",
    bookingDetails: [
      {
        customerName: "Anitha",
        date: new Date("2023-07-14"),
        start: "16:00",
        end: "17:00",
        status: "Payment Pending",
      },
    ],
  },
  {
    name: "Semi Class",
    seats: 200,
    amenities: "wifi,AC,Food",
    price: 5000,
    roomId: "4001",
    bookingDetails: [
      {
        customerName: "Malathi",
        date: new Date("2023-7-15"),
        start: "17:00",
        end: "18:00",
        status: "Payment Pending",
      },
    ],
  },
];
//set the endpoints
app.get("/", (request, response) => {
  response.send("Welcome To Hall Booking App");
});
// get all rooms

app.get("/api/rooms", (request, response) => {
    response.json(rooms);
  });

  //create a Room
  app.post("/createRoom", (request, response) => {
    rooms.push({
      name: request.body.name,
      seats: request.body.seats,
      amenities: request.body.amenities,
      price: request.body.price,
      roomId: "101",
      bookingDetails: [{}],
    });
    response.status(200).send("Room Created");
  });
  //Book Rooms
  app.post("/bookRoom", (request, response, next) => {
    for (let i = 0; i < rooms.length; i++) {
      console.log("Book");
      if (!(rooms[i].roomId === request.body.roomId)) {
        return response.status(400).send({ error: "Invalid" });
      } else {
        let booking = {
          customerName: request.body.name,
          date: new Date(request.body.date),
          start: request.body.start,
          end: request.body.end,
          status: "confirmed",
        };
        let result = undefined;
        rooms[i].bookingDetails.forEach((book) => {
          if (
            book.date.getTime() == booking.date.getTime() &&
            book.start === booking.start
          ) {
            result = 0;
            console.log("in booking");
          } else {
            result = 1;
            rooms[i].bookingDetails.push(booking);
          }
        });
        if (result) return response.status(200).send("Booking confirmed");
        else
          return response
            .status(400)
            .send({ error: "Please select different time slot" });
      }
    }
  });
  //list the costomers
  app.get("/listCustomer", (request, response) => {
    let customerArray = [];
  
    rooms.forEach((room) => {
      let customerObj = { roomName: room.name };
  
      room.bookingDetails.forEach((customer) => {
        customerObj.customerName = customer.customerName;
        customerObj.date = customer.date;
        customerObj.start = customer.start;
        customerObj.end = customer.end;
  
        customerArray.push(customerObj);
      });
    });
  
    response.send(customerArray);
  });
  //Get all rooms
  app.get("/listRooms", (request, response) => {
    console.log("list rooms");
    response.status(200).send(rooms);
  });
const PORT =3001;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
  