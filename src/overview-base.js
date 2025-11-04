/**
 * Base renderer for Overview sections (shared by all widgets).
 * Handles card layout, title, and appending to the container.
 *
 * @param {HTMLElement} mountEl - Container where the section should be appended.
 * @param {string} title - Section title (e.g. "Customer details").
 * @param {string} innerHTML - Inner content (table, list, etc.).
 * @param {Object} [options] - Optional data like status or metadata.
 *   @param {string} [options.status] - Application or section status text.
 *   @param {Array<Object>} [options.additionalData] - Array of key-value pairs to show above table.
 */
export function renderOverviewSection(mountEl, title, innerHTML, options = {}) {
  if (!mountEl) throw new Error('renderOverviewSection: mount element not found');

  const { status, additionalData } = options;

  let statusHTML = '';
  if (status || (additionalData && additionalData.length)) {
    const metaItems = additionalData
      ? additionalData.map(obj => {
        const [key, rawValue] = Object.entries(obj)[0];

        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());

        // Handle object value with { value, timestamp }
        let valueHTML = '';
        if (rawValue && typeof rawValue === 'object' && 'value' in rawValue) {
          const { value, timestamp, labelTimestamp } = rawValue;
          const formattedDate = timestamp
            ? new Date(timestamp).toLocaleString('en-IE', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
            : '';
          valueHTML = `
              <div class="meta-value">${value}</div>
              ${timestamp ? `<div class="meta-timestamp">${labelTimestamp} ${formattedDate}</div>` : ''}
            `;
        } else {
          valueHTML = `<div class="meta-value">${rawValue}</div>`;
        }

        return `
            <li class="meta-item">
              <span class="meta-label">${formattedKey}:</span>
              ${valueHTML}
            </li>
          `;
      }).join('')
      : '';

    statusHTML = `
      <div class="overview-status">
        ${status ? `<h2 class="status-text">${status}</h2>` : ''}
        ${metaItems ? `<ul class="meta-list">${metaItems}</ul>` : ''}
      </div>
    `;
  }

  const html = `
    <section class="overview-card">
      ${statusHTML}
      <h2 class="title">${title}</h2>
      ${innerHTML}
    </section>
  `;

  mountEl.insertAdjacentHTML('beforeend', html);
}
