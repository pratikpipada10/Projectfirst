const express = require('express');
const axios = require('axios');
const path = require('path');
const { json } = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  try {
    // Fetch JSON data from the API
    const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
    const jsonData = response.data;
    const products = Object.entries(jsonData.products).map(([key, value]) => {
        return { id: key, ...value };
      });
   
    // Ensure jsonData is an array
    // if (!Array.isArray(jsonData)) {
    //   throw new Error('Invalid data format. Expected an array.');
    // }

    // Sort the data based on descending popularity
    // const sortedData = jsonData.sort((a, b) => b.Popularity - a.Popularity);

    // Render the EJS template with the sorted data
    res.render('products', { products});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
