export type Mode = 'day' | 'month';
export function getDateHTML(mode: Mode): string {
  const today = new Date();
  today.setDate(today.getDate() + 3);
  const future = new Date();
  future.setDate(today.getDate() + 90);
  const min = `${today.getFullYear()}-${(today.getMonth()+1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}-${today.getDate()}`;
  const max = `${future.getFullYear()}-${(future.getMonth()+1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}-${future.getDate()}`;
  if (mode === 'day') {
    return `
      <label>
        Fecha de ingreso
        <input name="init_date" type="date" min="${min}" max="${max}" required />
      </label>
      <label>
        Fecha de salida
        <input name="end_date" type="date" min="${min}" max="${max}" required />
      </label>
    `
  }
  return `
    <script>
      const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28, 31];
      function setEndDate(){
        const initDate = document.getElementById('init_date').value;
        const monthCount = document.getElementById('month_count').value;
        if (initDate && monthCount) {
          const d = new Date(initDate);
          const days = monthDays.slice(d.getMonth(), d.getMonth() + monthCount).reduce((p, c) => p + c, 0);
          d.setDate(d.getDate() + days);
          const st = d.getFullYear()+'-'+(d.getMonth()+1).toLocaleString('en-US', { minimumIntegerDigits: 2 })+'-'+d.getDate();
          document.getElementById('end_date').value = st;
        }
      }
    </script>
    <label>
      Fecha de ingreso
      <input id="init_date" onchange="setEndDate()" name="init_date" type="date" min="${min}" max="${max}" required />
    </label>
    <label>
      Cantidad de meses
      <select id="month_count" onchange="setEndDate()" name="month_count" required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3 (máximo)</option>
      </select>
    </label>
    <label>
      Fecha de salida<br/>
      <input id="end_date" name="end_date" type="date" disabled />
    </label>
  `;
}