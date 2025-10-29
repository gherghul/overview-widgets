import { renderOverviewSection } from './overview-base.js';

/**
 * Renders the Customer Tasks widget.
 * @param {HTMLElement} mountEl - Container element where to append the section.
 * @param {Array<Object>} tasks - Array of task objects.
 */
export function renderCustomerTasks(mountEl, tasks = []) {
  if (!mountEl) throw new Error('renderCustomerTasks: mount element not found');
  if (!Array.isArray(tasks) || tasks.length === 0) {
    mountEl.insertAdjacentHTML('beforeend', '<p>No customer tasks available.</p>');
    return;
  }

  // Build table rows dynamically
  const tableRows = tasks.map(task => `
    <tr>
      <td class="label">${task.title || ''}</td>
      <td>${task.status || ''}</td>
      <td>${task.lastUpdatedDate || ''}</td>
      <td>${task.lastUpdatedBy || ''}</td>
      <td>${task.expiryDate || ''}</td>
    </tr>
  `).join('');

  // Table HTML
  const tableHTML = `
    <table class="overview-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Current status</th>
          <th>Last updated date</th>
          <th>Last updated by</th>
          <th>Expiry date</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  renderOverviewSection(mountEl, 'Customer tasks', tableHTML);
}
