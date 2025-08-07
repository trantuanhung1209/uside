<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Copilot Instructions for USide React Project

## Project Overview
This is a modern React application built with TypeScript and Vite. The project follows a well-structured architecture with organized folders for maintainability and scalability.

## Code Style and Conventions
- Use TypeScript for all new files
- Follow React functional components with hooks
- Use proper TypeScript interfaces and types
- Implement proper error handling
- Write clean, readable code with meaningful variable names
- Use Tailwind CSS for styling (component classes already set up)

## Project Structure
- `src/components/` - Reusable UI components organized by type (ui, layout)
- `src/hooks/` - Custom React hooks
- `src/services/` - API services and external integrations  
- `src/utils/` - Utility functions and helpers
- `src/types/` - TypeScript type definitions
- `src/constants/` - Application constants and configuration
- `src/pages/` - Page components and routes
- `src/styles/` - Global styles and CSS modules

## Best Practices
- Always define proper TypeScript interfaces for props and data structures
- Use custom hooks for complex state logic
- Implement proper loading and error states
- Follow accessibility guidelines (a11y)
- Use semantic HTML elements
- Implement responsive design principles
- Use environment variables for configuration

## Testing
- Write unit tests for utility functions
- Create component tests for complex UI components
- Use React Testing Library for component testing
- Test user interactions and edge cases

## API Integration
- Use the existing ApiService class for HTTP requests
- Define proper TypeScript interfaces for API responses
- Implement proper error handling and loading states
- Use React Query or SWR for data fetching when appropriate
