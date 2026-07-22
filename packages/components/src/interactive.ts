export const interactiveComponentNames = [
  'accordion',
  'dialog',
  'tabs',
  'step-indicator',
  'date-input',
  'autocomplete',
  'file-upload-advanced',
] as const;

export type InteractiveComponentName = (typeof interactiveComponentNames)[number];
export type Cleanup = () => void;

export interface EnhancementOptions {
  root?: ParentNode;
}

function resolveRoot(root?: ParentNode): ParentNode | null {
  if (root) return root;
  return typeof document === 'undefined' ? null : document;
}

function combineCleanups(cleanups: readonly Cleanup[]): Cleanup {
  return () => {
    for (const cleanup of [...cleanups].reverse()) cleanup();
  };
}

export function enhanceAccordions({ root }: EnhancementOptions = {}): Cleanup {
  const resolvedRoot = resolveRoot(root);
  if (!resolvedRoot) return () => {};

  const cleanups: Cleanup[] = [];
  for (const accordion of resolvedRoot.querySelectorAll<HTMLElement>('[data-sd-accordion="single"]')) {
    const details = [...accordion.querySelectorAll<HTMLDetailsElement>(':scope > details')];
    const listeners = details.map((item) => {
      const onToggle = () => {
        if (!item.open) return;
        for (const sibling of details) {
          if (sibling !== item) sibling.open = false;
        }
      };
      item.addEventListener('toggle', onToggle);
      return { item, onToggle };
    });

    cleanups.push(() => {
      for (const { item, onToggle } of listeners) item.removeEventListener('toggle', onToggle);
    });
  }

  return combineCleanups(cleanups);
}

export function enhanceDialogs({ root }: EnhancementOptions = {}): Cleanup {
  const resolvedRoot = resolveRoot(root);
  if (!resolvedRoot) return () => {};

  const cleanups: Cleanup[] = [];
  for (const dialog of resolvedRoot.querySelectorAll<HTMLDialogElement>('[data-sd-dialog]')) {
    if (!dialog.id) continue;

    const triggers = [...resolvedRoot.querySelectorAll<HTMLElement>(`[data-sd-dialog-trigger][aria-controls="${dialog.id}"]`)];
    const closeButtons = [...dialog.querySelectorAll<HTMLElement>('[data-sd-dialog-close]')];
    let returnFocus: HTMLElement | null = null;

    dialog.dataset.sdEnhanced = 'true';

    const openDialog = (event: Event) => {
      event.preventDefault();
      returnFocus = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    };

    const closeDialog = () => {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    };

    const restoreFocus = () => {
      returnFocus?.focus();
      returnFocus = null;
    };

    for (const trigger of triggers) trigger.addEventListener('click', openDialog);
    for (const button of closeButtons) button.addEventListener('click', closeDialog);
    dialog.addEventListener('close', restoreFocus);

    cleanups.push(() => {
      for (const trigger of triggers) trigger.removeEventListener('click', openDialog);
      for (const button of closeButtons) button.removeEventListener('click', closeDialog);
      dialog.removeEventListener('close', restoreFocus);
      delete dialog.dataset.sdEnhanced;
      dialog.removeAttribute('open');
    });
  }

  return combineCleanups(cleanups);
}

export function enhanceTabs({ root }: EnhancementOptions = {}): Cleanup {
  const resolvedRoot = resolveRoot(root);
  if (!resolvedRoot) return () => {};

  const cleanups: Cleanup[] = [];
  for (const group of resolvedRoot.querySelectorAll<HTMLElement>('[data-sd-tabs]')) {
    const tabList = group.querySelector<HTMLElement>('[data-sd-tab-list]');
    const tabs = [...group.querySelectorAll<HTMLButtonElement>('[data-sd-tab]')];
    const panels = [...group.querySelectorAll<HTMLElement>('[data-sd-tab-panel]')];
    if (!tabList || tabs.length === 0 || panels.length === 0) continue;

    tabList.hidden = false;
    tabList.setAttribute('role', 'tablist');

    const activate = (index: number, moveFocus = false) => {
      tabs.forEach((tab, tabIndex) => {
        const selected = tabIndex === index;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panelId = tab.getAttribute('aria-controls');
        const panel = panelId ? panels.find((candidate) => candidate.id === panelId) : undefined;
        if (panel) {
          panel.hidden = !selected;
          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('aria-labelledby', tab.id);
          panel.tabIndex = 0;
        }
      });
      if (moveFocus) tabs[index]?.focus();
    };

    const initial = Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'));
    activate(initial);

    const listeners = tabs.map((tab, index) => {
      const onClick = () => activate(index);
      const onKeyDown = (event: KeyboardEvent) => {
        let nextIndex: number | null = null;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activate(nextIndex, true);
      };
      tab.addEventListener('click', onClick);
      tab.addEventListener('keydown', onKeyDown);
      return { tab, onClick, onKeyDown };
    });

    cleanups.push(() => {
      for (const { tab, onClick, onKeyDown } of listeners) {
        tab.removeEventListener('click', onClick);
        tab.removeEventListener('keydown', onKeyDown);
        tab.removeAttribute('role');
        tab.removeAttribute('aria-selected');
        tab.tabIndex = 0;
      }
      tabList.hidden = true;
      tabList.removeAttribute('role');
      for (const panel of panels) {
        panel.hidden = false;
        panel.removeAttribute('role');
        panel.removeAttribute('aria-labelledby');
        panel.removeAttribute('tabindex');
      }
    });
  }

  return combineCleanups(cleanups);
}

interface AutocompleteOption {
  label: string;
  value: string;
}

export function enhanceAutocompletes({ root }: EnhancementOptions = {}): Cleanup {
  const resolvedRoot = resolveRoot(root);
  if (!resolvedRoot) return () => {};

  const cleanups: Cleanup[] = [];
  for (const container of resolvedRoot.querySelectorAll<HTMLElement>('[data-sd-autocomplete]')) {
    const input = container.querySelector<HTMLInputElement>('[data-sd-autocomplete-input]');
    const menu = container.querySelector<HTMLElement>('[data-sd-autocomplete-menu]');
    const status = container.querySelector<HTMLElement>('[data-sd-autocomplete-status]');
    if (!input || !menu) continue;

    const listId = input.getAttribute('list');
    const datalist = listId ? resolvedRoot.querySelector<HTMLDataListElement>(`#${listId}`) : null;
    if (!datalist) continue;

    const options: AutocompleteOption[] = [...datalist.options].map((option) => ({
      label: option.label || option.value,
      value: option.value,
    }));
    let visible: AutocompleteOption[] = [];
    let activeIndex = -1;

    if (!menu.id) menu.id = `${input.id || 'sd-autocomplete'}-menu`;
    input.removeAttribute('list');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', menu.id);
    input.setAttribute('aria-expanded', 'false');
    menu.setAttribute('role', 'listbox');

    const close = () => {
      menu.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
      activeIndex = -1;
    };

    const selectOption = (option: AutocompleteOption) => {
      input.value = option.value;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      close();
    };

    const setActive = (index: number) => {
      activeIndex = index;
      const optionElements = [...menu.querySelectorAll<HTMLElement>('[role="option"]')];
      optionElements.forEach((element, optionIndex) => {
        const selected = optionIndex === activeIndex;
        element.setAttribute('aria-selected', String(selected));
        if (selected) input.setAttribute('aria-activedescendant', element.id);
      });
    };

    const render = () => {
      const query = input.value.trim().toLocaleLowerCase('ro-RO');
      visible = options
        .filter((option) => option.label.toLocaleLowerCase('ro-RO').includes(query) || option.value.toLocaleLowerCase('ro-RO').includes(query))
        .slice(0, 8);
      menu.replaceChildren();
      activeIndex = -1;

      for (const [index, option] of visible.entries()) {
        const item = document.createElement('div');
        item.id = `${menu.id}-option-${index}`;
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', 'false');
        item.textContent = option.label;
        item.addEventListener('mousedown', (event) => event.preventDefault());
        item.addEventListener('click', () => selectOption(option));
        menu.append(item);
      }

      menu.hidden = visible.length === 0;
      input.setAttribute('aria-expanded', String(visible.length > 0));
      if (status) status.textContent = visible.length === 1 ? '1 sugestie disponibilă.' : `${visible.length} sugestii disponibile.`;
    };

    const onInput = () => render();
    const onFocus = () => render();
    const onBlur = () => window.setTimeout(close, 120);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (menu.hidden) render();
        if (visible.length === 0) return;
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        setActive((activeIndex + delta + visible.length) % visible.length);
        return;
      }
      if (event.key === 'Enter' && activeIndex >= 0) {
        event.preventDefault();
        const option = visible[activeIndex];
        if (option) selectOption(option);
      }
    };

    input.addEventListener('input', onInput);
    input.addEventListener('focus', onFocus);
    input.addEventListener('blur', onBlur);
    input.addEventListener('keydown', onKeyDown);

    cleanups.push(() => {
      input.removeEventListener('input', onInput);
      input.removeEventListener('focus', onFocus);
      input.removeEventListener('blur', onBlur);
      input.removeEventListener('keydown', onKeyDown);
      input.setAttribute('list', listId);
      input.removeAttribute('role');
      input.removeAttribute('aria-autocomplete');
      input.removeAttribute('aria-controls');
      input.removeAttribute('aria-expanded');
      input.removeAttribute('aria-activedescendant');
      menu.removeAttribute('role');
      menu.replaceChildren();
      close();
    });
  }

  return combineCleanups(cleanups);
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 1 }).format(bytes / 1024)} KB`;
  return `${new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 1 }).format(bytes / 1024 ** 2)} MB`;
}

export function enhanceFileUploads({ root }: EnhancementOptions = {}): Cleanup {
  const resolvedRoot = resolveRoot(root);
  if (!resolvedRoot) return () => {};

  const cleanups: Cleanup[] = [];
  for (const container of resolvedRoot.querySelectorAll<HTMLElement>('[data-sd-file-upload]')) {
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');
    const list = container.querySelector<HTMLElement>('[data-sd-file-list]');
    const status = container.querySelector<HTMLElement>('[data-sd-file-status]');
    const dropzone = container.querySelector<HTMLElement>('[data-sd-file-dropzone]') ?? container;
    if (!input || !list) continue;

    let files: File[] = [];

    const writeFiles = () => {
      if (typeof DataTransfer === 'undefined') return;
      const transfer = new DataTransfer();
      for (const file of files) transfer.items.add(file);
      input.files = transfer.files;
    };

    const render = () => {
      list.replaceChildren();
      files.forEach((file, index) => {
        const item = document.createElement('li');
        item.className = 'sd-file-upload__item';
        const label = document.createElement('span');
        label.textContent = `${file.name} — ${formatFileSize(file.size)}`;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'sd-file-upload__remove';
        remove.textContent = `Elimină ${file.name}`;
        remove.addEventListener('click', () => {
          files = files.filter((_, fileIndex) => fileIndex !== index);
          writeFiles();
          render();
          input.focus();
        });
        item.append(label, remove);
        list.append(item);
      });
      if (status) status.textContent = files.length === 1 ? '1 fișier selectat.' : `${files.length} fișiere selectate.`;
    };

    const onChange = () => {
      files = [...(input.files ?? [])];
      render();
    };
    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
      dropzone.dataset.sdDragActive = 'true';
    };
    const onDragLeave = () => delete dropzone.dataset.sdDragActive;
    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      delete dropzone.dataset.sdDragActive;
      const dropped = [...(event.dataTransfer?.files ?? [])];
      if (dropped.length === 0) return;
      files = input.multiple ? [...files, ...dropped] : [dropped[0]].filter((file): file is File => Boolean(file));
      writeFiles();
      render();
    };

    input.addEventListener('change', onChange);
    dropzone.addEventListener('dragover', onDragOver);
    dropzone.addEventListener('dragleave', onDragLeave);
    dropzone.addEventListener('drop', onDrop);

    cleanups.push(() => {
      input.removeEventListener('change', onChange);
      dropzone.removeEventListener('dragover', onDragOver);
      dropzone.removeEventListener('dragleave', onDragLeave);
      dropzone.removeEventListener('drop', onDrop);
      delete dropzone.dataset.sdDragActive;
      list.replaceChildren();
      if (status) status.textContent = '';
    });
  }

  return combineCleanups(cleanups);
}

export function enhanceInteractiveComponents(options: EnhancementOptions = {}): Cleanup {
  return combineCleanups([
    enhanceAccordions(options),
    enhanceDialogs(options),
    enhanceTabs(options),
    enhanceAutocompletes(options),
    enhanceFileUploads(options),
  ]);
}
