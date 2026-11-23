// Signup, login and session handling.
const Auth = {
  USERS: "sp_users",
  SESSION: "sp_session",

  // Basic string hash so passwords are not saved as plain text.
  hash(text) {
    let h = 5381;
    for (const ch of text) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0;
    return h.toString(16);
  },

  isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  },

  register(name, email, password) {
    name = name.trim();
    email = email.trim().toLowerCase();
    if (!name) return { ok: false, text: "Please enter your full name." };
    if (!this.isEmail(email)) return { ok: false, text: "That email address does not look right." };
    if (password.length < 6) return { ok: false, text: "Password needs at least 6 characters." };

    const users = Store.read(this.USERS, {});
    if (users[email]) return { ok: false, text: "An account with this email already exists." };

    users[email] = { name: name, passwordHash: this.hash(password) };
    Store.write(this.USERS, users);
    return { ok: true, text: "Account created. You can log in now." };
  },

  login(email, password) {
    email = email.trim().toLowerCase();
    if (!email || !password) return { ok: false, text: "Enter your email and password." };
    const user = Store.read(this.USERS, {})[email];
    if (!user || user.passwordHash !== this.hash(password)) {
      return { ok: false, text: "Email or password is incorrect." };
    }
    Store.write(this.SESSION, email);
    return { ok: true, text: "" };
  },

  logout() {
    Store.remove(this.SESSION);
  },

  currentEmail() {
    return Store.read(this.SESSION, null);
  },

  currentName() {
    const email = this.currentEmail();
    const user = email ? Store.read(this.USERS, {})[email] : null;
    return user ? user.name : "";
  }
};
