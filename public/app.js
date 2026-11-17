const list = document.querySelector('#task-list');
const summary = document.querySelector('#summary');
const empty = document.querySelector('#empty');
const notice = document.querySelector('#notice');
const connection = document.querySelector('#connection');
const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#task-title');
const descriptionInput = document.querySelector('#task-description');
let tasks = [];
let filter = 'all';

async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, { headers: { 'content-type': 'application/json' }, ...options });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Erro de comunicação com o servidor.');
  }
  return response.status === 204 ? null : response.json();
}

function render() {
  const done = tasks.filter(task => task.done).length;
  summary.textContent = `${tasks.length} ${tasks.length === 1 ? 'tarefa' : 'tarefas'} · ${done} concluída${done === 1 ? '' : 's'}`;
  const visible = tasks.filter(task => filter === 'all' || (filter === 'done' ? task.done : !task.done));
  list.replaceChildren(...visible.map(task => {
    const item = document.createElement('li');
    item.className = `task${task.done ? ' completed' : ''}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; checkbox.className = 'check'; checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', `Marcar ${task.title} como ${task.done ? 'pendente' : 'concluída'}`);
    checkbox.addEventListener('change', () => update(task.id, { done: checkbox.checked }));
    const body = document.createElement('div'); body.className = 'task-body';
    const heading = document.createElement('div'); heading.className = 'task-title'; heading.textContent = task.title;
    body.append(heading);
    if (task.description) { const desc = document.createElement('div'); desc.className = 'task-desc'; desc.textContent = task.description; body.append(desc); }
    const remove = document.createElement('button'); remove.className = 'delete'; remove.textContent = '×'; remove.setAttribute('aria-label', `Excluir ${task.title}`);
    remove.addEventListener('click', () => removeTask(task.id));
    item.append(checkbox, body, remove); return item;
  }));
  empty.hidden = visible.length !== 0;
  if (visible.length === 0) {
    empty.querySelector('p').textContent = tasks.length === 0
      ? 'Nada por aqui ainda. Adicione sua primeira tarefa acima.'
      : 'Nenhuma tarefa neste filtro. Escolha outro filtro para ver suas tarefas.';
  }
}

async function refresh() { tasks = await api('/tasks'); render(); connection.textContent = 'Conectado ao banco de dados'; }
async function update(id, changes) { try { const saved = await api(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(changes) }); tasks = tasks.map(task => task.id === id ? saved : task); render(); notice.textContent = ''; } catch (error) { notice.textContent = error.message; } }
async function removeTask(id) { try { await api(`/tasks/${id}`, { method: 'DELETE' }); tasks = tasks.filter(task => task.id !== id); render(); notice.textContent = ''; } catch (error) { notice.textContent = error.message; } }

form.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    const created = await api('/tasks', { method: 'POST', body: JSON.stringify({ title: titleInput.value, description: descriptionInput.value }) });
    tasks = [created, ...tasks]; titleInput.value = ''; descriptionInput.value = ''; notice.textContent = ''; render(); titleInput.focus();
  } catch (error) { notice.textContent = error.message; }
});
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter; document.querySelectorAll('.filter').forEach(item => { const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected)); }); render();
}));
refresh().catch(error => { notice.textContent = `Não foi possível carregar. ${error.message}`; summary.textContent = 'Verifique a configuração do banco.'; connection.textContent = 'Sem conexão com o banco'; });
