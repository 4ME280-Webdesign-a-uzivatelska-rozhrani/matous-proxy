const JSONBIN_SECRET_KEY = JSONBIN_KEY;
const BASE_URL = "https://api.jsonbin.io/v3/";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace("/api/", "");
    const method = request.method;

    const init = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_SECRET_KEY,
      },
    };

    if (method !== 'GET') {
      init.body = await request.text();
    }

    const response = await fetch(BASE_URL + path, init);
    return new Response(await response.text(), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
