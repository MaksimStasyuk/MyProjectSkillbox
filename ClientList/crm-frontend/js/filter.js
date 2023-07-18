import { findClient } from "./clientsApi.js";
import { createClientItem } from "./main.js";

export const searchClients = (clients) => {
  const input = document.querySelector('.header__input'),
    tbody = document.querySelector('.table__body');
  let valueInterval;

  const rewriteTable = async (str) => {
    const response = await findClient(str);
    tbody.innerHTML = '';

    for (const client of response) {
      tbody.append(createClientItem(client));
    }
  }

  input.addEventListener('input', async () => {
    clearTimeout(valueInterval);

    valueInterval = setTimeout(() => {
      const value = input.value.trim();

      if (value !== '') {
        rewriteTable(value);
      } else {
        tbody.innerHTML = '';
        clients.forEach(client => tbody.append(createClientItem(client)));
      }
    }, 300);
  });
}