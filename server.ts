import { WebSocket, Server } from 'ws';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.DB_NAME || '';
const COLLECTION_NAME = process.env.COLLECTION_NAME || '';

// Initialize WebSocket server
const wss = new Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

// Connect to MongoDB
const client = new MongoClient(MONGODB_URI);
async function start() {
    try {
        await client.connect();
        console.log('Connected to MongoDB')
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Watch for changes in the collection
        const changeStream = collection.watch();

        changeStream.on('change', (change) => {
            console.log('Change detected:', change);

            // Broadcast the change to all connected WebSocket clients
            wss.clients.forEach((client: WebSocket) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(change));
                }
            });
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

start();

// Handle WebSocket connections
wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});