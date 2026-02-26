# Habit Tracker

A responsive habit tracking application built with React and TypeScript. Track your daily habits, monitor progress, and build consistency with an intuitive and visually appealing interface.

## 🌟 Features

- Habit Management: Create, edit, and delete habits with custom names and colors
- Weekly Tracking: Track habits on a 7-day weekly basis with visual checkboxes
- Progress Visualization: Progress bars and completion percentages for each habit
- Streak Tracking: Monitor consecutive days of habit completion
- Filtering & Search: Filter habits by completion status and search by name
- Sorting Options: Sort habits by name, streak length, or creation date
- Dark/Light Theme: Toggle between dark and light themes
- Responsive Design: Fully responsive design that works on all devices
- Local Storage: Automatically saves your progress locally
- Accessibility: WCAG compliant with keyboard navigation and screen reader support

## 🏗️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling
- **Lucide React** - Icons
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🔧 Development Guidelines

This project uses ESLint and Prettier for code quality and formatting:

- Code is automatically formatted on save
- Run `npm run lint` to check for issues
- Run `npm run format` to format all files
- Follow the established TypeScript and React best practices

## 🛠️ Installation

This project lives inside an **Nx monorepo** (`test/Habits-Tracker/`). Two apps co-exist: `habit-tracker-pre-audit` (original) and `habit-tracker-post-audit` (audited version).

```bash
git clone https://github.com/yourusername/habit-tracker.git
cd test/Habits-Tracker
npm install
```

### Available Nx commands

```bash
# Serve an app (port 4200)
npx nx serve habit-tracker-post-audit

# Build for production
npx nx build habit-tracker-post-audit

# Run unit tests (67 tests)
npx nx test habit-tracker-post-audit

# Run E2E tests (Cypress, 30 scenarios)
npx nx e2e habit-tracker-post-audit

# Launch Storybook (port 6006)
cd apps/habit-tracker-post-audit && npx storybook dev -p 6006

# Lint
npx nx lint habit-tracker-post-audit

# Visualise project graph
npx nx graph
```

## 🎯 Usage

Adding a Habit

1. Click the "+" button in the "Add New Habit" section
2. Enter a habit name
3. Choose a color from the color picker
4. Click "Add Habit"

### Tracking Progress

- Click on the day checkboxes to mark habits as complete
- Progress bars show weekly completion percentage
- Streak badges display consecutive completion days
- Managing Habits
- Edit: Click the "Edit" button on any habit card
- Delete: Hover over a habit card and click "Delete"
- Reset Progress: Use the "Reset Progress" button in the header
- Filtering and Sorting
- Search: Use the search bar to find specific habits
- Filter: Choose between "All", "Completed", or "Incomplete" habits
- Sort: Sort by creation date, name, or streak length

## 🏗️ Project Structure

```bash
habit-tracker/
├── src/
│   ├── components/          # React components
│   │   ├── AddHabitForm.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── EditHabitModal.tsx
│   │   ├── HabitCard.tsx
│   │   ├── HabitsFilter.tsx
│   │   ├── HabitsList.tsx
│   │   ├── Header.tsx
│   │   └── ProgressBar.tsx
│   ├── constants/           # Application constants
│   │   └── colors.ts
│   ├── styles/              # CSS modules
│   │   ├── components/      # Component-specific styles
│   │   ├── accessibility.css
│   │   ├── responsive.css
│   │   └── reset.css
│   ├── types/               # TypeScript type definitions
│   │   └── Habit.ts
│   ├── utils/               # Utility functions
│   │   └── habitUtils.ts
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json
└── vite.config.ts
```

## 🎨 Design Features

Modern UI: Clean, minimalist design with smooth animations
Color-Coded Habits: 5 predefined colors to categorize habits
Visual Progress: Progress bars and completion badges
Responsive Grid: Adaptive layout for different screen sizes
Hover Effects: Interactive elements with visual feedback

## ♿ Accessibility

Full keyboard navigation support
ARIA labels and descriptions
High contrast mode support
Reduced motion preferences
Screen reader compatibility
Focus management for modals

## 🌐 Browser Support

Chrome/Chromium 88+
Firefox 85+
Safari 14+
Edge 88+

## 📈 Performance

Lightweight: Minimal bundle size with tree-shaking
Fast Loading: Vite's optimized build process
Efficient Rendering: React 19's concurrent features
Local Storage: No external API calls required

## Run a Docker container locally

```bash
npm run build
docker build -t react-habit-tracker .
docker rm -f habit-tracker
docker run -d -p 8080:80 --name habit-tracker react-habit-tracker
```

## � Audit & Improvements

A full audit was conducted on the original app and led to the `habit-tracker-post-audit` version. The audit covered four domains:

| Domain             | What was done                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **QA Testing**     | 0 → 67 unit/component tests (Jest + Testing Library) + 30 E2E scenarios (Cypress)                                   |
| **Accessibility**  | 15+ WCAG 2.1 AA fixes: skip link, ARIA roles, contrast ratio, focus management, live region                         |
| **Design System**  | 40+ CSS tokens (spacing, typography, layout, transitions) — 100% of hardcoded values migrated. 7 Storybook stories. |
| **Eco-conception** | Lazy loading for modals, `useCallback`/`useMemo` to reduce unnecessary renders                                      |

**Tools used:** axe DevTools, Lighthouse, Storybook 10.x, Cypress, Nx CLI.

Full audit findings and metrics are documented in [`test/Habits-Tracker/AUDIT_REPORT.md`](test/Habits-Tracker/AUDIT_REPORT.md).

---

## �🔮 Future Enhancements

Monthly/yearly habit tracking views
Habit categories and tags
Export/import functionality
Habit statistics and analytics
Reminder notifications
Multiple habit templates
Social sharing features
Backend integration for cloud sync

## 👨‍💻 Author

Léo Joly--Jehenne

---
