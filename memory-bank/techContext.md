# Technical Context

## Technology Stack
1. Core Framework
   - React (with TypeScript)
   - Vite build system
   - SCSS for styling

2. Testing Infrastructure
   - React Testing Library
   - Test setup with custom configurations

3. Development Tools
   - ESLint for code quality
   - TypeScript for type safety
   - JSON Schema for data validation

## Dependencies
1. Primary Dependencies
   ```json
   {
     "react": "^18.x",
     "typescript": "^5.x",
     "vite": "^5.x"
   }
   ```

2. Development Dependencies
   - ESLint configuration
   - TypeScript configurations (tsconfig files)
   - Testing utilities

## Technical Constraints
1. Browser Compatibility
   - Modern browser support required
   - Responsive design implementation

2. Performance Requirements
   - Efficient form handling
   - Responsive validation
   - Smooth modal transitions

3. Data Management
   - JSON schema validation
   - Form state management
   - Context-based state sharing

## Development Environment
1. Configuration Files
   - tsconfig.json for TypeScript
   - eslint.config.js for linting
   - vite.config.ts for build
   - i18n.ts for translations

2. Project Structure
   ```
   /
   ├── src/              # Source code
   ├── public/           # Static assets
   ├── test/            # Test files
   ├── docs/            # github pages deployment
   └── backend/         # Backend schemas
   ```

3. Build Process
   - Vite development server
   - TypeScript compilation
   - SCSS processing
   - Asset handling

## Integration Points
1. Data Storage
   - JSON schema definitions
   - Common chemicals database
   - Validation rules

2. External Resources
   - Image assets
   - Documentation files
   - Spreadsheet templates

3. Localization
   - English locale
   - Spanish locale
   - i18n integration

## Development Practices
1. Code Organization
   - Component-based architecture
   - Utility functions in helpers
   - Shared contexts for state

2. Testing Strategy
   - Component isolation
   - Business logic verification
   - Helper function testing

3. Documentation
   - Code comments
   - JSON schema definitions
   - Test specifications
