export const contentComponentNames = [
  'link',
  'external-link',
  'alert',
  'notification-banner',
  'inset-text',
  'card',
  'status-tag',
  'responsive-table',
  'summary-list',
  'details',
  'pagination',
  'metadata',
  'last-updated',
  'spinner',
  'chip',
  'avatar',
  'warning-text',
  'bar-chart',
  'sortable-table',
] as const;

export type ContentComponentName = (typeof contentComponentNames)[number];

export interface SortableTableOptions {
  root?: ParentNode;
}

type SortDirection = 'ascending' | 'descending';
type SortKind = 'text' | 'numeric';

function readSortValue(cell: Element | null, kind: SortKind): string | number {
  const text = (cell?.textContent ?? '').trim();
  if (kind === 'text') return text.toLocaleLowerCase('ro-RO');
  const numeric = Number.parseFloat(text.replace(/[^\d,.-]/g, '').replace(',', '.'));
  return Number.isFinite(numeric) ? numeric : Number.NEGATIVE_INFINITY;
}

function normalizeFilterText(value: string): string {
  return value
    .toLocaleLowerCase('ro-RO')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Upgrades a plain `.sd-table` into a sortable, filterable one. Without
 * JavaScript the table is already complete and readable — sorting and
 * filtering controls exist only once this enhancement creates them, so
 * there is never a dead input or a button that does nothing.
 */
export function enhanceSortableTables({ root }: SortableTableOptions = {}): () => void {
  const resolvedRoot = root ?? (typeof document === 'undefined' ? null : document);
  if (!resolvedRoot) return () => {};

  const cleanups: Array<() => void> = [];
  for (const wrapper of resolvedRoot.querySelectorAll<HTMLElement>('[data-sd-sortable-table]')) {
    const table = wrapper.querySelector<HTMLTableElement>('table');
    const container = wrapper.querySelector<HTMLElement>('.sd-table-container');
    const tbody = table?.querySelector('tbody');
    const headers = table
      ? [...table.querySelectorAll<HTMLTableCellElement>('thead th[data-sd-sort]')]
      : [];
    if (!table || !container || !tbody || headers.length === 0) continue;

    const originalRows = [...tbody.querySelectorAll<HTMLTableRowElement>(':scope > tr')];
    const headerIndex = [...table.querySelectorAll('thead th')].reduce<Map<Element, number>>(
      (map, th, index) => map.set(th, index),
      new Map(),
    );

    const controls = document.createElement('div');
    controls.className = 'sd-sortable-table__controls';
    const filterId = `${wrapper.id || 'sd-sortable-table'}-filter`;
    controls.innerHTML = `
      <label class="sd-sortable-table__filter-label" for="${filterId}">Filtrează rândurile</label>
      <input class="sd-sortable-table__filter" type="search" id="${filterId}" />
    `;
    const filterInput = controls.querySelector<HTMLInputElement>('input');
    const status = document.createElement('p');
    status.className = 'sd-sortable-table__status';
    status.setAttribute('role', 'status');
    controls.append(status);
    wrapper.insertBefore(controls, container);

    const buttonByHeader = new Map<HTMLTableCellElement, HTMLButtonElement>();
    for (const header of headers) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sd-sortable-table__sort-button';
      button.append(...header.childNodes);
      header.append(button);
      header.setAttribute('aria-sort', 'none');
      buttonByHeader.set(header, button);
    }

    let activeHeader: HTMLTableCellElement | null = null;
    let activeDirection: SortDirection = 'ascending';

    const reportStatus = (message: string) => {
      status.textContent = message;
    };

    const applyFilter = () => {
      const query = normalizeFilterText(filterInput?.value ?? '');
      let visibleCount = 0;
      for (const row of [...tbody.querySelectorAll<HTMLTableRowElement>(':scope > tr')]) {
        const matches = query === '' || normalizeFilterText(row.textContent ?? '').includes(query);
        row.hidden = !matches;
        if (matches) visibleCount += 1;
      }
      const total = originalRows.length;
      reportStatus(
        query === ''
          ? `Se afișează toate cele ${total} de rânduri.`
          : `${visibleCount} din ${total} de rânduri afișate.`,
      );
    };

    const sortBy = (header: HTMLTableCellElement) => {
      const index = headerIndex.get(header);
      if (index === undefined) return;
      const kind = (header.dataset.sdSort as SortKind) ?? 'text';

      activeDirection =
        activeHeader === header && activeDirection === 'ascending' ? 'descending' : 'ascending';
      activeHeader = header;

      for (const otherHeader of headers) {
        otherHeader.setAttribute('aria-sort', otherHeader === header ? activeDirection : 'none');
      }

      const rows = [...tbody.querySelectorAll<HTMLTableRowElement>(':scope > tr')];
      const direction = activeDirection === 'ascending' ? 1 : -1;
      rows.sort((rowA, rowB) => {
        const cellA = rowA.children[index] ?? null;
        const cellB = rowB.children[index] ?? null;
        const valueA = readSortValue(cellA, kind);
        const valueB = readSortValue(cellB, kind);
        if (valueA < valueB) return -1 * direction;
        if (valueA > valueB) return 1 * direction;
        return 0;
      });
      for (const row of rows) tbody.append(row);

      const columnName = header.textContent?.trim() ?? '';
      reportStatus(
        `Sortat după „${columnName}”, ${activeDirection === 'ascending' ? 'crescător' : 'descrescător'}.`,
      );
    };

    const onFilterInput = () => applyFilter();
    filterInput?.addEventListener('input', onFilterInput);

    const buttonHandlers = new Map<HTMLButtonElement, () => void>();
    for (const [header, button] of buttonByHeader) {
      const onClick = () => sortBy(header);
      buttonHandlers.set(button, onClick);
      button.addEventListener('click', onClick);
    }

    cleanups.push(() => {
      filterInput?.removeEventListener('input', onFilterInput);
      for (const [button, onClick] of buttonHandlers) button.removeEventListener('click', onClick);
      controls.remove();
      for (const header of headers) {
        const button = buttonByHeader.get(header);
        if (button) {
          header.append(...button.childNodes);
          button.remove();
        }
        header.removeAttribute('aria-sort');
      }
      tbody.replaceChildren(...originalRows);
      for (const row of originalRows) row.hidden = false;
    });
  }

  return () => {
    for (const cleanup of cleanups.reverse()) cleanup();
  };
}
