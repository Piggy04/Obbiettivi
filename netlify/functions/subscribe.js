// Netlify Function: salva la subscription
import { Handler } from '@netlify/functions';

let subs = []; // in memoria; per produzione usa un DB (Fauna, Supabase, ecc.)

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const sub = JSON.parse(event.body || '{}');
    subs.push(sub);
    return { statusCode: 201, body: 'OK' };
  } catch (e) {
    return { statusCode: 400, body: 'Bad Request' };
  }
};
