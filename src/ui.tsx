import {Link,NavLink,useLocation} from 'react-router-dom';import {ReactNode,useEffect,useState} from 'react';
import {C,wa} from './config';import {SV,I} from './data';
export const Ic=({k}:{k:string})=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{__html:I[k]}}/>;
export function Seo({t,d}:{t:string;d?:string}){useEffect(()=>{document.title=t;if(d)document.querySelector('meta[name=description]')?.setAttribute('content',d)},[t,d]);return null}
export const PageHead=({t,p}:{t:string;p:string})=><section className="pg"><div className="w"><div className="eyebrow">Sagar Enterprises</div><h1 style={{margin:'10px 0 14px'}}>{t}</h1><p>{p}</p></div></section>;
export const Cta=()=><section className="w sec" style={{paddingTop:0}}><div className="cta rv"><div><h2>Looking for a Reliable Security Solutions Partner?</h2><p className="lead" style={{color:'#b4c1d6'}}>Tell us about your project and our team will help you find the right security solution.</p></div><div className="row"><Link className="btn p" to="/quote">Request a Quote</Link><Link className="btn o" to="/contact">Contact Our Team</Link></div></div></section>;
export const Scope=()=><div className="scope" aria-hidden="true"><svg viewBox="0 0 400 330"><defs><linearGradient id="bm" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#f08a1c" stopOpacity=".5"/><stop offset="1" stopColor="#f08a1c" stopOpacity="0"/></linearGradient></defs><g stroke="#2a3f63"><path d="M0 250h400M0 280h400M60 330L150 190M200 330V190M340 330L250 190"/></g><rect x="40" y="170" width="70" height="80" fill="#13223c" stroke="#2a3f63"/><rect x="290" y="140" width="70" height="110" fill="#13223c" stroke="#2a3f63"/><rect x="130" y="190" width="140" height="60" fill="#182b4a" stroke="#2a3f63"/><g className="beam"><path d="M200 50L90 300H310z" fill="url(#bm)"/></g><rect x="176" y="34" width="48" height="26" rx="6" fill="#0a1424" stroke="#f08a1c" strokeWidth="2"/><circle cx="214" cy="47" r="4" fill="#f08a1c"/><path d="M200 34V24" stroke="#f08a1c" strokeWidth="3"/><g fill="none" stroke="#f08a1c" strokeWidth="2"><path d="M20 20h22M20 20v22M380 20h-22M380 20v22M20 310h22M20 310v-22M380 310h-22M380 310v-22"/></g></svg></div>;
export function Layout({children}:{children:ReactNode}){
  const {pathname,hash}=useLocation();const [open,setOpen]=useState(false);const [wp,setWp]=useState(false);const [svc,setSvc]=useState('CCTV');
  useEffect(()=>{setOpen(false);setWp(false);
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
    const t=setTimeout(()=>document.querySelectorAll('.rv:not(.in)').forEach(e=>io.observe(e)),50);
    if(hash){setTimeout(()=>document.getElementById(hash.slice(1))?.scrollIntoView(),60)}else window.scrollTo(0,0);
    return()=>{clearTimeout(t);io.disconnect()}},[pathname,hash]);
  const L=({to,children}:any)=><NavLink to={to} end className={({isActive})=>isActive?'on':''}>{children}</NavLink>;
  return <>
  <header><div className="w nav"><Link className="brand" to="/" aria-label="Sagar Enterprises home"><img src="/logo.png" alt="Sagar Enterprises logo"/><span>Sagar Enterprises<small>SECURITY &amp; FIRE SAFETY</small></span></Link>
    <button className="burger" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button>
    <nav className={open?'open':''}><L to="/">Home</L><L to="/about">About</L>
      <div className="dd"><button aria-haspopup="true">Services ▾</button><div>{SV.filter((s:any)=>['cctv','fire','access','support'].includes(s.id)).map((s:any)=><Link key={s.id} to={`/services#${s.id}`}>{s.t}</Link>)}</div></div>
      <L to="/projects">Projects</L><L to="/amc">AMC</L><L to="/support">Support</L><L to="/contact">Contact</L>
      <Link className="btn p" to="/quote" style={{marginLeft:8,color:'#1a0d00'}}>Request a Quote</Link></nav></div></header>
  <main>{children}</main>
  <footer><div className="w"><div className="fg">
    <div><div className="brand" style={{color:'#fff',marginBottom:12}}><img src="/logo.png" alt="" style={{height:56}}/><span>Sagar Enterprises</span></div><p>{C.tagline}</p></div>
    <div><h4>Company</h4><Link to="/about">About</Link><Link to="/profile">Company Profile</Link><Link to="/projects">Projects</Link><Link to="/contact">Contact</Link></div>
    <div><h4>Services</h4>{SV.slice(0,5).map((s:any)=><Link key={s.id} to={`/services#${s.id}`}>{s.t}</Link>)}</div>
    <div><h4>Reach us</h4><Link to="/quote">Request a Quote</Link><Link to="/support">Service request</Link><a href={`tel:${C.phone.replace(/\s/g,'')}`}>{C.phone}</a><a href={`mailto:${C.email}`}>{C.email}</a><span>{C.address}</span></div></div>
    <div className="copy">© {new Date().getFullYear()} Sagar Enterprises. All rights reserved.</div></div></footer>
  {wp&&<div className="wap"><h3 style={{margin:'0 0 8px'}}>Chat on WhatsApp</h3><label htmlFor="ws">I need help with</label><select id="ws" value={svc} onChange={e=>setSvc(e.target.value)}>{['CCTV','Fire Alarm','Access Control','Maintenance / AMC','Other'].map(x=><option key={x}>{x}</option>)}</select>
    <a className="btn p" style={{width:'100%',marginTop:14}} target="_blank" rel="noopener noreferrer" href={wa(`Hello Sagar Enterprises, I would like to enquire about your security system services (${svc}).`)}>Open WhatsApp</a></div>}
  <button className="wa" aria-label="Chat on WhatsApp" onClick={()=>setWp(!wp)}>WhatsApp</button></>}
