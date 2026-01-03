# 🌍 Wanderlust - Travel Accommodation Platform

A full-stack Airbnb-inspired web application for discovering and listing travel accommodations. Built with Node.js, Express, MongoDB, and EJS, featuring user authentication, image uploads, and interactive reviews.

![Node.js](https://img.shields.io/badge/Node.js-22.18.0-green)
![Express](https://img.shields.io/badge/Express-5.1.0-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-orange)

## ✨ Features

### Property Listings
- **Browse Listings** - Explore available properties with detailed information
- **Create Listings** - Host your property with title, description, location, and pricing
- **Edit & Delete** - Full CRUD operations for property owners
- **Image Uploads** - Upload property images via Cloudinary integration
- **Detailed Views** - View comprehensive property information with images

### User Management
- **User Registration** - Secure account creation with Passport.js
- **Authentication** - Login/logout functionality with session management
- **Authorization** - Owner-based permissions for editing and deleting listings
- **User Profiles** - Track user-created listings and reviews

### Reviews & Ratings
- **Add Reviews** - Leave ratings (1-5 stars) and comments on properties
- **Delete Reviews** - Remove your own reviews
- **Review Display** - View all reviews for each listing
- **Validation** - Server-side validation with Joi

### Additional Features
- **Flash Messages** - User-friendly success and error notifications
- **Session Management** - Persistent sessions with MongoDB store
- **Responsive Design** - Mobile-friendly interface
- **Error Handling** - Custom error pages and middleware
- **MVC Architecture** - Clean separation of concerns

## 🏗️ Project Structure

```
wanderlust/
├── app.js                  # Main application file
├── cloudConfig.js          # Cloudinary configuration
├── middleware.js           # Custom middleware (auth, validation)
├── schema.js              # Joi validation schemas
│
├── models/                # Mongoose models
│   ├── listing.js         # Property listing model
│   ├── review.js          # Review model
│   └── user.js            # User model
│
├── controllers/           # Route controllers (MVC)
│   ├── listings.js        # Listing CRUD logic
│   ├── reviews.js         # Review logic
│   └── users.js           # User auth logic
│
├── routes/                # Express routes
│   ├── listing.js         # Listing routes
│   ├── review.js          # Review routes
│   └── user.js            # User routes
│
├── views/                 # EJS templates
│   ├── layouts/           # Layout templates
│   ├── listings/          # Listing views (index, show, new, edit)
│   ├── users/             # User views (login, signup)
│   └── includes/          # Reusable components (navbar, footer)
│
├── public/                # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   └── logo.jpeg          # Brand assets
│
├── utils/                 # Utility functions
│   ├── ExpressError.js    # Custom error class
│   └── wrapAsync.js       # Async error wrapper
│
└── init/                  # Database initialization
    ├── data.js            # Sample data
    └── index.js           # Seed script
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v22.18.0 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary Account** (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

4. **Initialize the database (optional)**
   ```bash
   node init/index.js
   ```
   This will populate your database with sample listings.

5. **Start the application**
   ```bash
   node app.js
   ```
   The server will run on `http://localhost:8080`

## 🔌 API Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Render new listing form (requires login)
- `POST /listings` - Create a new listing (requires login)
- `GET /listings/:id` - View single listing details
- `GET /listings/:id/edit` - Render edit form (requires ownership)
- `PUT /listings/:id` - Update listing (requires ownership)
- `DELETE /listings/:id` - Delete listing (requires ownership)

### Reviews
- `POST /listings/:id/reviews` - Add a review to a listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete a review

### Users
- `GET /signup` - Render signup form
- `POST /signup` - Register new user
- `GET /login` - Render login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
- **Passport-Local-Mongoose** - Local authentication strategy

### Frontend
- **EJS** - Templating engine
- **EJS-Mate** - Layout support for EJS
- **Bootstrap** - CSS framework (via CDN)
- **Custom CSS** - Additional styling

### File Upload & Storage
- **Multer** - File upload middleware
- **Cloudinary** - Cloud image storage
- **multer-storage-cloudinary** - Cloudinary storage engine

### Validation & Security
- **Joi** - Schema validation
- **Express-Session** - Session management
- **Connect-Mongo** - MongoDB session store
- **Connect-Flash** - Flash messages
- **Method-Override** - HTTP verb support

## 📦 Database Models

### Listing Model
```javascript
{
  title: String (required),
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  reviews: [ObjectId] (ref: Review),
  owner: ObjectId (ref: User)
}
```

### Review Model
```javascript
{
  rating: Number (1-5, required),
  comment: String (required),
  author: ObjectId (ref: User),
  createdAt: Date
}
```

### User Model
```javascript
{
  email: String (required, unique),
  username: String (required, unique),
  password: String (hashed)
}
```

## 🔒 Middleware & Security

### Authentication Middleware
- `isLoggedIn` - Ensures user is authenticated
- `isOwner` - Verifies listing ownership
- `isReviewAuthor` - Verifies review authorship

### Validation Middleware
- `validateListing` - Validates listing data with Joi
- `validateReview` - Validates review data with Joi

### Security Features
- Password hashing with Passport-Local-Mongoose
- Session-based authentication
- CSRF protection via session secrets
- HTTP-only cookies
- Server-side validation

## 🌐 Deployment

### Environment Configuration
Set `NODE_ENV=production` in your production environment to:
- Disable `.env` file loading
- Use production database
- Enable security optimizations

### Deployment Platforms
This application can be deployed to:
- **Render** - Full-stack deployment
- **Heroku** - Node.js hosting
- **Railway** - Modern deployment platform
- **DigitalOcean** - VPS hosting

### Pre-deployment Checklist
1. ✅ Set all environment variables
2. ✅ Configure MongoDB Atlas connection
3. ✅ Set up Cloudinary account
4. ✅ Update session secret
5. ✅ Test all routes and functionality
6. ✅ Enable production mode

## 📸 Screenshots

> Add screenshots of your application here to showcase the UI

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Kartik Singhal**

## 🙏 Acknowledgments

- Inspired by Airbnb
- Built with the MERN stack principles
- EJS for server-side rendering
- Cloudinary for image management
- Passport.js for authentication

## 📚 Learning Resources

This project demonstrates:
- MVC architecture in Express.js
- RESTful API design
- User authentication and authorization
- File uploads with Cloudinary
- Server-side validation with Joi
- Session management
- MongoDB relationships and cascading deletes

---

⭐ Star this repository if you find it helpful!
