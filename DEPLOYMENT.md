# Deployment Instructions

## Option 1: Replit (Recommended - Free & Easy)

1. Go to [replit.com](https://replit.com)
2. Click "Create Repl" → "Import from GitHub"
3. Paste: `https://github.com/mediajimma-png/Amuww.bot`
4. Click "Import from GitHub"
5. Click the "Run" button - your bot will start
6. Keep the Repl running or upgrade to Replit Pro for always-on

## Option 2: Railway (Free Tier)

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose `mediajimma-png/Amuww.bot`
5. Add a service and deploy
6. Free tier includes $5/month credit

## Option 3: Render (Free Tier)

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Deploy

## Running the Bot

Once deployed, the bot will:
1. Connect using your auth files from `auth_info_baileys`
2. Stay online and respond to messages
3. Execute admin and user commands

**Note:** Your bot needs the authentication files (`auth_info_baileys`) to work. Make sure they're included in the repository or set as environment variables if needed.
