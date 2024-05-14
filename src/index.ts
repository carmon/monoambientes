import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

interface Link {
  icon: string;
  title: string;
  link: string;
}

interface Settings {
  name: string;
  description: string;
  avatarImage: string;
  links: Link[];
}

const processLink = (link: string) => {
  const match = link.match(/\[\w+\]/);
  if (!match) {
    console.log(`No env var match for link ${link}`);
    return;
  }
  const key = match[0];
  return link.replace(key, process.env[key.replace(/[\[|\]]/g, '')] || '');
}

const renderHTML = (settings: Settings) => `
  <div class='avatar-container'>
  <img src='${settings.avatarImage}' class='avatar' alt='${settings.name}' />
  </div>
  <h1>${settings.name}</h1>
  <span>${settings.description}</span>
  <ul>
    ${settings.links.map(l => `
      <li>
        <img src='${l.icon}' alt='${l.title}' />
        <a href='${processLink(l.link)}' target='_blank'>${l.title}</a>
      </li>
    `).join('')}
  </ul>
`;

fs.readFile('./settings.json', (err, data) => {
  if (err) throw new Error(`ERROR READING JSON [${err.code}]: ${err.message}`);
  const settings: Settings = JSON.parse(data.toString());
  fs.readFile('./src/index.html', (er, data) => {
    if (er) throw new Error(`ERROR READING HTML [${er.code}]: ${er.message}`);
    const rootHtml = data.toString();
    const newHtml = rootHtml.replace('<root>', renderHTML(settings));
    fs.writeFile('./public/index.html', newHtml, (e) => {
      if (e) throw new Error(`ERROR WRITING HTML [${e.code}]: ${e.message}`);
    });
  });
});
