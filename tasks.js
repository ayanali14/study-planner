// Task data: every user has their own list.
const Tasks = {
  key(email) {
    return "sp_tasks_" + email;
  },

  all(email) {
    return Store.read(this.key(email), []);
  },

  add(email, title, priority) {
    title = title.trim();
    if (!title) return { ok: false, text: "Write something before adding a task." };
    const list = this.all(email);
    list.push({ id: "t" + Date.now() + Math.floor(Math.random() * 1000), title: title, priority: priority, done: false });
    Store.write(this.key(email), list);
    return { ok: true, text: "" };
  },

  remove(email, id) {
    Store.write(this.key(email), this.all(email).filter(task => task.id !== id));
  },

  toggle(email, id) {
    const list = this.all(email).map(task => task.id === id ? { ...task, done: !task.done } : task);
    Store.write(this.key(email), list);
  },

  summary(email) {
    const list = this.all(email);
    const done = list.filter(task => task.done).length;
    return done + " of " + list.length + " tasks completed";
  }
};
