# Tracking System Documentation

## Overview
This tracking system allows you to redirect users to different pages based on the `action` parameter in the URL. The system logs visitor data to MongoDB and redirects users to appropriate pages.

## Server Setup
The Node.js server runs on port 5050. Make sure to start it with:
```bash
cd Nodejs
node server.js
```

## URL Format
The tracking URL follows this format:
```
http://localhost:5050/track?pid={project_id}&uid={user_id}&action={action_type}
```

### Parameters:
- `pid`: Project ID (required)
- `uid`: User ID (required) 
- `action`: Action type (required) - can be `Complete`, `Terminate`, or `Quotafull`

## Available Actions

### 1. Complete Action
**URL:** `http://localhost:5050/track?pid=111&uid=1110&action=Complete`
**Redirects to:** `/complete`
**Page:** Shows a completion message thanking the user for participating

### 2. Terminate Action
**URL:** `http://localhost:5050/track?pid=111&uid=1110&action=Terminate`
**Redirects to:** `/terminate`
**Page:** Shows a termination message indicating the user was not in the intended interest group

### 3. Quotafull Action
**URL:** `http://localhost:5050/track?pid=111&uid=1110&action=Quotafull`
**Redirects to:** `/quotafull`
**Page:** Shows a message indicating the quota is full

## Test Page
Visit `http://localhost:5050/test-tracking` to access a test page with buttons for all three actions.

## Data Storage
All tracking data is automatically saved to MongoDB with the following fields:
- `projectId`: The project ID from the URL
- `userId`: The user ID from the URL
- `status`: The action type (Complete/Terminate/Quotafull)
- `ip`: The visitor's IP address
- `createdAt`: Timestamp of when the data was saved

## Example Usage

### Testing in Browser
1. Start the server: `cd Nodejs && node server.js`
2. Open your browser and visit: `http://localhost:5050/test-tracking`
3. Click on any of the test buttons to see the redirects in action

### Direct URL Testing
- Complete: `http://localhost:5050/track?pid=111&uid=1110&action=Complete`
- Terminate: `http://localhost:5050/track?pid=111&uid=1110&action=Terminate`
- Quotafull: `http://localhost:5050/track?pid=111&uid=1110&action=Quotafull`

## Files Created
- `public/complete.html` - Completion page
- `public/terminate.html` - Termination page (matches the design you provided)
- `public/quotafull.html` - Quota full page
- `public/test-tracking.html` - Test page with buttons
- Updated `Nodejs/routes/visitor.js` - Enhanced track route with redirects
- Updated `Nodejs/server.js` - Added static file serving

## Notes
- All pages use the same "Insights Elite" branding and design
- The termination page matches exactly the design you showed in the image
- Data is logged to console and saved to MongoDB for tracking purposes
- If an invalid action is provided, it defaults to the terminate page 