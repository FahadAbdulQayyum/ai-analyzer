```markdown
# WeeShare Full-Stack Project

This project is a full-stack application developed using **Next.js** (with TypeScript) for **WeeShare**, a platform that allows users to manage and explore content, subscriptions, and user statistics. The application is styled using Tailwind CSS and includes custom fonts for an enhanced user experience. The backend is integrated into the Next.js API routes, ensuring a seamless full-stack development experience.

## Project Functionalities

The **WeeShare** platform includes the following key features:

- **Sign In / Sign Up**: Users can create an account or log in to access exclusive features.
- **Logout**: Securely log out of the application when done.
- **Fetch User Data**: Retrieve comprehensive user-related information, including:
  - Subscriptions: View all subscribed users.
  - Subscribers: Check who has subscribed to your profile.
  - Users by Country: Explore user distribution across different countries.
  - Total Users: Get an overview of the total number of registered users on the platform.
- **Browse Blogs**: Access and read all available blogs on the platform.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/[your-repo-url]/weeshare.git
   cd weeshare
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   DATABASE_URL=your_database_connection_string_here
   JWT_SECRET=your_jwt_secret_key_here
   ```
   Ensure you replace `your_database_connection_string_here` and `your_jwt_secret_key_here` with actual values.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Backend API Endpoints

- **POST `/api/auth/signup`**: Registers a new user with the provided credentials.
- **POST `/api/auth/signin`**: Authenticates a user and generates a JWT token for session management.
- **POST `/api/auth/logout`**: Logs out the user by invalidating the session or JWT token.
- **GET `/api/users/subscriptions`**: Fetches the list of users the current user is subscribed to.
- **GET `/api/users/subscribers`**: Fetches the list of users who have subscribed to the current user.
- **GET `/api/users/by-country`**: Retrieves the distribution of users by country.
- **GET `/api/users/total`**: Returns the total number of registered users on the platform.
- **GET `/api/blogs`**: Fetches all available blogs for display in the Blog Section.

## Custom Fonts

The project uses custom fonts defined in the `globals.css` file. Ensure that the font files are placed in the correct directory (`/fonts/`).

## TypeScript Integration

The entire application is built using TypeScript, ensuring type safety and better developer experience. Key TypeScript features include:
- **Type Definitions**: Used extensively in API responses, user data models, and component props.
- **Interfaces**: Defined for consistent data structures across the frontend and backend.
- **Error Handling**: Type-safe error handling mechanisms are implemented for API calls.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
```