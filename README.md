# Web Data Management App

A React-based web application that provides a modern data management interface with authentication system. This application features a responsive design optimized for desktop and tablet use.

## Features

- **Authentication System**: Secure login/logout functionality with user session management
- **Node.js API Integration**: Full integration with your visitor tracking API
- **Real-time Data**: Live visitor statistics and activity tracking
- **Visitor Management**: Add new visitors and track their activities
- **Data Visualization**: Statistics dashboard with visitor breakdowns
- **Search & Filter**: Advanced search and filtering capabilities
- **Modern Web Interface**: Clean, professional design optimized for desktop screens
- **Application Header**: Professional header with hamburger menu and user dropdown with logout option
- **Manage Data Section**: Real-time statistics with visitor counts and status breakdowns
- **Filter Section**: Form to add new visitor activities to the system
- **Data Table**: Responsive table showing all visitor data with pagination
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Installation

1. Install dependencies for both React and Node.js:
```bash
npm install
cd Nodejs && npm install
```

2. Start MongoDB (make sure MongoDB is running on localhost:27017)

3. Start both React and Node.js servers:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the React app
5. The Node.js API will be running on [http://localhost:5050](http://localhost:5050)

## Login Credentials

Use these demo credentials to access the application:
- **Username**: admin
- **Password**: password

## Project Structure

```
src/
├── components/
│   ├── Login.js                 # Authentication component
│   ├── MobileHeader.js          # Mobile browser simulation
│   ├── AppHeader.js             # Application header with logout
│   ├── ManageDataSection.js     # Real-time statistics dashboard
│   ├── FilterSection.js         # Visitor tracking form
│   ├── DataTable.js             # Visitor data table with API integration
│   └── *.css                    # Component styles
├── services/
│   └── api.js                   # API service for Node.js backend
├── App.js                       # Main application component
├── App.css                      # Main app styles
├── index.js                     # Application entry point
└── index.css                    # Global styles
```

## Technologies Used

- React 18
- Lucide React (for icons)
- CSS3 with mobile-first responsive design

## Responsive Design

The application is designed to work optimally across all devices:
- **Desktop**: Full-width layout with enhanced spacing and larger elements
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Compact layout that maintains functionality
- Modern design with hover effects and smooth transitions

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

The app will open in your default browser and display the mobile interface exactly as shown in the screenshot. 