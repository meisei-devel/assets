document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.search-box').forEach((form) => {
    form.addEventListener('submit', (e) => {
      const input = form.querySelector('input[name="keyword"]');
      if (!input) return;
      const keyword = input.value.trim();
      e.preventDefault();
      if (!keyword) return;
      window.location.href = '/technote/keyword/' + encodeURIComponent(keyword) + '/';
    });
  });

  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.code-copy').forEach((button) => {
    button.addEventListener('click', async () => {
      const code = button.closest('.code-block')?.querySelector('code')?.innerText || '';
      try {
        await navigator.clipboard.writeText(code);
        const old = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = old, 1200);
      } catch (_) {
        button.textContent = 'Copy failed';
      }
    });
  });

  const ta = document.querySelector('#honbun');
  document.querySelectorAll('[data-insert]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!ta) return;
      const text = button.dataset.insert || '';
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      ta.setRangeText(text, start, end, 'end');
      ta.focus();
    });
  });

  document.querySelectorAll('[data-wrap]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!ta) return;
      const tpl = button.dataset.wrap || '|';
      const [before, after=''] = tpl.split('|');
      const selected = ta.value.slice(ta.selectionStart, ta.selectionEnd);
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      ta.setRangeText(before + selected + after, start, end, 'select');
      ta.selectionStart = start + before.length;
      ta.selectionEnd = start + before.length + selected.length;
      ta.focus();
    });
  });
});


document.addEventListener('click', async function (event) {
  const button = event.target.closest('.code-copy-button');
  if (!button) return;

  const panel = button.closest('.code-panel');
  const code = panel ? panel.querySelector('pre code') : null;
  if (!code) return;

  const original = button.textContent || 'Copy';

  try {
    await navigator.clipboard.writeText(code.textContent || '');
    button.textContent = 'Copied';
  } catch (e) {
    const range = document.createRange();
    range.selectNodeContents(code);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      button.textContent = 'Copied';
    } catch (e2) {
      button.textContent = 'Copy failed';
    }

    selection.removeAllRanges();
  }

  window.setTimeout(function () {
    button.textContent = original;
  }, 1400);
});
