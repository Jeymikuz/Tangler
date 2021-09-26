# Tangler -  order management system

An application that helps e-commerce companies to manage their ordering processes. It provides assistance in the process of collecting and packing orders.

![](https://i.imgur.com/2pPQOXX.png)

## Technologies

### Asp.net Core 5 Web Api v5.0.401
* Entity Framework Core
* MediatR
* AutoMapper
* FluentValidation
* xUnit

### ⚛ React v17.0.2
* React Router
* Mobx
* Axios
* Semantic UI
* Formik with Yup

### Database 
* 🐘Postgresql


## Implemented Features
- Order list depends on status
- Order details
- Login system with jwt token

## To do
- Adding an order manually
- Account registration (frontend)
- Connecting accounts from sales platforms for automatic retrieval of orders
- Manage statuses (add,edit,delete)
- Generate invoice and receipt
- Creating waybills for orders
- Subaccounts for a company with credentials
- Sending automatic emails depending on the status of an order
- External API for users

## Usage

Clone this repo to desktop and in API folder change `connection string` to you database(Postgresql).
After that in API folder run `dotnet run`. It will apply database migration and run at `localhost:5000`.
Then go to client-app folder and run `npm install`. If you changed port to api you have to change url in `.env.development`. Now you can run `npm start` to start app, it will run on `localhost:3000`. 

## Preview

#### Login
![](https://i.imgur.com/FHEkwOo.gif)



---
#### Order
![](https://i.imgur.com/LxVAi7Q.gif)
![](https://i.imgur.com/8BaOGJm.gif)

#### Current endpoints
![](https://i.imgur.com/ocBqsQJ.png)
