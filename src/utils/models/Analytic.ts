import mongoose, { Schema, model } from 'mongoose';

// Define the RecentSubscriber sub-schema
const recentSubscriberSchema = new Schema({
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

// Define the RecentSubscriber sub-schema
const IRevenueDataSchema = new Schema({
  // _id: {
  //   type: String,
  //   required: true,
  // },
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
const usersByDeviceSchema = new Schema({
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
const usersByCountrySchema = new Schema({
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
const analyticsSchema = new Schema({
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
    type: [IRevenueDataSchema],
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
const Analytics = mongoose.models.Analytic || model("Analytic", analyticsSchema);


export default Analytics;