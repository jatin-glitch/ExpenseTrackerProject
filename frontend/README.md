# ExpenseTracker Pro

A production-grade expense tracking SaaS application built with Next.js, TypeScript, and Tailwind CSS. Features a modern, scalable architecture with premium UX design inspired by leading SaaS products.

## 🚀 Features

### Core Functionality
- **Dashboard**: Real-time KPI cards, interactive charts, and recent transactions
- **Expense Management**: Advanced data table with sorting, filtering, and search
- **Analytics**: Comprehensive spending insights with multiple chart types
- **Import/Export**: JSON and CSV data management with drag-and-drop support
- **Add/Edit Expenses**: Modal forms with real-time validation

### Design & UX
- **Modern SaaS Design**: Clean aesthetic inspired by Stripe, Linear, and Notion
- **Dark/Light Mode**: Full theme support with CSS variables
- **Responsive Design**: Mobile-first approach with bottom navigation
- **Micro-interactions**: Smooth animations and transitions
- **Command Palette**: Quick actions with ⌘K shortcut
- **Toast Notifications**: User feedback for all actions

### Technical Architecture
- **Next.js 15**: App Router with TypeScript
- **Tailwind CSS**: Custom design tokens and 8px spacing system
- **Zustand**: Lightweight state management
- **Framer Motion**: Production-ready animations
- **Radix UI**: Accessible component primitives
- **Recharts**: Interactive data visualization

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── expenses/          # Expense management
│   ├── analytics/         # Analytics page
│   └── import-export/     # Data management
├── components/
│   ├── ui/                # Reusable UI primitives
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
├── lib/                   # Utility functions
├── store/                 # Zustand state management
├── types/                 # TypeScript definitions
└── hooks/                 # Custom React hooks
```

## 🎨 Design System

### Colors & Theming
- CSS variables for consistent theming
- Light/dark mode support
- Neutral palette with primary accent
- 8px spacing system throughout

### Components
- Consistent rounded-2xl corners
- Soft shadows and subtle borders
- Hover states and micro-interactions
- Accessible by default

## 📱 Mobile Responsiveness

- **Mobile Navigation**: Bottom tab bar with slide-out menu
- **Responsive Tables**: Card-based layout on small screens
- **Touch-Friendly**: Appropriate tap targets and gestures
- **Adaptive Layout**: Collapsible sidebar and reflowing content

## 🚀 Performance

- **Lazy Loading**: Heavy components loaded on demand
- **Optimized Renders**: Efficient state management
- **Tree Shaking**: Minimal bundle size
- **Image Optimization**: Next.js automatic optimization

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### State Management
Uses Zustand with persistence for:
- Expense data and categories
- Theme preferences
- UI state management

### Form Validation
React Hook Form with Zod schemas for:
- Real-time validation
- Type safety
- Error handling

## 📊 Data Features

### Sample Data
Pre-loaded with sample expenses for demonstration:
- Multiple categories with icons and colors
- Realistic spending patterns
- Date ranges for analytics

### Import/Export
- **JSON Format**: Full expense data with metadata
- **CSV Format**: Spreadsheet-compatible export
- **Validation**: Error handling and user feedback
- **Drag & Drop**: Modern file upload experience

## 🎯 Premium Features

### Command Palette
- Press `⌘K` (or `Ctrl+K`) to open
- Quick navigation to any page
- Theme switching
- Search functionality

### Analytics Dashboard
- Monthly spending trends
- Category breakdowns
- Daily spending patterns
- Interactive tooltips and filters

### Advanced Table
- Multi-column sorting
- Category filtering
- Real-time search
- Bulk actions ready

## 🔒 Accessibility

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus states
- **Semantic HTML**: Proper element usage

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
```
Deploy to Vercel for optimal performance.

### Other Platforms
The application is platform-agnostic and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
