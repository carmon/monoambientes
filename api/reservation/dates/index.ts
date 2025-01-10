export async function GET(req: Request) {
  const [, mode] = req.url.match(/\?mode=([a-z]+)$/);
  if (mode === 'day') {
    return new Response(`
      <label>
        Fecha de ingreso<br/>
        <input name="init_date" type="date" />
      </label>
      <label>
        Fecha de salida<br/>
        <input name="end_date" type="date" />
      </label>
    `);
  }
  return new Response(`
    <label>
      Fecha de ingreso<br/>
      <input name="init_date" type="date" />
    </label>
    <label>
      Cantidad de meses<br/>
      <select name="month_count">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3 (máximo)</option>
      </select>
    </label>
    <label>
      Fecha de salida<br/>
      <input name="end_date" type="date" disabled />
    </label>
  `);
}