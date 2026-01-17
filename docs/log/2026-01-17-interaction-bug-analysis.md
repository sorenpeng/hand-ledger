# Interaction Bug Analysis Report

**Date:** 2026-01-17
**Related Resource:** docs/log/Screen Recording 2026-01-17 125515.mp4
**Subject:** Page Flip Interaction (Journal / PageStack / JournalCover)

## Summary
Through code audit and interaction behavior analysis, 5 major interaction bugs have been confirmed. These issues are primarily concentrated in **Mis-triggers (Occlusion/Z-Index issues)** and **Missing Logic**, significantly impacting the user experience on the left-hand side of the journal.

## Top 5 Bug Scenarios

### 1. Accidental Closing when Clicking "Previous Page" (Critical)
*   **Phenomenon:** After opening the journal and flipping at least one page, clicking the left-hand page area (intending to go back) causes the entire journal to close and return to the cover.
*   **Steps:**
    1.  Click cover to open journal.
    2.  Click right side to flip a page (content is now on the left).
    3.  Click the left-hand area.
*   **Root Cause:** **Occlusion/Z-Index**.
    *   `JournalCover` is located after `PageStack` in the DOM.
    *   When open, the cover rotation is `-170deg` (slightly lifted) while the page is `-180deg` (flat).
    *   The cover's interactive area physically occludes the left-hand page, and the cover has an `onClick={onToggle}` event bound to it (which closes the journal).

### 2. Left Page Unresponsive to Clicks
*   **Phenomenon:** Even if avoiding the cover occlusion, clicking the center of a left-hand (already flipped) page triggers no reaction.
*   **Steps:**
    1.  Flip several pages.
    2.  Precise click on the center of the left-hand page.
*   **Root Cause:** **Missing Event Binding**.
    *   In `PageStack.tsx`, `handlePageClick` only handles the `forward` logic.
    *   In `Page.tsx`, the `onClick` prop is only passed to `isActive` (the current right-hand page). The `onClick` for left-hand pages is `undefined`.

### 3. Interaction Lock on Fast Inputs (Lag)
*   **Phenomenon:** Rapid consecutive clicks on the right page or arrow keys result in only the first action being registered. Subsequent actions are ignored for approx. 1 second.
*   **Steps:**
    1.  Rapidly click the right side multiple times (like flipping through a book).
*   **Root Cause:** **Animation State Locking**.
    *   `usePageFlip.ts` uses a `setTimeout` with a fixed `800ms` lock (`isFlipping`).
    *   During this window, all inputs are strictly discarded without debouncing or queueing.

### 4. Mobile Swipe Gesture Blocked
*   **Phenomenon:** On mobile devices, attempting to swipe from left to right (to go back) fails or drags the entire viewport.
*   **Steps:**
    1.  In mobile view, touch and drag the left-hand page towards the right.
*   **Root Cause:** **Event Interception**.
    *   Similar to Bug #1, the `JournalCover` (higher Z-index/DOM order) intercepts the touch events intended for the `PageStack`'s gesture listener (`drag="x"`).

### 5. Visual Z-Fighting (Clipping)
*   **Phenomenon:** During the opening animation or page flips, the inside of the cover and the first page visually flicker, overlap, or clip through each other.
*   **Steps:**
    1.  Click to open the journal and observe the left edge.
*   **Root Cause:** **Z-Fighting**.
    *   The CSS 3D transforms for `-170deg` and `-180deg` are extremely close in Z-space.
    *   Lack of dynamic `z-index` control confuses the browser's rendering engine regarding depth sorting.

## Bug Classification
*   **Mis-trigger (Occlusion/Bubble):** 60% (Bugs 1, 4, 5) - *Primary Issue*
*   **Logic Missing:** 20% (Bug 2)
*   **Animation Race Condition:** 20% (Bug 3)

## Fix Recommendations
1.  **Correct Layering:** When the journal is open (`isOpen=true`), forcibly lower the `JournalCover`'s `z-index` or set `pointer-events-none` to ensure internal pages are the top-most interactive layer.
2.  **Implement Logic:** Update `PageStack` to pass a `() => flipPage('backward')` callback to left-hand pages (`index < currentPage`).
3.  **Optimize State:** Consider reducing the animation lock duration or implementing better state management in the animation library.