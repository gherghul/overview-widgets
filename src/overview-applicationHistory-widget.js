import { renderOverviewSection } from './overview-base.js';

/**
 * Renders the Application History widget.
 * @param {HTMLElement} mountEl - Container where this section will be appended.
 * @param {Array<Object>} history - Array of objects with { stage, status, date }
 */
export function renderApplicationHistory(mountEl, history = []) {
  if (!mountEl) throw new Error('renderApplicationHistory: mount element not found');
  if (!Array.isArray(history) || history.length === 0) {
    mountEl.insertAdjacentHTML('beforeend', '<p>No application history available.</p>');
    return;
  }

  // Build the table rows
  const tableRows = history.map(item => `
    <tr>
      <td class="label">${item.stage || ''}</td>
      <td>${item.status || ''}</td>
      <td>${item.date || ''}</td>
    </tr>
  `).join('');

  // Full table structure
  const tableHTML = `
    <table class="overview-table">
      <thead>
        <tr>
          <th>Stage</th>
          <th>Status</th>
          <th>Date/ Time</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  renderOverviewSection(mountEl, 'Application history', tableHTML);
}
