// ===== EDIT HERE: all company information lives in this file =====
// NOTE: phone, WhatsApp, email and address below are SAMPLE values. Replace them with real ones.
export const C = {
  name: 'Sagar Enterprises',
  tagline: 'Intelligent Security. Reliable Protection.',
  phone: '+91 9754029580',
  whatsapp: '919754029580', // digits only, with country code
  email: 'info@sagarenterprises.example',
  address: 'Office address, City, State – PIN',
  founder: { name: '  Amar Singh Chaudhary', role: 'Founder', photo: '/Confident South Asian Business Portrait.png' }, // put the photo at public/founder.jpg
  stats: [] as { label: string; value: number; suffix?: string }[], // add only real figures
  certifications: [] as string[],
  projects: [] as any[], // real projects: {title,industry,location,service,cat,desc,pts}
}
export const wa = (t: string) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t)}`
