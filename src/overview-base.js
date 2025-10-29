/**
 * Base renderer for Overview sections (shared by all widgets).
 * Handles card layout, title, and appending to the container.
 *
 * @param {HTMLElement} mountEl - Container where the section should be appended.
 * @param {string} title - The section title (e.g., "Customer details").
 * @param {string} innerHTML - Inner HTML content (table, list, etc.).
 */
export function renderOverviewSection(mountEl, title, innerHTML) {
  if (!mountEl) throw new Error('renderOverviewSection: mount element not found');

  const html = `
    <section class="overview-card">
      <h2 class="title">${title}</h2>
      ${innerHTML}
    </section>
  `;

  mountEl.insertAdjacentHTML('beforeend', html);
}
