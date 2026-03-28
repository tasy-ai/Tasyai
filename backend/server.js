const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    'https://www.tasyai.com',
    'https://tasyai.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'https://tasyai.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }

        // Dynamically allow any localhost or Vercel deployment URL
        if (origin.startsWith('http://localhost:') || origin.endsWith('.vercel.app') || /https:\/\/tasyai.*\.vercel\.app/.test(origin)) {
            return callback(null, true);
        }

        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);

const io = new Server(server, {
    cors: {
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
            if (origin.startsWith('http://localhost:') || origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com') || /https:\/\/tasyai.*\.vercel\.app/.test(origin)) {
                return callback(null, true);
            }
            console.log('CORS blocked origin:', origin);
            return callback(new Error('Not allowed by CORS'), false);
        },
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ["websocket", "polling"]
});

io.on('connection', (socket) => {
    console.log(`Socket.IO connected: ${socket.id}`);

    socket.on('join_conversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`User ${socket.id} joined conversation: ${conversationId}`);
    });

    socket.on('send_message', async (data) => {
        const { conversationId, sender, text } = data;
        
        if (!text || !text.trim()) return;

        try {
            // Verify sender is part of this conversation
            const conversation = await Conversation.findOne({
                _id: conversationId,
                participants: sender
            });

            if (!conversation) {
                console.error(`Unauthorized socket message attempt by ${sender} in ${conversationId}`);
                return;
            }

            // Save message to DB
            const newMessage = await Message.create({
                conversationId,
                sender,
                text: text.trim()
            });

            // Update conversation last message
            conversation.lastMessage = {
                text: text.trim(),
                sender,
                read: false
            };
            await conversation.save();

            // Broadcast message to everyone in the room EXCEPT the sender
            socket.to(conversationId).emit('receive_message', newMessage);
        } catch (error) {
            console.error('Error saving message via socket:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Socket.IO disconnected: ${socket.id}`);
    });
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
