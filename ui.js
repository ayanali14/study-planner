// Connects the HTML screens with the Auth and Tasks modules.
(function () {
  const $ = id => document.getElementById(id);

  function showMessage(el, text) {
    el.textContent = text;
  }

  function switchForm(showRegister) {
    $("login-form").hidden = showRegister;
    $("register-form").hidden = !showRegister;
    showMessage($("auth-message"), "");
  }

  function renderTasks() {
    const email = Auth.currentEmail();
    const list = $("task-list");
    list.innerHTML = "";
    Tasks.all(email).forEach(task => {
      const item = document.createElement("li");
      item.className = "task-item" + (task.done ? " is-done" : "");

      const left = document.createElement("div");
      const title = document.createElement("span");
      title.className = "task-title";
      title.textContent = task.title;
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = task.priority;
      left.append(title, badge);

      const actions = document.createElement("div");
      actions.className = "task-actions";
      const doneBtn = document.createElement("button");
      doneBtn.className = "btn btn-done";
      doneBtn.textContent = task.done ? "Reopen" : "Done";
      doneBtn.addEventListener("click", () => { Tasks.toggle(email, task.id); renderTasks(); });
      const delBtn = document.createElement("button");
      delBtn.className = "btn btn-del";
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => { Tasks.remove(email, task.id); renderTasks(); });
      actions.append(doneBtn, delBtn);

      item.append(left, actions);
      list.appendChild(item);
    });
    $("task-count").textContent = Tasks.summary(email);
  }

  function showScreen() {
    const loggedIn = !!Auth.currentEmail();
    $("auth-view").hidden = loggedIn;
    $("app-view").hidden = !loggedIn;
    if (loggedIn) {
      $("user-name").textContent = Auth.currentName();
      renderTasks();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("show-register").addEventListener("click", e => { e.preventDefault(); switchForm(true); });
    $("show-login").addEventListener("click", e => { e.preventDefault(); switchForm(false); });

    $("register-form").addEventListener("submit", e => {
      e.preventDefault();
      const res = Auth.register($("reg-name").value, $("reg-email").value, $("reg-password").value);
      if (res.ok) {
        switchForm(false);
        $("login-email").value = $("reg-email").value;
      }
      showMessage($("auth-message"), res.text);
    });

    $("login-form").addEventListener("submit", e => {
      e.preventDefault();
      const res = Auth.login($("login-email").value, $("login-password").value);
      showMessage($("auth-message"), res.text);
      if (res.ok) {
        $("login-password").value = "";
        showScreen();
      }
    });

    $("task-form").addEventListener("submit", e => {
      e.preventDefault();
      const res = Tasks.add(Auth.currentEmail(), $("task-title").value, $("task-priority").value);
      showMessage($("task-message"), res.text);
      if (res.ok) $("task-title").value = "";
      renderTasks();
    });

    $("logout-btn").addEventListener("click", () => { Auth.logout(); showScreen(); });
    showScreen();
  });
})();
