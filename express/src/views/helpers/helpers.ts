import { Technologies } from './helpersTypes';

export function listTech(tech: Technologies[]) {
  const list = tech
    .filter((p) => p.poweredByNodejs) // ⬅️ só os que usam Node.js
    .map((p) => `<li>${p.name} - ${p.type}</li>`);
  return `<ul>${list.join('')}</ul>`;
}
