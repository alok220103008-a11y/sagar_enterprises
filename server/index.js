import 'dotenv/config';import express from 'express';import helmet from 'helmet';import rateLimit from 'express-rate-limit';
import {z} from 'zod';import crypto from 'node:crypto';import nodemailer from 'nodemailer';import path from 'node:path';import fs from 'node:fs';import {fileURLToPath} from 'node:url';
import {db} from './db.js';
const app=express();app.set('trust proxy',1);
app.use(helmet({contentSecurityPolicy:{directives:{defaultSrc:["'self'"],styleSrc:["'self'","'unsafe-inline'","https://fonts.googleapis.com"],fontSrc:["https://fonts.gstatic.com"],imgSrc:["'self'","data:"],scriptSrc:["'self'"],connectSrc:["'self'"]}}}));
app.use(express.json({limit:'20kb'}));
const limiter=rateLimit({windowMs:15*60*1000,limit:10,standardHeaders:true,legacyHeaders:false,message:{error:'Too many submissions. Please try again later.'}});
const phone=z.string().trim().regex(/^[+]?[\d\s-]{10,14}$/,'Invalid phone number');
const txt=(n)=>z.string().trim().max(n);
const hp=z.string().max(0).optional().or(z.literal(''));
const quote=z.object({name:txt(100).min(2),org:txt(150).min(1),phone,email:z.string().trim().email().max(150),city:txt(100).min(1),
  svc:z.array(z.enum(['CCTV','Fire Alarm','Access Control','Maintenance','Other security requirements'])).min(1),
  qty:txt(10).optional(),loc:txt(10).optional(),ptype:txt(50).optional(),tl:txt(50).optional(),more:txt(2000).optional(),website:hp});
const service=z.object({name:txt(100).min(2),org:txt(150).min(1),phone,email:z.string().trim().email().max(150).optional().or(z.literal('')),
  type:z.enum(['CCTV maintenance','Fire alarm inspection','Equipment repair','Technical support','AMC service']),location:txt(200).min(1),issue:txt(2000).min(1),website:hp});
const newId=(p)=>`${p}-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
const mailer=process.env.SMTP_HOST&&process.env.NOTIFY_EMAIL?nodemailer.createTransport({host:process.env.SMTP_HOST,port:+process.env.SMTP_PORT||587,auth:process.env.SMTP_USER?{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}:undefined}):null;
const insert=db.prepare('INSERT INTO requests(id,kind,name,org,phone,email,details) VALUES(?,?,?,?,?,?,?)');
function handler(kind,prefix,schema){return async(req,res)=>{
  const p=schema.safeParse(req.body);
  if(!p.success){const bad=(req.body&&req.body.website);if(bad)return res.json({ok:true,id:newId(prefix)}); // honeypot: pretend success
    return res.status(400).json({error:p.error.issues[0].path.join('.')+': '+p.error.issues[0].message})}
  const {name,org,phone,email,website,...rest}=p.data;const id=newId(prefix);
  try{insert.run(id,kind,name,org,phone,email||null,JSON.stringify(rest))}catch(e){console.error(e);return res.status(500).json({error:'Could not save your request. Please call us.'})}
  res.json({ok:true,id});
  if(mailer)mailer.sendMail({from:process.env.SMTP_USER||process.env.NOTIFY_EMAIL,to:process.env.NOTIFY_EMAIL,subject:`New ${kind} request ${id}`,text:`${name} (${org})\n${phone} ${email||''}\n\n${JSON.stringify(rest,null,2)}`}).catch(e=>console.error('mail failed',e.message));
}}
app.post('/api/quote',limiter,handler('quote','QT',quote));
app.post('/api/service',limiter,handler('service','SR',service));
const dist=path.join(path.dirname(fileURLToPath(import.meta.url)),'../dist');
if(fs.existsSync(dist)){app.use(express.static(dist));app.get('*',(q,r)=>r.sendFile(path.join(dist,'index.html')))}
const port=process.env.PORT||3001;app.listen(port,()=>console.log(`API on http://localhost:${port}`));
