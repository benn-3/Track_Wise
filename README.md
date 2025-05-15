# Track_Wise

Track_Wise is a comprehensive training management system designed to streamline the creation, management, and tracking of training programs and trainer assignments. It offers a user-friendly interface for admins and trainers to collaborate efficiently and monitor program progress.

---

## Features

### Program Management
- Create and manage training programs with details like:
  - Name, Description, Dates, Venue, and Location.
  - Add and track tasks with completion statuses.
  - Assign programs to specific trainers.
  - Export program data as CSV files.

### Trainer Management
- Add, update, and remove trainer profiles.
- Track trainer availability and assigned programs.

### Dashboards
- **Admin Dashboard**:
  - Monitor upcoming programs, trainer assignments, and completion rates.
- **Trainer Dashboard**:
  - View assigned programs, manage tasks, and mark tasks as completed.

### Authentication
- Secure authentication system using JWT tokens.
- Role-based access for admins and trainers.

---

## Technologies Used

### Front-End
- **React**: For building interactive user interfaces.
- **Vite**: A lightweight and fast development server with hot module replacement (HMR).
- **CSS**: For styling the interface.

### Back-End
- **Node.js**: For server-side operations.
- **Express.js**: For handling API routes and middleware.
- **MongoDB**: For storing program and trainer data.

### Tools and Libraries
- **Redux**: For state management.
- **JWT**: For secure authentication.
- **Mongoose**: For managing MongoDB schemas and interactions.

---

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/benn-3/Track_Wise.git
   cd Track_Wise
   ```

2. **Install dependencies**:
   - For the client:
     ```bash
     cd client
     npm install
     ```
   - For the server:
     ```bash
     cd server
     npm install
     ```

3. **Start the application**:
   - Run the client:
     ```bash
     npm run dev
     ```
   - Run the server:
     ```bash
     npm start
     ```

4. **Environment Variables**:
   - Set up a `.env` file in the `server` directory with the following variables:
     ```
     JWT_SECRET_KEY=your_secret_key
     MONGO_URI=your_mongodb_connection_string
     ```

---

## Usage

1. **Admin**:
   - Log in as an admin to create, manage, and monitor training programs and trainers.
   - Access the dashboard to export data and track program progress.

2. **Trainer**:
   - Log in as a trainer to view assigned programs.
   - Mark tasks as completed and monitor task schedules.

---

## Contributing

Contributions are welcome! If you’d like to contribute, please fork the repository and make your changes via pull requests.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contact

For any questions or feedback, feel free to contact [benn-3](https://github.com/benn-3).

---

Feel free to customize this README further to match the exact vision and needs of your project!
