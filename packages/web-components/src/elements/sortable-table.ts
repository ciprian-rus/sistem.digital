import { enhanceSortableTables } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/** Wraps a `[data-sd-sortable-table]` table. Without it, the plain `.sd-table` inside still works. */
export class SdSortableTableElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceSortableTables({ root: this });
  }
}
