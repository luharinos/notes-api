import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

const db = new LowSync(new JSONFileSync('./src/database/data.json'), { notes: [] });
db.read();
export default db;
