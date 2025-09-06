import * as fs from 'fs/promises';

import { getUnitPrices } from '../backend/rooms.ts';

const ENV: Record<string, string> = {};
const getEnv = (key: string) => isLocal ? ENV[key] : process.env[key];

const isLocal = process.env.NODE_ENV === 'development';
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

async function generateHTML() {
  const packageJSON = (await fs.readFile('./package.json')).toString();
  const match = packageJSON.match(/"version": "([0-9\.]+)",/);
  const version = match ? match[1] : '0.0.1';
  
  const baseHTML = (await fs.readFile('./src/build/base.html')).toString();
  const newHTML = baseHTML
    .replace(
      '// [INSERT_ROOM_DATA]',
      `const PRICES = ${JSON.stringify(await getUnitPrices(getEnv('NT_BLOCK'), getEnv('NT_TOKEN')))};`
    )
    .replace(
      '<root>', 
      `<span class="header">MONOAMBIENTES ORLANDO</span>
      <p class="subheader">ALQUILER DE MONOAMBIENTES EN PLAYA UNIÓN</p>
      <details class="section" hx-get="/api/htmx/mapbox" hx-trigger="click once" hx-target="#mapbox">
        <summary>Ubicación</summary>
        <div id="mapbox" />
      </details>
      <details class="section" hx-get="/api/htmx/table" hx-trigger="click once" hx-target="#tbody">
        <summary>Disponibilidad y Tarifas</summary>
        <table class="room-table">
          <thead>
            <th>Departamento</th>
            <th>Capacidad</th>
            <th>Precio</th>
          </thead>
          <tbody id="tbody" />
        </table>
        <div class="annotations">
          <p>Todos los departamentos son amoblados y tienen todos los servicios incluídos.</p>
          <p>Los alquileres <u>mensuales</u> requieren un depósito de 1 mes para ocuparlos.</p>
          <p>Los alquileres <u>diarios</u> vienen con ropa de cama, utensilios y toallas incluídas.</p>
        </div>
      </details>
      <details class="section">
        <summary>Reservar</summary>
        <div class="reservation">
          <form hx-post="/api/make-reservation">
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
              <select name="mode" hx-get="/api/htmx/form" hx-target="#form" hx-trigger="change" disabled>
                <option value="day">Diario</option>
                <option value="month">Mensual</option>
              </select>
            </label>
            <div id="form" hx-get="/api/htmx/form?mode=day" hx-target="this" hx-trigger="load once"/>
            </fieldset>
          </form>
        </div>
      </details>
      <details class="section">
        <summary>Contacto</summary>
        <div class="contacts">
          <a href='https://instagram.com/${getEnv('IG_USER')}' target='_blank' title='Instagram'>${(await fs.readFile('./embed/instagram.svg')).toString()}</a>
          <a href='mailto:${getEnv('MAIL_TO')}' target='_blank' title='Email'>${(await fs.readFile('./embed/email.svg')).toString()}</a>
        </div>
      </details>
      <footer>
        Monoambientes v${version} - ©Copyright 2025 - Todos los derechos reservados
      </footer>`
    );
  // if (isLocal) console.log(newHTML);
  await fs.writeFile('./public/index.html', newHTML);
}
console.log('PRELOAD::: Generating public/index.html');
generateHTML();