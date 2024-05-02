require('dotenv').config();
const express = require('express');
const notesRouter = require('./router');

const app = express();

app.use(express.json());

// context path - "api/notes"
app.use('/api/notes', notesRouter);

// Default route
app.get('/health', (req, res) => {
	res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Aye Aye, Captain! Ships docked on port ${PORT}`));
