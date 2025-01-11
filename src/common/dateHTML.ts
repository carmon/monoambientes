export type Mode = 'day' | 'month';
export function getDateHTML(mode: Mode): string {
  if (mode === 'day') {
    return `
      <label>
        Fecha de ingreso<br/>
        <input name="init_date" placeholder="dd-mm-yyyy" type="date" required />
      </label>
      <label>
        Fecha de salida<br/>
        <input name="end_date" placeholder="dd-mm-yyyy" type="date" required />
      </label>
    `
  }
  return `
    <label>
      Fecha de ingreso<br/>
      <input name="init_date" placeholder="dd-mm-yyyy" type="date" required />
    </label>
    <label>
      Cantidad de meses<br/>
      <select name="month_count" required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3 (máximo)</option>
      </select>
    </label>
    <label>
      Fecha de salida<br/>
      <input name="end_date" placeholder="dd-mm-yyyy" type="date" disabled />
    </label>
  `;
}