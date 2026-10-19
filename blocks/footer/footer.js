import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  ['links', 'legal', 'bottom'].forEach((c, i) => footer.children[i]?.classList.add(`footer-${c}`));
  footer.querySelectorAll('.button, .button-container').forEach((el) => el.classList.remove('button', 'button-container', 'primary', 'secondary'));
  footer.querySelectorAll('a').forEach((a) => {
    const icon = a.querySelector('.icon');
    if (a.textContent.trim() || !icon) return;
    const name = [...icon.classList].find((c) => c.startsWith('icon-') && c !== 'icon').slice(5);
    a.setAttribute('aria-label', name.startsWith('ie-logo') ? 'IE University home' : name.charAt(0).toUpperCase() + name.slice(1));
  });

  block.append(footer);
}
