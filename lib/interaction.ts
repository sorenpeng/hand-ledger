export const INTERACTIVE_TARGET_SELECTOR = [
  '[data-page-interactive]',
  '[data-no-page-flip]',
  'button',
  'a',
  'input',
  'textarea',
  'select',
  'label',
  '[role="button"]',
  '[role="link"]',
  '[role="switch"]',
  '[role="checkbox"]',
  '[role="menuitem"]',
  '[contenteditable="true"]',
].join(',');

export function isInteractiveTarget(target: EventTarget | null): boolean {
  if (typeof Element === 'undefined') return false;
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(INTERACTIVE_TARGET_SELECTOR));
}
