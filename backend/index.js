// require dependencies
const express = require('express');
const cors = require('cors');
const { generateFile } = require('./generateFile');
const { executePy } = require('./executePy');

// create an Express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// This endpoint takes language and code as input, executes and returns the results
app.post('/run', async (req, res) => {
  const { language = 'py', code } = req.body;
  if (code === undefined) {
    return res.status(400).json({ success: false, error: 'Empty code body' });
  }
  try {
    // takes the input code and saves it to a file
    const filepath = await generateFile(language, code);
    // runs the saved file
    const output = await executePy(filepath);
    return res.json({ filepath, output });
  } catch (err) {
    res.status(500).json({ err });
  }
});
app.listen(8080, () => {
  console.log('Listening on port 8080!');
});
