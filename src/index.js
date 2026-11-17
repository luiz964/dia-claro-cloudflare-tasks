const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

function taskFromRow(row) {
  return { ...row, done: Boolean(row.done) };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);

    try {
      if (url.pathname === "/api/health" && request.method === "GET") {
        return json({ ok: true, service: "painel-tarefas" });
      }

      if (url.pathname === "/api/tasks" && request.method === "GET") {
        const { results } = await env.DB.prepare(
          "SELECT id, title, description, done, created_at, updated_at FROM tasks ORDER BY done ASC, created_at DESC"
        ).all();
        return json(results.map(taskFromRow));
      }

      if (url.pathname === "/api/tasks" && request.method === "POST") {
        const body = await request.json();
        const title = typeof body.title === "string" ? body.title.trim() : "";
        const description = typeof body.description === "string" ? body.description.trim() : "";
        if (!title || title.length > 160) return json({ error: "O título deve ter entre 1 e 160 caracteres." }, 400);
        const id = crypto.randomUUID();
        await env.DB.prepare("INSERT INTO tasks (id, title, description) VALUES (?, ?, ?)")
          .bind(id, title, description.slice(0, 1000)).run();
        const task = await env.DB.prepare("SELECT * FROM tasks WHERE id = ?").bind(id).first();
        return json(taskFromRow(task), 201);
      }

      const match = url.pathname.match(/^\/api\/tasks\/([\w-]+)$/);
      if (match) {
        const id = match[1];
        if (request.method === "PATCH") {
          const body = await request.json();
          const current = await env.DB.prepare("SELECT * FROM tasks WHERE id = ?").bind(id).first();
          if (!current) return json({ error: "Tarefa não encontrada." }, 404);
          if (body.title !== undefined && typeof body.title !== "string") return json({ error: "O título deve ser texto." }, 400);
          if (body.description !== undefined && typeof body.description !== "string") return json({ error: "A descrição deve ser texto." }, 400);
          if (body.done !== undefined && typeof body.done !== "boolean") return json({ error: "O estado concluído deve ser verdadeiro ou falso." }, 400);
          const title = body.title === undefined ? current.title : body.title.trim();
          const description = body.description === undefined ? current.description : body.description.trim();
          const done = body.done === undefined ? current.done : Number(body.done);
          if (!title || title.length > 160) return json({ error: "O título deve ter entre 1 e 160 caracteres." }, 400);
          await env.DB.prepare("UPDATE tasks SET title = ?, description = ?, done = ?, updated_at = datetime('now') WHERE id = ?")
            .bind(title, description.slice(0, 1000), done, id).run();
          return json(taskFromRow(await env.DB.prepare("SELECT * FROM tasks WHERE id = ?").bind(id).first()));
        }
        if (request.method === "DELETE") {
          const result = await env.DB.prepare("DELETE FROM tasks WHERE id = ?").bind(id).run();
          return result.meta.changes ? new Response(null, { status: 204 }) : json({ error: "Tarefa não encontrada." }, 404);
        }
      }

      return json({ error: "Rota não encontrada." }, 404);
    } catch (error) {
      if (error instanceof SyntaxError) return json({ error: "O corpo da solicitação precisa ser um JSON válido." }, 400);
      return json({ error: "Não foi possível concluir a solicitação." }, 500);
    }
  },
};
