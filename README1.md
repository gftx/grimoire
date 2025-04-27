# 🧙‍♂️ Grimoire — Creative Task & Idea OS

Grimoire — это не просто таск-трекер, а волшебная операционная система для креативных людей. Сценаристы, видеомейкеры, блогеры, писатели — всё, что вы создаёте, здесь превращается в живые таски, черновики и проекты с поддержкой AI.

![Grimoire Banner](./public/cover.png)

<p align="center">
  <img src="https://img.shields.io/github/license/gftx/grimoire?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues/gftx/grimoire?style=for-the-badge" />
  <img src="https://img.shields.io/github/stars/gftx/grimoire?style=for-the-badge" />
</p>

---

## 🚀 Миссия
Создать пространство, где идея не теряется, сценарий не забывается, а вдохновение становится проектом.

---

## 🧭 Roadmap

### ✅ MVP 1.0
- [x] Проекты и задачи (todo, done, in progress)
- [x] Типы задач: `idea`, `script`, `note`, `task`
- [x] Markdown-редактор для сценариев и заметок
- [x] Хранилище идей ("Vault") с быстрым созданием
- [x] Авторизация и пользовательский профиль
- [x] Интеграция с AI (OpenAI API)
  - [x] Суммаризация задачи
  - [x] Расширить идею (Expand idea)
  - [x] Переформулировать (Rephrase)

### 🔜 1.1 — Pages и флоу контента
- [ ] Поддержка "страниц" для длинных сценариев / outline
- [ ] AI генерация outline по теме
- [ ] Перетаскивание тасков между проектами
- [ ] Drag & Drop интерфейс для Vault

### 🔮 2.0 — Мультимодальные задачи
- [ ] Возможность прикреплять картинки, аудио и видео
- [ ] Календарь релизов (YouTube / Insta / Blog)
- [ ] AI suggestions based on content type
- [ ] Канбан-доска и Timeline view

---

## ✨ Ключевые фичи

### 🧠 Vault (Сундук идей)
- Быстрое добавление идеи без фокусировки
- Теги, быстрый поиск, draft-режим
- Превращение идеи в полноценный таск/сценарий

### 📄 Страницы и сценарии
- Markdown-редактор с AI-инструментами:
  - Expand
  - Improve
  - Summarize
  - Rephrase
- Автосохранение и история версий

### 🎬 Типы задач
Каждая задача может быть:
- `idea` — краткая мысль или тезис
- `script` — развёрнутое содержание или сценарий
- `task` — конкретное действие ("отснять сцену", "написать абзац")
- `note` — любые заметки к проекту

### 🤖 AI-помощник (Grimoire AI)
- Встроен прямо в редактор задач
- Умеет:
  - Расширить идею до сценария
  - Улучшить текст
  - Сгенерировать outline по заголовку
  - Придумать логлайн или описание

---

## 🧱 Архитектура (FSD + AI-first Design)

```
src/
├── app/             # App.tsx, роутинг, провайдеры
├── entities/        # user, task, idea, types
├── features/        # auth, vault, task-editing
├── shared/          # UI, axiosInstance, helpers
├── widgets/         # TaskCard, IdeaInput, EditorPanel
├── processes/       # auth-flow, project-flow
├── pages/           # /login /register /vault /project/:id
```

---

## 🛠️ Используемые технологии
- **Frontend**: React 19 + Vite + TypeScript + Zustand + TailwindCSS
- **Backend**: Nest.js + PostgreSQL + Prisma + JWT
- **DevOps**: Docker + Docker Compose + GitHub Actions
- **AI-интеграция**: OpenAI (GPT-4), (будет поддержка Ollama)

---

## 🧙‍♀️ Лор и эстетика
- Grimoire — магическая книга, хранящая идеи
- Vault — сундук с черновиками
- Spell = AI action (Summon, Rephrase, Enchant)
- UI — минимализм + вдохновлён фэнтези-стилем (dark mode only)

---

## 🧑‍💻 Как контрибьютить

1. Fork репозиторий
2. Создай новую ветку: `git checkout -b feature/название`
3. Пиши код (соблюдая FSD и code style проекта)
4. Сделай PR, опиши задачу и покажи результат в README или gif

---

## 📍 TODO
- [ ] Механика "Summon spell" для генерации нового сценария
- [ ] Интеграция календаря
- [ ] Синхронизация с Notion, Google Docs
- [ ] AI-персонажи: Scribe, Oracle, Editor

---

## 💌 Присоединяйся
**Этот проект — open-source. Мы ищем:**
- Контрибьюторов (frontend, backend, AI)
- Дизайнеров с тягой к фэнтези и минимализму
- Тестеров с креативным мышлением

[GitHub Repo](https://github.com/gftx/grimoire)
