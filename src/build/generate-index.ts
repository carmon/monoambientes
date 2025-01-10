const fs = require('fs/promises');

const addSection = (inner: string, title: string) => 
  `<details class="section">
  <summary>${title}</summary>
  ${inner}
  </details>`;

const ENV: Record<string, string> = {};
const getEnv = (key: string) => process.env.NODE_ENV === 'development' ? ENV[key] : process.env[key];

async function generateHTML() {
  if (process.env.NODE_ENV === 'development') {
    // Parse .env file
    (await fs.readFile('.env')).toString()
      .split('\n')
      .filter(s => !!s)
      .forEach(s => {
        const [k, v] = s.split('=');
        ENV[k] = v;
      });
  }
  // Load base HTML
  const baseHTML = (await fs.readFile('./src/build/base.html')).toString();
  const newHTML = baseHTML.replace('<root>', `
    <div class="avatar-container">
    <img src="./static/avatar.jpg" class="avatar" alt='Monoambientes "Orlando"' />
    </div>
    <span class="header">Monoambientes "Orlando"</span>
    <marquee>Alquiler de monoambientes para 1, 2 y 3 personas en Playa Unión</marquee>
    ${addSection(`
      <iframe 
        width="100%" 
        height="500px" 
        src="https://api.mapbox.com/styles/v1/carmonmaps/cm5r26fy8003s01rs0a2eh1mt.html?title=false&access_token=${getEnv('MAPS_TOKEN')}&zoomwheel=false#13.13/-43.317/-65.05"
        title="Monoambientes" 
        style="border:none;"
      ></iframe>
      `, 
      'Ubicación'
    )}
    ${addSection(
      `<table class="mono-table">
          <thead>
            <th>Unidad</th>
            <th>Capacidad</th>
            <th>Precio</th>
          </thead>
          <tbody hx-get="/api/mono/ranges" hx-trigger="load once">
          </tbody>
        </table>`, 
        'Disponibilidad y Tarifas'
      )}
    ${addSection(
      `<div class="reservation">
        <form hx-post="/api/make-reservation">
          <label>
            Nombre completo<br/>
            <input id="name" type="text" />
          </label>
          <label>
            Email<br/>
            <input id="email" type="text" />
          </label>
          <label>
            Telefono<br/>
            <input id="tel" type="text" />
          </label>
          <label>
            Departamento<br/>
            <select hx-get="/api/mono/availables" hx-trigger="load once">
            </select>
          </label>
          <div class="date-pickers">
            <label>
              Fecha de ingreso<br/>
              <input id="init_date" type="date" />
            </label>
            <label>
              Fecha de salida<br/>
              <input id="end_date" type="date" />
            </label>
          </div>
          <button type="submit">Reservar</button>
        </form>
      </div>`, 
      'Reservar'
    )}
    ${addSection(
      `<div class="contacts">
        <a href='https://instagram.com/${getEnv('IG_USER')}' target='_blank' title='Instagram'><img src='static/instagram.svg' alt='instagram' /></a>
        <a href='mailto:${getEnv('MAIL_TO')}' target='_blank' title='Email'><img src='static/email.svg' alt='email' /></a>
      </div>`, 
      'Contacto'
    )}
    <footer>
      ©Copyright 2025. Todos los derechos reservados.
    </footer>
  `);
  await fs.writeFile('./public/index.html', newHTML);
}
console.log('PRELOAD::: Generating public/index.html');
generateHTML();