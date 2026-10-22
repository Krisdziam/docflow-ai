export function GET(request: Request): Response {
  return Response.redirect(new URL("/uk", request.url), 307);
}
