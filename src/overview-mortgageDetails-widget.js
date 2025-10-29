import { renderOverviewSection } from './overview-base.js';

export function renderMortgageDetails(mountEl, mortgageData = {}) {
  if (!mountEl) throw new Error('renderMortgageDetails: mount element not found');
  if (!mortgageData || Object.keys(mortgageData).length === 0) {
    mountEl.insertAdjacentHTML('beforeend', '<p>No mortgage data available.</p>');
    return;
  }

  const fields = [
    { key: 'mortgageType', label: 'Mortgage type' },
    { key: 'requestedAmount', label: 'Requested mortgage amount' },
    { key: 'loanTerm', label: 'Loan term' },
    { key: 'currentValue', label: 'Current property value' },
    { key: 'productName', label: 'Product name' },
    { key: 'loanToValue', label: 'Loan to value' },
    { key: 'rate', label: 'Rate' },
    { key: 'propertyAddress', label: 'Proposed property address' },
  ];

  const tableHTML = `
    <table class="overview-table">
      <tbody>
        ${fields.map(f => `
          <tr>
            <td class="label">${f.label}</td>
            <td>${mortgageData[f.key] || ''}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  renderOverviewSection(mountEl, "Mortgage details", tableHTML);
}
