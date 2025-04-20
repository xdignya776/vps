# DG Servers

## Overview
DG Servers is a modern web application designed to provide VPS hosting services. Built with cutting-edge technologies, it offers a seamless user experience for managing VPS instances, billing, and more.

## Features
- **Responsive Design**: Fully responsive layout for all devices.
- **VPS Management**: Manage VPS instances, view utilization, and access server credentials.
- **Billing System**: Integrated billing system with subscription management.
- **Authentication**: Secure login and signup with two-factor authentication.
- **Dynamic Pricing**: Interactive pricing plans and discounts.
- **Contact and Support**: Contact forms and support center for user assistance.

## Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn-ui
- **Build Tool**: Vite
- **Backend Integration**: Supabase

## Project Structure
The project is organized as follows:

```
src/
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── integrations/     # Third-party integrations (e.g., Supabase)
├── lib/              # Utility functions
├── pages/            # Page components for routing
├── services/         # Service files for API calls and business logic
├── supabase/         # Supabase functions and configuration
```

## Getting Started

### Prerequisites
- Node.js and npm installed ([Install Node.js](https://nodejs.org/))

### Installation
1. Clone the repository:
   ```bash
   git clone <YOUR_GIT_URL>
   ```
2. Navigate to the project directory:
   ```bash
   cd dgservers.gr
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
Start the development server with hot reloading:
```bash
npm run dev
```

### Building for Production
To create a production build:
```bash
npm run build
```

### Previewing the Production Build
To preview the production build locally:
```bash
npm run preview
```

## Deployment
This project can be deployed using platforms like Netlify or Vercel. Simply build the project and upload the `dist/` folder to your hosting provider.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or support, please contact us at [support@dgservers.com](mailto:support@dgservers.com).
