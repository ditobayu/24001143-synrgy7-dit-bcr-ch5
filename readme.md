## ERD

https://whimsical.com/erd-EEA22qsnnxiqEDUA6aLBvD

## Installation

- Clone this project
- run "npm install"
- run "npm start"

## Table of Endpoints

AUTH

- login => POST /auth/login
- register => POST /auth/register
- logout => POST /auth/logout

CARS

- getCars => GET /cars
- getCarById => GET /cars/:id
- createCar => POST /cars
- updateCar => PUT /cars/:id
- deleteCar => DELETE /cars/:id
- getCarOrders => GET /cars/:id/orders
- getCarOrderById => GET /cars/:id/orders/:orderId

ORDERS

- getOrders => GET /orders
- getOrderById => GET /orders/:id
- createOrder => POST /orders
- updateOrder => PUT /orders/:id
- deleteOrder => DELETE /orders/:id
