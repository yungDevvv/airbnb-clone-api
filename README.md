# Airbnb Clone Project

## Description
This is a full-stack web application project that serves as a clone of Airbnb. It allows users to search for and book accommodations, similar to Airbnb. Users can browse through a variety of listings, view details about properties, make reservations, and more. The project is built to demonstrate proficiency in full-stack web development.

Perhaps it was a mistake for a novice full-stack programmer to do such an almost big project. At the end i was not implementing some features that i thougth about. A lot of time was spent designing the project, thinking about the design, creating custom components, and the logic of how everything should work (that’s why I didn't started doing responsive design). And i think it's enough to show my fullstack development progress.  During the development of this project and its design, I learned a lot of new things and a lot of useful things for future projects. 

I will approach the next project more attentively and use all the knowledge and experience accumulated during the creation of this project.

## Good to know
  - No responsive design
  - Some of amenities doesn't actually match
  - Some forms don't have strong validation logic
  - I'm aware that my CSS code and its structure are far from ideal in this context. I should be using Tailwind for this, I hope you won't judge my CSS too harshly. I haven't spent much time on css
## Demo
You can access a live demo of this project at https://airbnb-clone-client.onrender.com/.
## Features
- User Authentication
- Property Listings
- Search and Filters
- Creating / Editing / Deleting property
- Creating / Editing / Deleting reservation
- Booking

## API Documentation
### Auth endpoints
[![POST](https://img.shields.io/badge/POST-Green.svg)](URL) **/api/auth/register** User registration
<br>
```json
{
  "first_name": "Thomas",
  "last_name": "Smith",
  "email": "admin",
  "password": "admin"
}
```

[![POST](https://img.shields.io/badge/POST-Green.svg)](URL) **/api/auth/login** User login
<br>
```json
{
  "email": "admin",
  "password": "admin"
}
```
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/auth/logout** Logout user

### User endpoints
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/users**  Get all users <br>
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/users/:id**  Get user by id <br>
[![DELETE](https://img.shields.io/badge/DELETE-Red?style=flat&color=red&logo=http&logoColor=white)](URL) **/api/users/:id** Delete user by id <br>
[![PUT](https://img.shields.io/badge/PUT-Light%20Green?style=flat&color=lightgreen&logo=http&logoColor=white)](URL) **/api/users/:id** Get user by id and update information ( not ready yet ) 

### House endpoints
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/houses**  Get all houses <br>
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/houses/:id**  Get house by id <br>
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/houses/countHousesByFilter**  Get count of houses with filters <br>
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/houses/getUserHouses/:id**  Get owner user's houses <br>
[![POST](https://img.shields.io/badge/POST-Green.svg)](URL) **/api/houses** Create house <br>
```json
{
  "country": "finland",
  "city": "lahti",
  "zip": "15240",
  "state": "uusimaa",
  "address": "sibeliuksenkatu 12 A",
  "bathrooms": 1,
  "beds": 4,
  "bedrooms": 1,
  "guests": 4,
  "title": "Beautiful house",
  "short_title": "beautifully located cottage in the Finnish countryside",
  "description": "Description about your house",
  "images": [
    "http://res.cloudinary.com/semtest/image/upload/v1696863905/upload/x.jpg",
    "http://res.cloudinary.com/semtest/image/upload/v1696863905/upload/x.jpg"
  ],
  "comforts": [
    "fire_pit",
    "outdoor_shower",
    "mountain_view"
  ]
  "price": "100"
}
```
[![POST](https://img.shields.io/badge/POST-Green.svg)](URL) **/api/houses/checkAvailability/:id** Check if house available with passed dates 
<br>
```json
{
  "dates": [
    "2023-12-13T22:00:00.000Z",
    "2023-12-14T22:00:00.000Z",
    "2023-12-15T22:00:00.000Z"
  ]
}
```
[![POST](https://img.shields.io/badge/POST-Green.svg)](URL) **/api/houses/deleteImage** Delete image from object and also from Cloudinary  <br>
```json
{
  "public_id": "x", // a public_id of image
  "house_id": "x",
  "img": "http://res.cloudinary.com/semtest/image/upload/v1696863905/upload/x.jpg"
}
```
[![DELETE](https://img.shields.io/badge/DELETE-Red?style=flat&color=red&logo=http&logoColor=white)](URL) **/api/houses/:id**  Delete user by id and also delete house's images from Cloudinary <br>
[![PUT](https://img.shields.io/badge/PUT-Light%20Green?style=flat&color=lightgreen&logo=http&logoColor=white)](URL) **/api/houses/:id**  Get house by id and update <br> 
```json
{
  "country": "finland",
  "city": "lahti",
  "zip": "15240",
  "state": "uusimaa",
  "address": "sibeliuksenkatu 12 A",
  "bathrooms": 1,
  "beds": 4,
  "bedrooms": 1,
  "guests": 4,
  "title": "Beautiful house",
  "short_title": "beautifully located cottage in the Finnish countryside",
  "description": "Description about your house",
  "images": [
    "http://res.cloudinary.com/semtest/image/upload/v1696863905/upload/x.jpg",
    "http://res.cloudinary.com/semtest/image/upload/v1696863905/upload/x.jpg"
  ],
  "comforts": [
    "fire_pit",
    "outdoor_shower",
    "mountain_view"
  ]
  "price": "100"
}
```
### Reservation endpoints
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/reservations/house/:id**  Get house reservations <br>
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/reservations/user/:id**  Get user reservations <br>
[![GET](https://img.shields.io/badge/GET-Blue?style=flat&color=blue&logo=http&logoColor=white)](URL) **/api/reservations/getCountOfReservations/:id**  Get user reservations with subsections <br>
[![POST](https://img.shields.io/badge/POST-Green.svg)](URL) **/api/reservations** Create reservation <br>
```json
{
  "client": "x", // user_id
  "dates": [
    "2023-12-13T22:00:00.000Z",
    "2023-12-14T22:00:00.000Z",
    "2023-12-15T22:00:00.000Z"
  ],
  "guests": 1,
  "house": "x" // house_id
}
```
[![DELETE](https://img.shields.io/badge/DELETE-Red?style=flat&color=red&logo=http&logoColor=white)](URL) **/api/reservations/:id**  Delete reservation by id and also delete passed dates from house object <br>


## Technologies Used
- Frontend:
  - React.js
  - Zustand for state management
  - Axios for API requests
  - React-datepicker
  - SASS/SCSS
    
- Backend:
  - Node.js with Express.js
  - MongoDB for the database
  - Mongoose for data modeling
  - JWT for authentication
  - RESTful API architecture
    
- Images storage
  - Cloudinary
    
- Deployment:
  - Render.com

