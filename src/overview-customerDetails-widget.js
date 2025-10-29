import { renderOverviewSection } from './overview-base.js';

export function renderCustomerDetails(mountEl, applicants = []) {
  if (!mountEl) throw new Error('renderCustomerDetails: mount element not found');
  if (!Array.isArray(applicants) || applicants.length === 0) {
    mountEl.insertAdjacentHTML('beforeend', '<p>No applicant data available.</p>');
    return;
  }

  const fields = [
    { key: "name", label: "Applicant name" },
    { key: "dob", label: "Date of birth" },
    { key: "address", label: "Current address" },
    { key: "phone", label: "Contact number" },
    { key: "email", label: "Email address" },
  ];

  const tableHTML = `
    <table class="overview-table">
      <thead>
        <tr>
          <th></th>
          ${applicants.map(a => `<th>${a.role}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${fields.map(f => `
          <tr>
            <td class="label">${f.label}</td>
            ${applicants.map(a => `<td>${a[f.key] || ''}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  renderOverviewSection(mountEl, "Customer details", tableHTML);
}
