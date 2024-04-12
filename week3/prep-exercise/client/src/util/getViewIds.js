/**
 * Get all child elements with an `id` attribute, starting from `root`.
 * @param {HTMLElement} root The root element to start from.
 * @returns An object with `id` as key and an element reference as value.
 */
function getViewIds(root) {
  const elementsWithIds = Array.from(root.querySelectorAll('[id]'));
  const dom = {};
  for (const elem of elementsWithIds) {
    dom[elem.id] = elem;
  }
  return dom;
}

export default getViewIds;
