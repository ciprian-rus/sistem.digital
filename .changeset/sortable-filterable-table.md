---
"@sistem-digital/components": minor
"@sistem-digital/web-components": minor
"@sistem-digital/react": minor
---

Add `sortable-table`: sorting and filtering added on top of a plain `.sd-table`. Without JavaScript the table is already complete and readable — the filter input and the sort buttons only exist once `enhanceSortableTables` (or `<sd-sortable-table>` / `useSortableTable`) creates them, so there is never a dead control. Sort state is exposed via `aria-sort`; both sorting and filtering announce their result through a live status region.
