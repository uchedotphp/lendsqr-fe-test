# Lendsqr Frontend Engineering Assessment

A React TypeScript application built for the Lendsqr Frontend Engineering Assessment, implementing a comprehensive admin dashboard with user management capabilities.

## 🎯 Assessment Overview

This project demonstrates proficiency in:
- **Visual Fidelity**: Pixel-perfect implementation matching Figma designs
- **Code Quality**: Well-structured, maintainable code with TypeScript
- **Best Practices**: Modern React patterns, proper state management, and responsive design
- **Unit Testing**: Comprehensive test coverage with positive and negative scenarios
- **Performance**: Optimized rendering and data fetching strategies

## ✨ Features Implemented

### 🔐 Authentication System
- **Login Page**: Form validation, password visibility toggle, error handling
- **Protected Routes**: Route guards for authenticated users
- **Session Management**: Local storage-based authentication persistence

### 📊 Dashboard
- **KPI Cards**: Key performance indicators with icons and animations
- **Quick Actions**: Actionable cards for common admin tasks
- **Recent Activities**: Real-time activity feed with status badges
- **Responsive Layout**: Mobile-first design approach

### 👥 Users Management
- **Users Table**: Paginated data table with 500+ mock records
- **Advanced Filtering**: Search and filter by organization, username, email, phone, date, status
- **Pagination**: Configurable page sizes (10, 20, 50, 100)
- **Status Management**: User status badges and actions

### 👤 User Details
- **Comprehensive Profile**: Detailed user information across multiple tabs
- **Tab Navigation**: General details, Documents, Bank Details, Loans, Savings, App and System
- **Local Storage**: Cached user details for improved performance
- **Action Buttons**: Blacklist and activate user functionality

### 🎨 UI/UX Features
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Modern UI**: Clean, professional design with consistent styling
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Graceful error states and user feedback
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠 Tech Stack

### Core Technologies
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5.8.3**: Full type safety throughout the application
- **Vite 7.0.0**: Fast build tool and development server
- **React Router 7.6.3**: Client-side routing with lazy loading

### Styling & UI
- **SCSS**: Advanced CSS preprocessing with variables and mixins
- **CSS Modules**: Scoped styling for component isolation
- **Responsive Design**: Mobile-first approach with breakpoints

### State Management & Data
- **React Context**: Lightweight state management for app-wide state
- **React Hook Form**: Performant form handling with validation
- **Zod**: Type-safe schema validation
- **Axios**: HTTP client for API requests

### Testing
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **MSW (Mock Service Worker)**: API mocking for development and testing

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript ESLint**: Type-aware linting rules
- **Prettier**: Code formatting (via ESLint)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI

# Linting
npm run lint         # Run ESLint
```

## 📱 Application Structure

```
src/
├── assets/          # Icons and images
├── components/      # Reusable UI components
│   ├── ui/         # Base UI components (Button, Input, Card, etc.)
│   ├── users/      # User-specific components
│   └── ...
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts
├── pages/          # Page components
├── router/         # Routing configuration
├── schemas/        # Zod validation schemas
├── services/       # API services and mock data
├── state-management/ # Context providers
├── styles/         # Global styles and variables
├── test/           # Test files
└── utils/          # Utility functions
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_LOGIN_EMAIL=uchedotphp@test.com
VITE_LOGIN_PASS=adminpassword

The above details is your login into the platform.
```

### Mock API
The application uses MSW (Mock Service Worker) to simulate a real API:
- **Login**: `/login` (POST)
- **Users**: `/users` (GET) with pagination and filtering
- **User Details**: `/users/:id/:tab` (GET)
- **Dashboard**: `/dashboard` (GET)

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: User interactions and data flow
- **Visual Tests**: Component rendering and styling
- **Error Scenarios**: Network failures and edge cases

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:run -- --coverage

# Run specific test file
npm run test UserDetails.test.tsx
```

### Test Structure
- **Positive Scenarios**: Happy path testing
- **Negative Scenarios**: Error handling and edge cases
- **Visual Fidelity**: Component structure and content
- **Responsive Design**: Mobile and desktop layouts
- **User Interactions**: Click events and form submissions

## 📊 Assessment Compliance

### ✅ Requirements Met

1. **4 Pages Implemented**:
   - ✅ Login Page
   - ✅ Dashboard Page  
   - ✅ Users Page
   - ✅ User Details Page

2. **Mock API with 500+ Records**:
   - ✅ MSW setup with comprehensive user data
   - ✅ Pagination and filtering support
   - ✅ Realistic data structure

3. **Local Storage Implementation**:
   - ✅ User details caching
   - ✅ Authentication persistence
   - ✅ Performance optimization

4. **Mobile Responsive**:
   - ✅ Mobile-first design
   - ✅ Tablet and desktop breakpoints
   - ✅ Touch-friendly interactions

5. **Visual Fidelity**:
   - ✅ Pixel-perfect implementation
   - ✅ Consistent design system
   - ✅ Professional UI/UX

6. **Code Quality**:
   - ✅ TypeScript throughout
   - ✅ Modern React patterns
   - ✅ Clean architecture
   - ✅ Comprehensive documentation

7. **Unit Testing**:
   - ✅ Positive and negative scenarios
   - ✅ Component testing
   - ✅ Integration testing
   - ✅ Error handling tests

8. **Best Practices**:
   - ✅ Semantic HTML
   - ✅ Accessibility features
   - ✅ Performance optimization
   - ✅ Security considerations

## 🎨 Design System

### Color Palette
- **Primary**: #213F7D (Dark Blue)
- **Secondary**: #39CDCC (Cyan)
- **Success**: #39CD62 (Green)
- **Warning**: #E9B200 (Yellow)
- **Error**: #E4033B (Red)
- **Text Primary**: #213F7D
- **Text Secondary**: #545F7D

### Typography
- **Font Family**: Work Sans
- **Font Weights**: 400, 500, 600, 700
- **Font Sizes**: 12px, 14px, 16px, 24px, 40px


## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Environment Variables for Production
Set the following in your deployment platform:
- `VITE_LOGIN_EMAIL`: Admin email
- `VITE_LOGIN_PASS`: Admin password

## 📝 API Documentation

### Authentication
```typescript
POST /login
Body: { email: string, password: string }
Response: { token: string, user: UserProfile }
```

### Users
```typescript
GET /users?page=1&per_page=10&status=active
Response: { 
  kpis: Kpi[], 
  records: UserProfile[], 
  pagination: PaginationData 
}
```

### User Details
```typescript
GET /users/:id/:tab
Response: UserProfile
```

### Dashboard (BONUS)
```typescript
GET /dashboard
Response: { 
  kpis: Kpi[], 
  activities: Activity[], 
  quickStats: QuickStats 
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for the Lendsqr Frontend Engineering Assessment. All rights reserved.

## 📞 Support

For questions about this assessment implementation, please contact:
- **Email**: careers@lendsqr.com
- **Repository**: https://github.com/your-username/lendsqr-fe-test

---

**Built with ❤️ for Lendsqr Frontend Engineering Assessment**
