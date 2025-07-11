import { validateApiKey } from '../lib/validateApiKey.mjs';
import { setCorsHeaders } from '../lib/cors.mjs';

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { site_url, pages, api_key } = req.body || {};

    if (!site_url || !Array.isArray(pages) || !api_key) {
      return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    if (!validateApiKey(api_key)) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // Your business logic here
    return res.status(200).json({
      message: 'Data received',
      site_url,
      pages
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
} 