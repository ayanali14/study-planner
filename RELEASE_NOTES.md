# StudyPlanner - Release Notes

## v1.0.1 (23 November 2026) - Hotfix

### Bug Fixes
- Fixed the Log in button being pushed below the screen on phones. The large banner is now smaller on small screens and the page can scroll, so the button is always reachable.

---

## v1.0.0 (23 November 2026)

### New Features
- Register with full name, email and password (minimum 6 characters).
- Log in and log out; the session is remembered after a page refresh.
- Add tasks with a title and a priority.
- Mark tasks as done or reopen them.
- Delete tasks.
- Task counter showing how many tasks are completed.
- Every user has a separate task list.

### Bug Fixes
- Blank task titles are rejected with a message.
- The same email cannot be registered twice, even with different letter case.
- Passwords are stored as a hash instead of plain text.
- The task list now refreshes straight after a delete or a status change.

### Known Issues
- Data is saved in the browser only, so it is not shared between devices.
- The password hash is basic and is not meant for real production use.
- There is no password reset option.
