/* eslint-disable import/extensions */
import { config } from 'dotenv';
import express from 'express';
import router from './router/notesRouter.js';

config();

const app = express();

app.use(express.json());

// context path - "api/notes"
app.use('/api/notes', router);

// Default route
app.get('/health', (req, res) => {
	res.sendStatus(200);
});

// Start the server
try {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Aye Aye, Captain! Ships docked on port ${PORT}`));
} catch (error) {
	console.error('Error occurred:', error);
	process.exit(1);
}
