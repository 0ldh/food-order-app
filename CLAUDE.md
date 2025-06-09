# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
yarn dev          # Start Vite development server

# Building
yarn build        # TypeScript compilation + Vite build
yarn preview      # Preview production build

# Testing
yarn test         # Run tests with react-scripts (watch mode)

# Alternative start (legacy)
yarn start        # Start with react-scripts
```

## Architecture Overview

### Cart State Management
- Uses React Context API with `useReducer` pattern for cart state management
- Located in `src/context/CartProvider.tsx` with interface in `src/context/CartContext.tsx`
- Actions: `ADD`, `REMOVE`, `CLEAR` for cart operations
- Performance optimized with `useCallback` and `useMemo` for handlers and context value
- Cart state includes: items array, totalPrice, and action handlers (addItem, removeItem, clearCart)

### Checkout Flow
- Complete checkout implementation with customer information form (`src/components/Cart/Checkout.tsx`)
- Multi-step process: Cart → Checkout Form → Order Submission → Success Screen
- Form validation for required fields (name, phone, address)
- Order completion clears cart and shows success confirmation
- Integrated into main Cart component with state management for checkout phases

### Component Architecture
- **Layout**: Header with cart button, main content area
- **Meals**: Static meal data display with add-to-cart functionality
- **Cart**: Modal-based cart with checkout integration
- **UI Components**: Reusable Modal, Card, Input components

### Styling Pattern
- CSS Modules used throughout (`*.module.css`)
- Component-specific styling with BEM-like naming conventions
- Consistent color scheme: primary `#8a2b06`, success `#4caf50`

### Build System Notes
- **Mixed tooling**: Vite for development/build, react-scripts for testing
- TypeScript strict mode enabled
- ESLint configuration extends react-app rules with custom bb8dd config
- Uses `vite-tsconfig-paths` for path resolution

### State Flow
1. App.tsx manages cart modal visibility
2. CartProvider wraps entire app, provides cart context
3. MealItem components dispatch ADD actions to cart
4. Cart component handles checkout flow and order completion
5. Checkout form validates and submits order data
6. Success state clears cart and shows confirmation