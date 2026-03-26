# 🚀 ExpenseTracker Pro

A full-stack expense tracking application built with Next.js 16, TypeScript, and Spring Boot. Features modern UI design, comprehensive analytics dashboard, and responsive layout for seamless financial management.

## ✨ Features

### 🎯 Core Functionality
- **📊 Dashboard** - Real-time KPI cards, interactive charts, and recent transactions
- **💳 Expense Management** - Advanced data table with sorting, filtering, and search
- **📈 Analytics** - Comprehensive spending insights with multiple chart types
- **📁 Import/Export** - JSON and CSV data management with drag-and-drop support
- **➕ Add/Edit Expenses** - Modal forms with real-time validation

### 🎨 Design & UX
- **🌗 Modern Design** - Clean aesthetic inspired by Stripe, Linear, and Notion
- **🌓 Dark/Light Mode** - Full theme support with CSS variables
- **📱 Responsive Design** - Mobile-first approach with bottom navigation
- **✨ Micro-interactions** - Smooth animations and transitions
- **⌨️ Command Palette** - Quick actions with ⌘K shortcut
- **🔔 Toast Notifications** - User feedback for all actions

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 21
- **Build Tool**: Maven
- **Database**: H2 (in-memory)
- **ORM**: Spring Data JPA
- **Validation**: Spring Boot Validation
- **Testing**: JUnit 5 + Mockito

## 📦 Installation

### Prerequisites
- Node.js 18+
- Java 21+
- Maven 3.6+

### Frontend Setup
```bash
git clone https://github.com/jatin-glitch/ExpenseTrackerProject.git
cd expense-tracker/frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Backend Setup (Optional)
```bash
cd backend
mvn spring-boot:run
```
API available at [http://localhost:8080](http://localhost:8080)

## 🏗 Project Structure

```
expense-tracker/
├── 📂 frontend/                 # Next.js React Application
│   ├── 📄 package.json          # npm dependencies & scripts
│   ├── 📄 next.config.ts        # Next.js configuration
│   ├── 📄 tsconfig.json         # TypeScript configuration
│   ├── 📄 tailwind.config.ts    # Tailwind CSS configuration
│   ├── 📂 src/                  # Source code
│   │   ├── 📂 app/              # Next.js App Router pages
│   │   ├── 📂 components/        # React components
│   │   ├── 📂 lib/              # Utility functions
│   │   ├── 📂 store/            # Zustand state management
│   │   └── 📂 types/            # TypeScript definitions
│   └── 📂 node_modules/         # npm dependencies
│
├── 📂 backend/                  # Spring Boot Java Application
│   ├── 📄 pom.xml              # Maven configuration & dependencies
│   └── 📂 src/                 # Java source code
│       ├── 📂 main/           # Main application code
│       └── 📂 test/           # Test code
│
└── 📄 README.md               # This file
```

## 🚀 Framework Details

### Frontend Stack
- **Framework**: Next.js 16.2.1 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Package Manager**: npm

### Backend Stack
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 21
- **Build Tool**: Maven
- **Database**: H2 (in-memory)
- **ORM**: Spring Data JPA
- **Validation**: Spring Boot Validation
- **Testing**: JUnit 5 + Mockito

## ✅ Health Check Status

| Component | Status | Details |
|-----------|--------|---------|
| Frontend Framework | ✅ Healthy | Next.js 16.2.1 properly installed |
| Backend Framework | ✅ Healthy | Spring Boot 3.2.0 properly installed |
| Package Managers | ✅ Healthy | npm (frontend) + Maven (backend) |
| Configuration Files | ✅ Complete | All required config files present |
| Dependencies | ✅ Installed | All dependencies properly installed |
| Conflicts | ✅ None | No Angular or conflicting frameworks |

## 🎯 Quick Start Commands

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Backend Development
```bash
cd backend
mvn spring-boot:run    # Start Spring Boot application
mvn clean install      # Build and install dependencies
mvn test              # Run tests
```

## 📱 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080 (when running)

## 🔧 Development Environment

- **Node.js**: Required for frontend
- **Java 21**: Required for backend
- **Maven**: Required for backend
- **Git**: Version control

## 🎮 Usage

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `Esc` | Close modals/palettes |

## 📊 Data Features

### Sample Data
Pre-loaded with realistic sample expenses:
- Multiple categories with icons and colors
- Realistic spending patterns
- Date ranges for analytics

### Import/Export
- **JSON Format**: Full expense data with metadata
- **CSV Format**: Spreadsheet-compatible export
- **Validation**: Error handling and user feedback
- **Drag & Drop**: Modern file upload experience

## 🚀 Deployment

### Frontend (Vercel Recommended)
```bash
cd frontend
npm run build
```

### Backend (Any Platform)
```bash
cd backend
mvn clean package
java -jar target/*.jar
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animations
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [Spring Boot](https://spring.io/projects/spring-boot) - Java framework

---

Made with ❤️ by [Jatin Glitch](https://github.com/jatin-glitch)
