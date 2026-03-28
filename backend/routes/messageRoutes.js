const express = require('express');
const router = express.Router();
const {
    getConversations,
    getOrCreateConversation,
    getOrCreateUserConversation,
    getMessages
} = require('../controllers/messageController');
const protect = require('../middleware/authMiddleware');

router.get('/conversations', protect, getConversations);
router.post('/conversation', protect, getOrCreateConversation);
router.post('/user-conversation', protect, getOrCreateUserConversation);
router.get('/:conversationId', protect, getMessages);

module.exports = router;
