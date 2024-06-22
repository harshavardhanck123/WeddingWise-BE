# WeddingWise Backend Server API Documentation

This repository contains the backend server for an event management application. It provides APIs for managing users, events, bookings, budgets, and vendors.

## Prerequisites

Before running the server, ensure you have the following installed:

- Node.js (v12 or higher)
- MongoDB

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <repository_directory>

2. **Install dependencies:**

```bash
npm install
Set up environment variables: 
```
3. **Create a .env file in the root directory and provide the following variables:**

MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>


4. **Start the server:**
```bash
npm start
```
## Running the Server

The server should now be running on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

### Users

- **Register User**
  - `POST /api/users/register`: Register a new user.

- **User Login**
  - `POST /api/users/login`: Login as a registered user.

- **User Logout**
  - `POST /api/users/logout`: Logout the current user (requires authentication).

- **Get User Profile**
  - `GET /api/users/profile/:id`: Get profile of a specific user (requires authentication).

### Events

- **Create Event**
  - `POST /api/events/`: Create a new event (requires authentication).

- **Get All Events**
  - `GET /api/events/`: Get all events (requires authentication).

- **Search Events**
  - `GET /api/events/search`: Search events by title, date, or location (requires authentication).

- **Get Event by ID**
  - `GET /api/events/:id`: Get details of a specific event (requires authentication).

- **Update Event**
  - `PUT /api/events/:id`: Update event details (requires authentication and admin access).

- **Delete Event**
  - `DELETE /api/events/:id`: Delete an event (requires authentication and admin access).

### Bookings

- **Create Booking**
  - `POST /api/bookings/`: Create a new booking (requires authentication).

- **Get All Bookings**
  - `GET /api/bookings/`: Get all bookings (requires authentication).

- **Get Booking by ID**
  - `GET /api/bookings/:id`: Get details of a specific booking (requires authentication).

- **Update Booking**
  - `PUT /api/bookings/:id`: Update booking details (requires authentication).

- **Delete Booking**
  - `DELETE /api/bookings/:id`: Delete a booking (requires authentication).

### Budgets

- **Create Budget**
  - `POST /api/budgets/`: Create a new budget entry (requires authentication).

- **Get All Budgets**
  - `GET /api/budgets/`: Get all budget entries (requires authentication).

- **Get Budget by ID**
  - `GET /api/budgets/:id`: Get details of a specific budget entry (requires authentication).

- **Update Budget**
  - `PUT /api/budgets/:id`: Update budget details (requires authentication and admin access).

- **Delete Budget**
  - `DELETE /api/budgets/:id`: Delete a budget entry (requires authentication and admin access).

### Vendors

- **Create Vendor**
  - `POST /api/vendors/`: Create a new vendor (requires authentication).

- **Get All Vendors**
  - `GET /api/vendors/`: Get all vendors (requires authentication).

- **Search Vendors**
  - `GET /api/vendors/search`: Search vendors by name or service type (requires authentication).

- **Get Vendor by ID**
  - `GET /api/vendors/:id`: Get details of a specific vendor (requires authentication and admin access).

- **Update Vendor**
  - `PUT /api/vendors/:id`: Update vendor details (requires authentication and admin access).

- **Delete Vendor**
  - `DELETE /api/vendors/:id`: Delete a vendor (requires authentication and admin access).
## Folder Structure

- `controllers/`: Contains controller functions for each route handling business logic.
- `middleware/`: Custom middleware functions including authentication (`auth.js`).
- `models/`: Mongoose models for defining data structures and interactions with MongoDB.
- `routes/`: Route definitions for various API endpoints (`userRoutes.js`, `eventRoutes.js`, etc.).
- `config/`: Configuration files including database connection setup (`db.js`).

## Contributing

Feel free to fork the repository and submit pull requests for adding features, fixing bugs, or improving documentation.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

