export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  const type = url.searchParams.get("type");
  const symbol = url.searchParams.get("symbol");
  const timeframe = url.searchParams.get("timeframe");

  if (!type || !symbol) {
    return new Response("Missing parameters", { status: 400 });
  }

  // Proxying request to Cloudflare Worker
  // tradingview-tools.donnnfargooo8383.workers.dev
  const workerURL = `https://tradingview-tools.donnnfargooo8383.workers.dev/api/data?${url.searchParams.toString()}`;
  const response = await fetch(workerURL);
  
  return new Response(response.body, {
    status: response.status,
    headers: response.headers
  });
}


