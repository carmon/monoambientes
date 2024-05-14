export async function GET() {
  return new Response(`
    <iframe
      width="100%" 
      height="500px" 
      src="https://api.mapbox.com/styles/v1/${process.env.MB_STYLE}.html?title=false&access_token=${process.env.MB_TOKEN}&zoomwheel=false#13.13/-43.317/-65.05"
      title="Monoambientes" 
      style="border:none;"
    ></iframe>
  `);
}