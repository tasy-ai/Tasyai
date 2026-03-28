const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Company = require('../models/Company');

// @desc    Get all conversations for user
// @route   GET /api/messages/conversations
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const conversations = await Conversation.find({ participants: userId })
        .populate('participants', 'name profilePicture')
        .populate('company', 'name logo role title creator')
        .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
});

// @desc    Get or create conversation with a company
// @route   POST /api/messages/conversation
// @access  Private
const getOrCreateConversation = asyncHandler(async (req, res) => {
    const { companyId } = req.body;
    const userId = req.user._id;

    const company = await Company.findById(companyId);
    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    const companyCreatorId = company.creator;

    // Check if conversation exists
    let conversation = await Conversation.findOne({
        company: companyId,
        participants: { $all: [userId, companyCreatorId] }
    }).populate('participants', 'name profilePicture').populate('company', 'name logo role title creator');

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [userId, companyCreatorId],
            company: companyId
        });
        conversation = await Conversation.findById(conversation._id)
            .populate('participants', 'name profilePicture')
            .populate('company', 'name logo role title creator');
    }

    res.status(200).json(conversation);
});

// @desc    Get or create a direct user-to-user conversation
// @route   POST /api/messages/user-conversation
// @access  Private
const getOrCreateUserConversation = asyncHandler(async (req, res) => {
    const { targetUserId } = req.body;
    const userId = req.user._id;

    if (!targetUserId) {
        res.status(400);
        throw new Error('Target user ID is required');
    }

    // Check if a direct conversation already exists between these two users
    let conversation = await Conversation.findOne({
        company: { $exists: false }, // or null
        participants: { $all: [userId, targetUserId], $size: 2 }
    }).populate('participants', 'name profilePicture');

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [userId, targetUserId]
            // company is deliberately left out/undefined for direct chats
        });
        conversation = await Conversation.findById(conversation._id)
            .populate('participants', 'name profilePicture');
    }

    res.status(200).json(conversation);
});

// @desc    Get messages for a conversation
// @route   GET /api/messages/:conversationId
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
    const { conversationId } = req.params;
    const userId = req.user._id;

    // Security check: verify the user is a participant
    const conversation = await Conversation.findOne({
        _id: conversationId,
        participants: userId
    });

    if (!conversation) {
        res.status(403);
        throw new Error('Not authorized to view this conversation');
    }

    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    
    // Mark messages as read if the current user is not the sender
    await Message.updateMany(
        { conversationId, sender: { $ne: userId }, read: false },
        { read: true }
    );

    res.status(200).json(messages);
});

module.exports = {
    getConversations,
    getOrCreateConversation,
    getOrCreateUserConversation,
    getMessages
};
