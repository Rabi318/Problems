## 🐛 Bug Summary: Debugging the Multi-Feature To-Do List

### 1. Empty Tasks Were Allowed

- **Issue:** Users could add empty tasks or tasks with only spaces.
- **Fix:** Trimmed the input using `task.trim()` and prevented adding if the result was an empty string.

---

### 2. Completed Tasks Had No Visual Indication

- **Issue:** Marking a task as completed had no visible effect.
- **Fix:** Applied conditional styling using `textDecoration: 'line-through'` when the task was marked as completed.

---

### 3. Deleting a Task Sometimes Removed the Wrong One

- **Issue:** Clicking "Delete" occasionally removed the wrong task due to index/key mismatch.
- **Fix:** Assigned a unique `id` to each task using `Date.now()` and used that `id` for deletion instead of relying on index.

---
