# GitHub Actions Workflows

Этот проект настроен с двумя GitHub Actions workflows:

## 1. Test Workflow (`.github/workflows/test.yml`)

**Триггеры:**

- Push в ветки `main` или `master`
- Pull Request в ветки `main` или `master`

**Что делает:**

- Устанавливает Node.js 18
- Устанавливает зависимости через `yarn install --frozen-lockfile`
- Запускает тесты через `yarn test:run`
- Сохраняет результаты тестов как артефакт

## 2. Build and Deploy Workflow (`.github/workflows/build-and-deploy.yml`)

**Триггеры:**

- Запускается только после успешного завершения Test workflow
- Работает только для веток `main` или `master`

**Что делает:**

- Устанавливает Node.js 18
- Устанавливает зависимости
- Собирает проект через `yarn build`
- Подготавливает файлы для Netlify:
  - Копирует `./dist` в корень
  - Копирует `./index.html` в корень
  - Копирует `./assets` в корень
- Деплоит на Netlify

## Настройка Netlify

Для работы деплоя нужно добавить следующие секреты в GitHub:

1. `NETLIFY_AUTH_TOKEN` - токен авторизации Netlify
2. `NETLIFY_SITE_ID` - ID сайта в Netlify

### Как получить токены:

1. **NETLIFY_AUTH_TOKEN:**

   - Зайти в Netlify Dashboard
   - User settings → Applications → Personal access tokens
   - Создать новый токен

2. **NETLIFY_SITE_ID:**
   - Зайти в настройки сайта в Netlify
   - Site settings → General → Site details
   - Скопировать Site ID

### Добавление секретов в GitHub:

1. Зайти в репозиторий на GitHub
2. Settings → Secrets and variables → Actions
3. Добавить новые repository secrets:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`

## Структура файлов после сборки

После выполнения build workflow, структура файлов для Netlify будет:

```
netlify-build/
├── index.html          # Скопирован из modal/
├── assets/             # Скопирован из modal/assets/
│   ├── css/
│   ├── img/
│   └── js/
└── [файлы из dist/]    # wallet-modal.es.js, wallet-modal.umd.js и т.д.
```
