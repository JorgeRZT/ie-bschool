export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // a cell holding only a link (pipeline unwraps the single <p>) becomes a button
      const only = col.children.length === 1 && col.firstElementChild;
      const link = only && (only.matches('a') ? only : only.matches('em, strong') && only.querySelector(':scope > a'));
      if (link) {
        const p = document.createElement('p');
        p.className = 'button-container';
        link.classList.add('button', only.matches('strong') ? 'primary' : 'secondary');
        p.append(link);
        only.replaceWith(p);
      }
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
