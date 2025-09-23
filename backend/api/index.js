// Vercel serverless function entry point
const app = require('../dist/app.js');

// Handle both CommonJS and ES module exports
const handler = app.default || app;

module.exports = handler;