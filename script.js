const params = new URLSearchParams(window.location.search);
const ref = params.get('ref');
if (ref && /^[a-zA-Z0-9_-]{1,80}$/.test(ref)) document.getElementById('ref').value = ref;
document.getElementById('joinForm').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = `ОНА · Заявка первой волны\nИмя: ${data.get('name')}\nКонтакт: ${data.get('contact')}\nКод пригласившей: ${data.get('ref') || 'нет'}`;
  const notice = document.getElementById('notice');
  try {
    await navigator.clipboard.writeText(message);
    notice.textContent = 'Заявка скопирована. Отправь её организатору удобным способом.';
  } catch {
    notice.textContent = 'Скопируй заявку ниже и отправь организатору: ' + message;
    notice.style.whiteSpace = 'pre-line';
  }
});
