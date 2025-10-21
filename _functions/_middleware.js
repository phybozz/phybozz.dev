export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.slice(4);
    return Response.redirect(url.href, 301);
  }

  if (url.pathname.endsWith(".html")) {
    url.pathname = url.pathname.slice(0, -5);
    return Response.redirect(url.href, 301);
  }

  return context.next();
}
