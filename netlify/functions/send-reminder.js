// Netlify Scheduled Function: invia push giornaliera
import { schedule } from '@netlify/functions';
import webpush from 'web-push';

const VAPID_PUBLIC = process.env.VAPID_PUBLIC;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE;
webpush.setVapidDetails('mailto:you@example.com', VAPID_PUBLIC, VAPID_PRIVATE);

// ATTENZIONE: memoria volatile. Usa un DB per persistenza vera.
let subs = [];

export const handler = schedule('0 18 * * *', async (event) => {
  const payload = JSON.stringify({ title: 'Promemoria obiettivi', body: 'Hai un obiettivo oggi. Vai a completarlo!' });
  const jobs = subs.map(s => webpush.sendNotification(s, payload).catch(()=>null));
  await Promise.allSettled(jobs);
  return { statusCode: 200, body: 'Sent' };
});
