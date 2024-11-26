import { checkURL } from './urlCheck';

const form = document.getElementById('form');
//console.log("submit :", handleSubmit);
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    


    // Get the URL from the input field
    const urlText = document.getElementById('url').value;

    // Check if the URL is valid
    if (checkURL(urlText)) {
        try {
            // Await the response from postData to get the result before proceeding
            const response = await postData('/api', { url: urlText });
            console.log('Server Response:', response);

            // Display results to the user
            document.getElementById('results').innerText = JSON.stringify(response, null, 2);
        } catch (error) {
            console.error('Error:', error);
            alert('Error processing your request.');
        }
    } else {
        console.log('Invalid URL');
        alert('Invalid URL');
    }
}

// Function to send data to the server
async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();  // Parse and return the JSON response
    } catch (error) {
        throw error;  // Throw error if something goes wrong with fetch
    }
}

export { handleSubmit };
