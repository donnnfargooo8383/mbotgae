export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const workerURL = `https://tradingview-tools.donnnfargooo8383.workers.dev/api/data?${url.searchParams.toString()}`;
  
  try {
    const response = await fetch(workerURL);
    
    // Clone response untuk modifikasi header
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    
    return new Response(response.body, {
      status: response.status,
      headers: headers
    });
  } catch (error) {
    return new Response('Proxy error', { status: 500 });
  }
}