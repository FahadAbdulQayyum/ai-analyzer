const { WebSocketServer } = require('ws');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Define the RecentSubscriber sub-schema
const recentSubscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// Define the RevenueData sub-schema
const revenueDataSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
});

// Define the UsersByDevice sub-schema
const usersByDeviceSchema = new mongoose.Schema({
  desktop_users: {
    type: Number,
    required: true,
  },
  phone_app_users: {
    type: Number,
    required: true,
  },
  laptop_users: {
    type: Number,
    required: true,
  },
});

// Define the UsersByCountry sub-schema
const usersByCountrySchema = new mongoose.Schema({
  USA: {
    type: Number,
    required: true,
  },
  UK: {
    type: Number,
    required: true,
  },
  Canada: {
    type: Number,
    required: true,
  },
  Australia: {
    type: Number,
    required: true,
  },
  Spain: {
    type: Number,
    required: true,
  },
});

// Define the main Analytics schema
const analyticsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  live_visits: {
    type: Number,
    required: true,
  },
  monthly_users: {
    type: String,
    required: true,
  },
  new_sign_ups: {
    type: Number,
    required: true,
  },
  subscriptions: {
    type: String,
    required: true,
  },
  total_revenue: {
    type: Number,
    required: true,
  },
  recent_subscribers: {
    type: [recentSubscriberSchema],
    required: true,
  },
  revenue_data: {
    type: [revenueDataSchema],
    required: true,
  },
  users_by_device: {
    type: usersByDeviceSchema,
    required: true,
  },
  users_by_country: {
    type: usersByCountrySchema,
    required: true,
  },
  users_by_country_count: {
    type: Number,
    required: true,
  },
  users_by_device_count: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  collection: 'analytics', // Specify the collection name
});

// Create or retrieve the model
const Analytics = mongoose.models.Analytic || mongoose.model('Analytic', analyticsSchema);

// MongoDB connection logic
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fahad:fahad@contactmanager.abu8h.mongodb.net/smb?retryWrites=true&w=majority';

console.log('...MONGODB_URL...', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');

  // Create a WebSocket server
  const wss = new WebSocketServer({ port: 8080 });

  console.log('WebSocket server is running on ws://localhost:8080');

  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Listen for MongoDB change streams
    const changeStream = Analytics.watch();

    changeStream.on('change', (change) => {
      console.log('Change detected in MongoDB:', change);
      wss.clients.forEach((client) => {
        if (client.readyState === 1) { // Use numeric value for readyState
          client.send(JSON.stringify(change));
        }
      });
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      changeStream.close();
    });
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});



















// // const { WebSocketServer } = require('ws');
// // const mongoose = require('mongoose');
// // const dotenv = require('dotenv');

// // dotenv.config();

// // // Dynamically import the Analytics model
// // let Analytics;
// // import('./src/utils/models/Analytic.js').then((module) => {
// //   Analytics = module.default; // Access the default export

// //   // MongoDB connection logic
// //   const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fahad:fahad@contactmanager.abu8h.mongodb.net/smb?retryWrites=true&w=majority';

// //   console.log('...MONGODB_URL...', MONGODB_URI);

// //   mongoose.connect(MONGODB_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   }).then(() => {
// //     console.log('Connected to MongoDB');

// //     // Create a WebSocket server
// //     const wss = new WebSocketServer({ port: 8080 });

// //     console.log('WebSocket server is running on ws://localhost:8080');

// //     wss.on('connection', (ws) => {
// //       console.log('Client connected');

// //       // Listen for MongoDB change streams
// //       const changeStream = Analytics.watch();

// //       changeStream.on('change', (change) => {
// //         console.log('Change detected in MongoDB:', change);
// //         wss.clients.forEach((client) => {
// //           if (client.readyState === 1) { // Use numeric value for readyState
// //             client.send(JSON.stringify(change));
// //           }
// //         });
// //       });

// //       ws.on('close', () => {
// //         console.log('Client disconnected');
// //         changeStream.close();
// //       });
// //     });
// //   }).catch((err) => {
// //     console.error('Failed to connect to MongoDB:', err);
// //   });
// // }).catch((err) => {
// //   console.error('Failed to load Analytics model:', err);
// // });














// const { WebSocketServer } = require('ws');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv')
// // const Analytics = require('./src/utils/models/Analytic')

// dotenv.config()

// // let MONGODB_URI = process.env.MONGODB_URI || ''
// let MONGODB_URI = "mongodb+srv://fahad:fahad@contactmanager.abu8h.mongodb.net/smb?retryWrites=true&w=majority"

// console.log('...MONGDB_URL...', MONGODB_URI)

// // Connect to MongoDB
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Failed to connect to MongoDB:', err);
// });

// // // Define the schema for your analytics collection
// // const analyticsSchema = new mongoose.Schema({
// //   metric: String,
// //   value: Number,
// //   timestamp: { type: Date, default: Date.now },
// // });

// // const Analytics = mongoose.model('Analytics', analyticsSchema);
// // const Analyt = mongoose.model('Analytics', analy);

// // Create a WebSocket server
// const wss = new WebSocketServer({ port: 8080 });

// console.log('WebSocket server is running on ws://localhost:8080');

// wss.on('connection', (ws) => {
//   console.log('Client connected');



//   // Listen for MongoDB change streams
//   const changeStream = Analytics.watch();

//   changeStream.on('change', (change) => {
//     console.log('Change detected in MongoDB:', change);
//     // Broadcast the change to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify(change));
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//     changeStream.close();
//   });
// });
