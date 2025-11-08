# Learnato Forum - Frontend Setup Guide

A modern discussion forum built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## Prerequisites

-   Node.js 16+ installed
-   Backend API running on `http://localhost:5000`

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Features Implemented

### Core Features (MVP)

-   ✅ **User Authentication** - Register, login, logout with JWT cookies
-   ✅ **Create Post** - Add new discussions with title and content
-   ✅ **List Posts** - View all posts sorted by date or votes
-   ✅ **View Post Details** - See full post with all replies
-   ✅ **Add Replies** - Reply to discussions
-   ✅ **Upvote System** - Vote/unvote posts with visual feedback
-   ✅ **Responsive UI** - Fully responsive design for mobile and desktop

### Additional Features

-   ✅ **Search Functionality** - Filter posts by keywords
-   ✅ **Real-time Updates** - Automatic refresh with React Query
-   ✅ **Modern UI** - Beautiful design with smooth animations
-   ✅ **User Profile Menu** - Dropdown menu with user actions

## Tech Stack

-   **Frontend Framework**: React 18 + TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui
-   **State Management**: React Query (TanStack Query)
-   **Routing**: React Router v6
-   **Form Handling**: React Hook Form
-   **Date Formatting**: date-fns
-   **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication forms
│   ├── forum/          # Forum components (posts, replies, votes)
│   ├── layout/         # Layout components (navbar, layout wrapper)
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   └── usePosts.ts     # Posts data fetching hooks
├── pages/              # Page components
│   ├── Home.tsx        # Main forum page
│   ├── PostDetail.tsx  # Individual post view
│   ├── CreatePost.tsx  # Create new post
│   └── Auth.tsx        # Login/Register page
├── services/           # API service layer
│   └── api.ts          # API calls
├── types/              # TypeScript types
│   └── index.ts        # Type definitions
└── App.tsx             # Root component with routing

```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api` with the following endpoints:

### Authentication

-   `POST /users/register` - Create new account
-   `POST /users/login` - Login user
-   `POST /users/logout` - Logout user
-   `GET /users/me` - Get current user

### Posts

-   `GET /posts?sort=date|votes` - Get all posts
-   `POST /posts` - Create new post (auth required)
-   `GET /posts/:id` - Get single post with replies
-   `POST /posts/:id/reply` - Add reply (auth required)
-   `POST /posts/:id/upvote` - Toggle upvote (auth required)

## Environment Configuration

To change the API base URL, update the `API_BASE_URL` constant in `src/services/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:5000/api";
```

## Design System

The application uses a custom design system with:

-   **Primary Color**: Professional blue (#2563eb)
-   **Accent Color**: Amber/Orange for upvotes (#f59e0b)
-   **Semantic Tokens**: All colors defined in CSS variables
-   **Typography**: System font stack optimized for readability
-   **Spacing**: Consistent spacing scale
-   **Animations**: Smooth transitions and hover effects

## Usage Guide

### First Time Setup

1. Visit `http://localhost:5173`
2. Click "Sign In" in the top right
3. Switch to "Sign Up" tab
4. Create an account with username and password
5. You'll be automatically logged in and redirected

### Creating a Post

1. Ensure you're logged in
2. Click "New Post" button in navbar
3. Enter a descriptive title
4. Add detailed content
5. Click "Create Post"

### Interacting with Posts

-   Click on any post title to view details
-   Use the upvote arrow to vote (requires login)
-   Add replies from the post detail page
-   Use search bar to filter posts
-   Toggle between "Recent" and "Top" sorting

## Development Notes

-   **Authentication**: Uses httpOnly JWT cookies for security
-   **State Management**: React Query handles caching and revalidation
-   **Error Handling**: Toast notifications for user feedback
-   **Form Validation**: Client-side validation with HTML5
-   **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Building for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

## Troubleshooting

### API Connection Issues

-   Ensure backend is running on `http://localhost:5000`
-   Check CORS configuration on backend
-   Verify cookies are enabled in browser

### Authentication Issues

-   Clear browser cookies and try again
-   Ensure backend JWT secret is configured
-   Check browser console for error messages

## Future Enhancements

Potential features to add:

-   Mark posts as "Answered"
-   User profile pages
-   Post categories/tags
-   Markdown support in posts
-   Image attachments
-   Email notifications
-   Admin moderation tools
