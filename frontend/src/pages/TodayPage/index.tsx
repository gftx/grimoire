import { useEffect, useState } from "react";
import { todosApi } from "@/entities/todo/api";
import { Todo } from "@/entities/todo/types";
import styles from "./styles.module.scss";
import { startOfToday, subDays, addDays } from "date-fns";
import { Trash2, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { ResponsiveDatePicker } from "@/shared/ui/DatePicker";
import dayjs from "dayjs";
import { TextField, Button } from "@mui/material";

export const TodayPage = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, Partial<Todo>>>(
    {},
  );
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [yesterdayTodos, setYesterdayTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    const isoDate = selectedDate.toISOString();
    const todayTodos = await todosApi.getByDate(isoDate);
    setTodos(todayTodos);

    const yesterday = subDays(selectedDate, 1).toISOString();
    const allYesterday = await todosApi.getByDate(yesterday);
    const uncompleted = allYesterday.filter((todo) => !todo.completed);
    setYesterdayTodos(uncompleted);
  };

  useEffect(() => {
    loadTodos();
  }, [selectedDate]);

  const handleCreate = async () => {
    if (!newTask.trim()) return;

    setLoading(true);
    try {
      await todosApi.create({
        title: newTask.trim(),
        completed: false,
        date: new Date(selectedDate).toISOString(),
      });
      setNewTask("");
      await loadTodos();
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleted = async (id: string, completed: boolean) => {
    await todosApi.update(id, { completed: !completed });
    await loadTodos();
  };

  const handleDelete = async (id: string) => {
    await todosApi.delete(id);
    await loadTodos();
  };

  const handleEditChange = (id: string, field: keyof Todo, value: string) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleEditSubmit = async (id: string) => {
    const updates = editValues[id];
    if (!updates) return;
    await todosApi.update(id, updates);
    setEditingId(null);
    setEditValues((prev) => ({ ...prev, [id]: {} }));
    await loadTodos();
  };

  // Helper for navigation buttons
  const handleNav = (days: number) => {
    setSelectedDate(addDays(selectedDate, days));
  };

  return (
    <main className={styles.todayPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <button
              type='button'
              className={styles.addButton}
              onClick={() => handleNav(-1)}
            >
              <MoveLeftIcon />
            </button>
            <button
              type='button'
              className={styles.addButton}
              onClick={() => setSelectedDate(startOfToday())}
            >
              Today
            </button>
            <button
              type='button'
              className={styles.addButton}
              onClick={() => handleNav(1)}
            >
              <MoveRightIcon />
            </button>
          </div>
          <div className={styles.inputRaw}>
            <ResponsiveDatePicker
              value={dayjs(selectedDate)}
              onChange={(d) => setSelectedDate(d.toDate())}
              textFieldProps={{ className: styles.datePicker }}
            />
            <TextField
              variant='outlined'
              size='small'
              placeholder='whats next?'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className={styles.input}
              fullWidth
            />
            <Button
              onClick={handleCreate}
              disabled={loading || !newTask.trim()}
              className={styles.addButton}
              variant='contained'
              color='primary'
              sx={{ minWidth: 120, height: 40 }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      {yesterdayTodos.length > 0 && (
        <section className={styles.yesterdaySection}>
          <h2>🔁 Yesterday tasks:</h2>
          <ul className={styles.todoList}>
            {yesterdayTodos.map((todo) => (
              <li key={todo.id} className={styles.todoItem}>
                {editingId === todo.id ? (
                  <div className={styles.editForm}>
                    <input
                      type='text'
                      value={editValues[todo.id]?.title ?? todo.title}
                      onChange={(e) =>
                        handleEditChange(todo.id, "title", e.target.value)
                      }
                      className={styles.input}
                    />
                    <textarea
                      placeholder='Описание'
                      value={
                        editValues[todo.id]?.description ??
                        todo.description ??
                        ""
                      }
                      onChange={(e) =>
                        handleEditChange(todo.id, "description", e.target.value)
                      }
                      className={styles.textarea}
                    />
                    <input
                      type='text'
                      placeholder='Тег'
                      value={editValues[todo.id]?.tag ?? todo.tag ?? ""}
                      onChange={(e) =>
                        handleEditChange(todo.id, "tag", e.target.value)
                      }
                      className={styles.input}
                    />
                    <div className={styles.editActions}>
                      <button onClick={() => setEditingId(null)}>Отмена</button>
                      <button onClick={() => handleEditSubmit(todo.id)}>
                        Сохранить
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.todoCard}
                    onClick={() => setEditingId(todo.id)}
                  >
                    <label
                      className={styles.todoLabel}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type='checkbox'
                        checked={todo.completed}
                        onChange={() =>
                          toggleCompleted(todo.id, todo.completed)
                        }
                      />
                    </label>

                    <div className={styles.todoContent}>
                      <span
                        className={`${styles.todoText} ${
                          todo.completed ? styles.completed : ""
                        }`}
                      >
                        {todo.title}
                      </span>

                      {todo.description && (
                        <p className={styles.todoDescription}>
                          {todo.description.slice(0, 50)}
                          {todo.description.length > 50 && "..."}
                        </p>
                      )}

                      {todo.tag && (
                        <span className={styles.todoTag}>#{todo.tag}</span>
                      )}
                    </div>

                    <button
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(todo.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            {editingId === todo.id ? (
              <div className={styles.editForm}>
                <input
                  type='text'
                  value={editValues[todo.id]?.title ?? todo.title}
                  onChange={(e) =>
                    handleEditChange(todo.id, "title", e.target.value)
                  }
                  className={styles.input}
                />
                <textarea
                  placeholder='Описание'
                  value={
                    editValues[todo.id]?.description ?? todo.description ?? ""
                  }
                  onChange={(e) =>
                    handleEditChange(todo.id, "description", e.target.value)
                  }
                  className={styles.textarea}
                />
                <input
                  type='text'
                  placeholder='Тег'
                  value={editValues[todo.id]?.tag ?? todo.tag ?? ""}
                  onChange={(e) =>
                    handleEditChange(todo.id, "tag", e.target.value)
                  }
                  className={styles.input}
                />
                <div className={styles.editActions}>
                  <button onClick={() => setEditingId(null)}>Отмена</button>
                  <button onClick={() => handleEditSubmit(todo.id)}>
                    Сохранить
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={styles.todoCard}
                onClick={() => setEditingId(todo.id)}
              >
                <label
                  className={styles.todoLabel}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => toggleCompleted(todo.id, todo.completed)}
                  />
                </label>

                <div className={styles.todoContent}>
                  <span
                    className={`${styles.todoText} ${
                      todo.completed ? styles.completed : ""
                    }`}
                  >
                    {todo.title}
                  </span>

                  {todo.description && (
                    <p className={styles.todoDescription}>
                      {todo.description.slice(0, 50)}
                      {todo.description.length > 50 && "..."}
                    </p>
                  )}

                  {todo.tag && (
                    <span className={styles.todoTag}>#{todo.tag}</span>
                  )}
                </div>

                <button
                  className={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(todo.id);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};
