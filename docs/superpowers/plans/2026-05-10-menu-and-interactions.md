# Implementation Plan: Menu & Interactions

## 1. Objective
Ensure all menu sections are functional, add right-click deselection to 3D tables, and improve the signature creations horizontal scroll on minimized browsers.

## 2. Tasks
- [x] **Task 1: Menu Functionality**
  - Update `constants.ts` to include missing `MENU` categories: Desserts, Wines, Tasting Menu.
  - Update `Menu.tsx` to remove hardcoded category buttons and map through `MENU` data.
- [x] **Task 2: Table Deselection**
  - Modify `Booking3D.tsx` to handle right-clicks (`onContextMenu`).
  - Add logic to call `onSelect(null)` when a selected table is right-clicked.
- [x] **Task 3: Signature Creations Updates**
  - Generate and save image for a new 6th dish (Smoked Scallops).
  - Add the new dish to `DISHES` in `constants.ts`.
  - Update `Dishes.tsx` to force `flex-row` on mobile view.
  - Refine `handleWheel` logic with `Math.ceil()` to prevent scroll-blocking at the boundaries.

## 3. Verification
- Validate clicking "Wines" successfully transitions to wine list.
- Validate right-clicking a green highlighted table turns it back to neutral.
- Validate shrinking the browser window stacks the cards horizontally and allows mouse-wheel scrolling to the 6th card.
