const socket = io();

// Function to handle searching
function handleSearch() {
    const query = document.getElementById('search').value.trim(); // Get the trimmed query

    // Emit the search query to the server if the query is not empty
    if (query) {
        socket.emit('search', query); // Emit the search event with the query
        document.getElementById('results').innerHTML = 'Searching...'; // Indicate that the search is in progress
    } else {
        // Clear results if the input is empty
        document.getElementById('results').innerHTML = '';
    }
}

// When the search button is clicked
document.getElementById('searchButton').addEventListener('click', handleSearch);

// Listen for search results from the server
socket.on('searchResults', function (results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';  // Clear previous results

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>'; // Inform the user if no results found
    } else {
        results.forEach(result => {
            const item = document.createElement('div');
            item.classList.add('result-item');
            item.innerHTML = `<h3><a href="${result.link}" target="_blank">${result.title}</a></h3><p>${result.snippet}</p>`;
            resultsDiv.appendChild(item);
        });
    }
});
