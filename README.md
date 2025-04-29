# TRMNL Hello World Plugin

A simple plugin for the TRMNL eink device that displays a "Hello World" message.

## Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Deploy to Vercel: `vercel`

## Usage

This plugin uses the polling strategy for TRMNL. You can configure your TRMNL device to poll the API endpoint:

```
https://your-vercel-deployment-url/api/hello
```

## Configuration

In your TRMNL dashboard:
1. Create a new Private Plugin
2. Select the "Polling" strategy
3. Enter the API URL from your Vercel deployment
4. Create a simple markup template that uses the variables provided by the API 