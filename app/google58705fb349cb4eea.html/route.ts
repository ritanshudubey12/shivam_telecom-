export function GET() {
  return new Response("google-site-verification: google58705fb349cb4eea.html", {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
