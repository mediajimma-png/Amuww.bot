# WhatsApp Bot

A WhatsApp bot built with Baileys that supports admin and user commands.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

```bash
npm install
```

## Setup

1. Ensure the authentication files are in the `auth_info_baileys` directory
2. Update the admin number in `index.js` if needed:
   - `ADMIN_NUMBER = "251917018181@s.whatsapp.net"`

## Running the Bot

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## Features

- **Admin Menu**: Send "menu" to admin number to see admin commands
- **User Menu**: Send "menu" to the bot for regular user menu
- **Authentication**: Uses device pairing code for secure WhatsApp authentication

## Admin Commands

- `add product` - Add a new product
- `edit product` - Edit existing product

## How to Use

1. Start the bot with `npm start`
2. Follow the prompt to enter your WhatsApp number
3. Use the pairing code to link the device in WhatsApp settings
4. Send "menu" to test the bot

## Notes

- The bot stores authentication state in `auth_info_baileys` directory
- Admin number is hardcoded in the bot - update as needed
- Make sure WhatsApp is set to allow linked devices
