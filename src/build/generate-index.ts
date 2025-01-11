import * as fs from 'fs/promises';
import { getDateHTML } from '../common/dateHTML.ts';

const isLocal = process.env.NODE_ENV === 'development';

const ENV: Record<string, string> = {};
const getEnv = (key: string) => isLocal ? ENV[key] : process.env[key];

const addSection = (inner: string, title: string) => 
  `<details class="section">
  <summary>${title}</summary>
  ${inner}
  </details>`;

async function generateHTML() {
  if (isLocal) {
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
          <tbody hx-get="/api/room/ranges" hx-trigger="load once">
          </tbody>
        </table>`, 
        'Disponibilidad y Tarifas'
      )}
    ${addSection(
      `<div class="reservation">
        <form hx-post="/api/reservation/make">
          <label>
            Nombre completo<br/>
            <input name="name" type="text" required />
          </label>
          <label>
            Email<br/>
            <input name="email" type="text" required />
          </label>
          <label>
            Telefono<br/>
            <input name="tel" type="text" required />
          </label>
          <label>
            Departamento<br/>
            <select name="room" hx-get="/api/room/availables" hx-trigger="load once">
            </select>
          </label>
          <fieldset>
            <legend>Modalidad</legend>
            <label><input type="radio" name="mode" value="day" checked hx-trigger="click" hx-get="/api/reservation/dates" hx-target=".date-pickers" />Diario</label>
            <label><input type="radio" name="mode" value="month" hx-trigger="click" hx-get="/api/reservation/dates" hx-target=".date-pickers" />Mensual</label>
          </fieldset>
          <div class="date-pickers">
            ${getDateHTML('day')}
          </div>
          <label class="price">
            Precio final (puede variar)<br/>
            <input name="price" type="text" disabled />
          </label>
          <button type="submit">Reservar</button>
        </form>
      </div>`, 
      'Reservar'
    )}
    ${addSection(
      `<div class="contacts">
        <a href='https://instagram.com/${getEnv('IG_USER')}' target='_blank' title='Instagram'>${(await fs.readFile('./src/build/instagram.svg')).toString()}</a>
        <a href='mailto:${getEnv('MAIL_TO')}' target='_blank' title='Email'>${(await fs.readFile('./src/build/email.svg')).toString()}</a>
      </div>`, 
      'Contacto'
    )}
    <footer>
      ©Copyright 2025. Todos los derechos reservados.
    </footer>
  `).replaceAll('\n','');
  if (isLocal) console.log(newHTML);
  await fs.writeFile('./public/index.html', newHTML);
}
console.log('PRELOAD::: Generating public/index.html');
generateHTML();