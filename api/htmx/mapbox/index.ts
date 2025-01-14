export async function GET() {
  return new Response(`
    <iframe
      width="100%" 
      height="500px" 
      src="https://api.mapbox.com/styles/v1/carmonmaps/cm5r26fy8003s01rs0a2eh1mt.html?title=false&access_token=${process.env.MAPS_TOKEN}&zoomwheel=false#13.13/-43.317/-65.05"
      title="Monoambientes" 
      style="border:none;"
    ></iframe>
  `);
}