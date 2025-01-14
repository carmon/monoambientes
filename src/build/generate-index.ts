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
  const packageJSON = (await fs.readFile('./package.json')).toString();
  const match = packageJSON.match(/"version": "([0-9\.]+)",/);
  const version = match ? match[1] : '0.0.1';
  
  const baseHTML = (await fs.readFile('./src/build/base.html')).toString();
  const newHTML = baseHTML.replace('<root>', `
    <div class="avatar-container">
    <img src="./static/avatar.webp" class="avatar" alt='Monoambientes "Orlando"' />
    </div>
    <span class="header">Monoambientes "Orlando"</span>
    <p>Alquiler de monoambientes para 1, 2 y 3 personas en Playa Unión</p>
    <details class="section" hx-get="/api/htmx/mapbox" hx-trigger="click once" hx-target="#mapbox">
      <summary>Ubicación</summary>
      <div id="mapbox" />
    </details>
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
          <fieldset>
          <legend>Contacto</legend>
          <label>Nombre completo <input name="name" type="text" required /></label>
          <label>Email <input name="email" type="text" required /></label>
          <label>Telefono <input name="tel" type="text" required /></label>
          </fieldset>
          <fieldset>
          <legend>Reserva</legend>
          <label>
            Modalidad
            <select name="mode" hx-get="/api/reservation/dates" hx-target=".date-pickers" hx-trigger="change">
              <option value="day">Diario</option>
              <option value="month">Mensual</option>
            </select>
          </label>
          <label>
            Departamento
            <select name="room" hx-get="/api/room/availables" hx-trigger="load once">
            </select>
          </label>
          ${getDateHTML('day')}
          <label>Precio final (aproximado) <input id="price" type="text" disabled /></label>
          </fieldset>
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
      Monoambientes v${version} - ©Copyright 2025 - Todos los derechos reservados
    </footer>
  `).replaceAll('\n','');
  if (isLocal) console.log(newHTML);
  await fs.writeFile('./public/index.html', newHTML);
}
console.log('PRELOAD::: Generating public/index.html');
generateHTML();