import {useState} from 'react';import {C,wa} from './config';
const V:any={name:(v:string)=>v.trim().length>1,phone:(v:string)=>/^[+]?[\d\s-]{10,14}$/.test(v.trim()),email:(v:string)=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim()),req:(v:string)=>!!v.trim()};
const MSG:any={name:'Enter your full name',phone:'Enter a valid phone number',email:'Enter a valid email',req:'This field is required'};
const F=({id,label,rule,d,set,err,type='text',ta,full}:any)=><div className={full?'full':''}><label htmlFor={id}>{label}</label>{ta?<textarea id={id} rows={3} value={d[id]||''} onChange={e=>set({...d,[id]:e.target.value})}/>:<input id={id} type={type} value={d[id]||''} onChange={e=>set({...d,[id]:e.target.value})} aria-invalid={!!err[id]}/>}<div className="err">{err[id]}</div></div>;
const validate=(d:any,rules:any)=>{const e:any={};for(const k in rules)if(!V[rules[k]](d[k]||''))e[k]=MSG[rules[k]];return e};
async function post(url:string,data:any){const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Could not submit. Please try again or contact us directly.');return j}
const Done=({id,summary}:any)=><div><div className="ok"><b>Submitted successfully.</b> Your reference number is <b>{id}</b>. Our team will contact you.</div><p className="lead">Need a faster response? <a className="more" target="_blank" rel="noopener noreferrer" href={wa(`${summary}\nReference: ${id}`)}>Message us on WhatsApp</a></p></div>;
const Fail=({msg}:{msg:string})=>msg?<div className="note" role="alert" style={{color:'#d6336c'}}>{msg} You can also reach us at {C.phone}.</div>:null;

export function QuoteForm(){
  const [st,setSt]=useState(1);const [d,setD]=useState<any>({svc:[],ptype:'New installation',tl:'Within 1 month',website:''});const [err,setErr]=useState<any>({});const [busy,setBusy]=useState(false);const [fail,setFail]=useState('');const [id,setId]=useState('');
  const steps=['Details','Requirements','Project','Review'];
  const next=async()=>{
    if(st===1){const e=validate(d,{name:'name',org:'req',phone:'phone',email:'email',city:'req'});setErr(e);if(Object.keys(e).length)return}
    if(st===2&&!d.svc.length){setErr({svc:'Select at least one requirement'});return}
    setErr({});if(st<4){setSt(st+1);return}
    setBusy(true);setFail('');try{const r=await post('/api/quote',d);setId(r.id)}catch(x:any){setFail(x.message)}setBusy(false)};
  if(id)return <div className="form"><Done id={id} summary={`Hello Sagar Enterprises, I submitted a quotation request.`}/></div>;
  const tog=(x:string)=>setD({...d,svc:d.svc.includes(x)?d.svc.filter((y:string)=>y!==x):[...d.svc,x]});
  return <div className="form"><div className="prog">{steps.map((s,i)=><i key={s} className={i<st?'on':''}/>)}</div><p style={{color:'var(--mut)',margin:'0 0 18px',fontSize:14}}>Step {st} of 4 – {steps[st-1]}</p>
  {st===1&&<div className="f"><F id="name" label="Full name *" d={d} set={setD} err={err}/><F id="org" label="Company / organization *" d={d} set={setD} err={err}/><F id="phone" label="Phone *" type="tel" d={d} set={setD} err={err}/><F id="email" label="Email *" type="email" d={d} set={setD} err={err}/><F id="city" label="City *" d={d} set={setD} err={err}/></div>}
  {st===2&&<><div className="f">{['CCTV','Fire Alarm','Access Control','Maintenance','Other security requirements'].map(x=><label key={x} className="pill"><input type="checkbox" checked={d.svc.includes(x)} onChange={()=>tog(x)}/>{x}</label>)}</div><div className="err">{err.svc}</div></>}
  {st===3&&<div className="f"><F id="qty" label="Approx. cameras / devices" type="number" d={d} set={setD} err={err}/><F id="loc" label="Branches / locations" type="number" d={d} set={setD} err={err}/>
    <div><label htmlFor="pt">Project type</label><select id="pt" value={d.ptype} onChange={e=>setD({...d,ptype:e.target.value})}>{['New installation','Upgrade','AMC / maintenance','Not sure'].map(x=><option key={x}>{x}</option>)}</select></div>
    <div><label htmlFor="tl">Expected timeline</label><select id="tl" value={d.tl} onChange={e=>setD({...d,tl:e.target.value})}>{['Immediate','Within 1 month','1–3 months','Planning stage'].map(x=><option key={x}>{x}</option>)}</select></div>
    <F id="more" label="Additional requirements" ta full d={d} set={setD} err={err}/></div>}
  {st===4&&<div className="note" style={{margin:0}}>{[['Name',d.name],['Organization',d.org],['Phone',d.phone],['Email',d.email],['City',d.city],['Services',d.svc.join(', ')],['Devices',d.qty],['Locations',d.loc],['Type',d.ptype],['Timeline',d.tl],['Notes',d.more]].filter(x=>x[1]).map(x=><div key={x[0]}><b>{x[0]}:</b> {x[1]}</div>)}</div>}
  <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={d.website} onChange={e=>setD({...d,website:e.target.value})}/>
  <Fail msg={fail}/>
  <div className="row" style={{marginTop:26,justifyContent:'space-between'}}>{st>1?<button className="btn d" onClick={()=>setSt(st-1)}>Back</button>:<span/>}<button className="btn p" disabled={busy} onClick={next}>{busy?'Submitting…':st===4?'Submit enquiry':'Next'}</button></div></div>}

export function ServiceForm(){
  const [d,setD]=useState<any>({type:'CCTV maintenance',website:''});const [err,setErr]=useState<any>({});const [busy,setBusy]=useState(false);const [fail,setFail]=useState('');const [id,setId]=useState('');
  if(id)return <div className="form"><Done id={id} summary="Hello Sagar Enterprises, I raised a service request."/></div>;
  const go=async()=>{const e=validate(d,{name:'name',org:'req',phone:'phone',location:'req',issue:'req'});if(d.email&&!V.email(d.email))e.email=MSG.email;setErr(e);if(Object.keys(e).length)return;
    setBusy(true);setFail('');try{const r=await post('/api/service',d);setId(r.id)}catch(x:any){setFail(x.message)}setBusy(false)};
  return <div className="form"><h2 style={{marginTop:0}}>Service request</h2><div className="f"><F id="name" label="Name *" d={d} set={setD} err={err}/><F id="org" label="Organization / branch *" d={d} set={setD} err={err}/><F id="phone" label="Phone *" type="tel" d={d} set={setD} err={err}/><F id="email" label="Email" type="email" d={d} set={setD} err={err}/>
  <div><label htmlFor="ty">Request type</label><select id="ty" value={d.type} onChange={e=>setD({...d,type:e.target.value})}>{['CCTV maintenance','Fire alarm inspection','Equipment repair','Technical support','AMC service'].map(x=><option key={x}>{x}</option>)}</select></div>
  <F id="location" label="Site location *" d={d} set={setD} err={err}/><F id="issue" label="Describe the issue *" ta full d={d} set={setD} err={err}/></div>
  <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={d.website} onChange={e=>setD({...d,website:e.target.value})}/><Fail msg={fail}/>
  <div style={{marginTop:24}}><button className="btn p" disabled={busy} onClick={go}>{busy?'Submitting…':'Submit request'}</button></div></div>}
