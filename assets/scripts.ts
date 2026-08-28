// Simple helper to accept an uploaded plans file and render a preview into the #planes section
const uploadBtn = document.getElementById('upload-placeholder');

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderPlansFromJson(data: any) {
  const container = document.getElementById('planes');
  if (!container) return;
  let html = '<div class="uploaded-plans">';
  if (Array.isArray(data)) {
    html += '<ul>' + data.map((p: any) => `<li><strong>${escapeHtml(p.title || p.name || '')}</strong>: ${escapeHtml(p.description || p.summary || '')}</li>`).join('') + '</ul>';
  } else if (typeof data === 'object') {
    for (const k in data) {
      html += `<p><strong>${escapeHtml(k)}</strong>: ${escapeHtml(JSON.stringify(data[k]))}</p>`;
    }
  } else {
    html += `<pre>${escapeHtml(String(data))}</pre>`;
  }
  html += '</div>';
  container.insertAdjacentHTML('beforeend', html);
}

if (uploadBtn) {
  uploadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = '.json,.html,.md,.txt';
    inp.onchange = async () => {
      const f = inp.files && inp.files[0];
      if (!f) return;
      const text = await f.text();
      const container = document.getElementById('planes');
      if (!container) return;
      // Try JSON first
      if (f.name.toLowerCase().endsWith('.json')) {
        try {
          const data = JSON.parse(text);
          renderPlansFromJson(data);
        } catch (err) {
          container.insertAdjacentHTML('beforeend', `<div class="uploaded-plans"><pre>JSON inválido: ${escapeHtml(String(err))}</pre></div>`);
        }
      } else {
        // Insert raw text or HTML/Markdown as preformatted
        container.insertAdjacentHTML('beforeend', `<div class="uploaded-plans"><pre>${escapeHtml(text)}</pre></div>`);
      }
    };
    inp.click();
  });
}
