const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Google Custom Search API Key and Search Engine ID
const GOOGLE_API_KEY = 'AIzaSyAmwufuqv4xW_SWE6MmLA61FjldZGGqFn0';  // Enclose API key in quotes
const SEARCH_ENGINE_ID = '979a83b31c828481d';  // Enclose Search Engine ID in quotes

app.use(express.static('public'));

io.on('connection', (socket) => {
   console.log('New user connected');

   socket.on('search', async (query) => {
      try {
         const results = await searchGoogle(query);
         socket.emit('searchResults', results);
      } catch (error) {
         console.error('Error fetching search results:', error);
         socket.emit('searchResults', []);
      }
   });

   socket.on('disconnect', () => {
      console.log('User disconnected');
   });
});

async function searchGoogle(query) {
   const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyAmwufuqv4xW_SWE6MmLA61FjldZGGqFn0&cx=979a83b31c828481d&q=${query}`;

   const response = await axios.get(url);
   return response.data.items.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet
   }));
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
