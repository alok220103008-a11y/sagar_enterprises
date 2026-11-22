import 'dotenv/config';import {db} from './db.js';
const rows=db.prepare('SELECT id,kind,name,org,phone,email,status,created_at,details FROM requests ORDER BY created_at DESC').all();
console.log(rows.length?'':'No requests yet.');for(const r of rows){console.log(`\n${r.id} [${r.kind}] ${r.created_at}\n${r.name} · ${r.org} · ${r.phone} ${r.email||''}\n${r.details}`)}
