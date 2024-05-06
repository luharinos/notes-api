import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

const db = new LowSync(new JSONFileSync('./database/data.json'), { notes: [] });
db.read();
export default db;
