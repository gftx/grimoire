# 🧙‍♂️ Grimoire

_A magical issue tracker for modern developers._

Grimoire — это баг-трекер в стиле фэнтези, вдохновлённый мирами магии и минималистичным дизайном. Вместо скучных задач — заклинания. Вместо команд — гильдии.

## ✨ Основные сущности

| Реальное      | Grimoire-версия |
|---------------|------------------|
| Проекты       | Guilds           |
| Задачи        | Scrolls / Spells |
| Статусы       | Vision → Brewing → Casted |
| Пользователи  | Scribes / Wardens |

## 🛣️ Roadmap (MVP)

- [ ] Аутентификация: регистрация / JWT / роли
- [ ] Guilds (проекты)
- [ ] Scrolls (тикеты)
- [ ] Tome Board (канбан с drag-n-drop)
- [ ] CI/CD + деплой
- [ ] Документация

## 🧱 Техстек

**Frontend**: React 19 + Vite + TypeScript + Zustand  
**Backend**: Nest.js + PostgreSQL + Prisma/TypeORM  
**DevOps**: Docker, GitHub Actions, CI

## 🧱 Архитектура фронтенда (FSD)

Проект организован по принципам Feature-Sliced Design — подходу, при котором приложение разделяется по смысловым слоям, что повышает масштабируемость и модульность.

src/
├── app/               # Инициализация приложения (роутинг, провайдеры)
│   └── App.tsx
│
├── shared/            # Переиспользуемые элементы: UI, lib, api
│   ├── ui/            # Атомарные компоненты
│   ├── lib/           # Хелперы, утилиты, хуки
│   ├── api/           # axios-инстансы и interceptors
│   └── config/        # Конфиги, константы
│
├── entities/          # Сущности бизнес-логики (например, user)
│   └── user/
│       ├── model/     # Zustand store, типы
│       └── ui/        # Компоненты: Avatar, ProfileBadge
│
├── features/          # Отдельные фичи: login, register, logout
│   └── auth/
│       ├── api/       # Вызовы к API: login, register
│       ├── model/     # Хранение токена, флаг isAuth
│       └── ui/        # Формы: LoginForm, RegisterForm
│
├── widgets/           # UI-блоки, собранные из features/entities
│   └── Header/        # Логотип, навигация, logout
│
├── processes/         # Целостные сценарии: auth-flow, onboarding
│   └── auth-flow/     # Композиция виджетов и фич
│
├── pages/             # Страницы приложения (маршруты)
│   ├── login/
│   └── register/
│
└── index.tsx          # Точка входа в приложение

### 📌 Alias'ы

С помощью `vite-tsconfig-paths` настроены алиасы:

| Alias      | Путь              |
|------------|-------------------|
| `@/app`    | `src/app`         |
| `@/shared` | `src/shared`      |
| `@/features` | `src/features`  |
| `@/entities` | `src/entities`  |

---

📦 Архитектура FSD позволяет изолировать бизнес-логику, ускоряет навигацию по проекту и помогает легко добавлять новые фичи.

Подробнее: [feature-sliced.design](https://feature-sliced.design/)

## 🧙 Как запустить весь проект

Убедись, что у тебя установлен [Docker](https://www.docker.com/)

### 📦 Структура

- **backend/** — NestJS, Prisma
- **frontend/** — Vite + React
- **postgres** — через docker
- **docker-compose.yml** — собирает всё вместе

### 🚀 Команды

1. Клонируй проект:

```bash
git clone ...
cd grimoire
```

2. Запусти всё:

```bash
docker compose up --build
```

3. Бэк будет доступен на: [http://localhost:3001](http://localhost:3001)  
   Фронт: [http://localhost:5173](http://localhost:5173)

4. База PostgreSQL будет работать внутри контейнера

---

✅ Обрати внимание:
- backend использует `npx prisma migrate deploy` чтобы применить миграции при запуске
- frontend запускается в режиме preview (`npm run preview`)
- переменные окружения задаются в `docker-compose.yml`


---

_May your bugs be tamed and scrolls fulfilled!_ 🪄
