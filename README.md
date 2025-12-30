# Hogger io

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748)](https://www.prisma.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A web application for viewing World of Warcraft Classic character profiles, guild rosters, and leaderboards. Built with Next.js, TypeScript, and Prisma.

🔗 **Live site**: [hogger.io](https://hogger.io)

## Features

- 🎮 **Character Profiles**: View detailed character stats, gear, talents, achievements, and PvP statistics
- 🏰 **Guild Rosters**: Browse guild member lists and statistics
- 🏆 **Leaderboards**: Rankings by gear score (outdated), item level, and HKs
- 🔍 **Search**: Find characters and guilds across all Classic realms

### Supported Game Types

- Mists of Pandaria Classic (MoP) 🐼
- Season of Discovery (SoD)
- Classic Era (Level 60)

## Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn**
- **Blizzard API credentials** (free - see setup below)
- **PostgreSQL database** (optional) - only needed for recently seen characters/guilds/leaderboards (see database setup)
- **Warcraft Logs API credentials** (optional) - only needed for parse data fetching (experimental feature)
- **Docker** (optional) - for the model viewer

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/HoggerIO.git
cd HoggerIO
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

#### Get Blizzard API Credentials (Required)

1. Go to https://develop.battle.net/access/clients
2. Log in with your Battle.net account
3. Click **"Create Client"**
4. Give it a name (e.g., "WoW Armory Local Dev")
5. Copy the **Client ID** and **Client Secret**
6. Paste them into your `.env` file:

See https://www.youtube.com/watch?v=eLJz0ApEKPg for a more in-depth guide on the blizzard API

```env
BLIZZARD_CLIENT_ID="your_client_id_here"
BLIZZARD_CLIENT_SECRET="your_client_secret_here"
```

#### Warcraft Logs API Setup (Experimental - Optional)

> **⚠️ Experimental Feature**: The Warcraft Logs integration is experimental and may not be up to date with the latest bosses or raid content. Parse data is fetched manually via a button on character profiles.

The Warcraft Logs integration allows you to fetch and display character parse rankings (DPS/HPS percentages) for raid encounters. This feature requires additional API credentials:

1. Go to https://www.warcraftlogs.com/api/clients
2. Log in with your Warcraft Logs account
3. Click **"Create Client"**
4. Give it a name (e.g., "HoggerIO Local Dev")
5. Copy the **Client ID** and **Client Secret**
6. Add them to your `.env` file:

```env
WARCRAFTLOGS_CLIENT_ID="your_warcraftlogs_client_id_here"
WARCRAFTLOGS_CLIENT_SECRET="your_warcraftlogs_client_secret_here"
```

**Note**: Without these credentials, the parse fetching feature will be disabled. Character profiles will still work normally, but you won't be able to fetch parse data from Warcraft Logs.

#### Database Setup (Optional)

The database is optional for local development. You can view individual character profiles without it, as character data is fetched directly from the Blizzard API and item data is stored in JSON files.

However, features like recent characters, recent guilds, and leaderboards require a database. See the [Database Setup section](#database-setup-optional) below for instructions.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Setup (Optional)

The database is **optional** for local development. It's required if you want to use:

- **Character data caching** - Store and cache character profiles
- **Leaderboards** - View and contribute to leaderboard rankings
- **Recent activity** - See recently viewed characters and guilds

#### Option 1: Supabase (Recommended - Free Tier Available)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project (wait for it to finish provisioning)
3. Go to **Settings** → **Database** in your project dashboard
4. Scroll to **Connection string** section and select **URI** format
5. Copy the connection string and replace `[YOUR-PASSWORD]` with your database password (found in **Settings** → **Database** → **Database password**)
6. Add both connection strings to your `.env` file:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

7. Run migrations:

```bash
npx prisma migrate dev
```

#### Option 2: Local PostgreSQL

If you have PostgreSQL installed locally:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/wow_armory"
DIRECT_URL="postgresql://username:password@localhost:5432/wow_armory"
```

Then run migrations:

```bash
npx prisma migrate dev
```

## Model Viewer Setup (Optional)

The 3D character model viewer requires access to Wowhead's model viewer files from `https://wow.zamimg.com`. Due to CORS (Cross-Origin Resource Sharing) policies, a proxy server is needed to bypass these restrictions during local development.

> **Note**: The model viewer is optional. Without it, character profiles will still work but won't display the 3D character model.

### Quick Setup with Docker

Choose one of the following Docker options:

#### Option 1: Docker Compose (Recommended)

1. Create a `docker-compose.yml` file in your project root:

```yaml
version: "3"

services:
  bypass-cors-policies:
    image: miorey/bypass-cors-policies:v1
    environment:
      - SERVER_NAME=https://wow.zamimg.com
      - PRESERVE_STORAGE=true
    volumes:
      - ./storage:/usr/src/app/storage
    ports:
      - "2999:3000"
```

2. Start the container:

```bash
docker-compose up -d
```

#### Option 2: Docker Run Command

Run the container directly:

```bash
docker run -d \
  --name bypass-cors-proxy \
  -e SERVER_NAME=https://wow.zamimg.com \
  -v "$(pwd)/storage:/usr/src/app/storage" \
  -p 2999:3000 \
  miorey/bypass-cors-policies:v1
```

#### Option 3: Docker Desktop

1. Open Docker Desktop
2. Go to **Containers** → **Run** or use **Images** → select `miorey/bypass-cors-policies:v1` → **Run**
3. Configure:
   - **Environment variables**: Add `SERVER_NAME` with value `https://wow.zamimg.com`
   - **Ports**: Map `2999:3000`
   - **Volumes**: Mount `./storage` to `/usr/src/app/storage`

### Configure Next.js

After starting the proxy server, add this to your `.env` file:

```env
NEXT_PUBLIC_CONTENT_PATH="http://localhost:2999"
```

Then restart your development server:

```bash
npm run dev
```

The proxy server caches files locally in the `storage/` directory. On first load, it fetches files from Wowhead and stores them. Subsequent requests use cached files, reducing load on Wowhead's servers.

### Troubleshooting

#### Clearing the Cache

If you encounter issues with outdated model viewer files, clear the cache:

```bash
# If using Docker Compose
docker-compose exec bypass-cors-policies sh -c "rm -rf /usr/src/app/storage/*"

# If using docker run
docker exec -it bypass-cors-proxy sh -c "rm -rf /usr/src/app/storage/*"

# Or directly from your host machine (if using volume mount)
rm -rf storage/*
```

### Alternative: Node.js Setup

If you prefer not to use Docker, you can run the bypass-cors-policies server directly with Node.js. See the [bypass-cors-policies repository](https://github.com/Miorey/bypass-cors-policies#local-setup) for detailed instructions.

### How It Works

The model viewer uses the [wow-model-viewer](https://github.com/Miorey/wow-model-viewer) library, which requires access to Wowhead's model viewer assets. The bypass-cors-policies proxy:

- Intercepts requests to Wowhead's CDN
- Fetches files and adds appropriate CORS headers
- Caches files locally for faster subsequent loads
- Serves files to the Next.js application

**Additional Resources:**

- [bypass-cors-policies repository](https://github.com/Miorey/bypass-cors-policies)
- [wow-model-viewer documentation](https://github.com/Miorey/wow-model-viewer)

## Architecture

### Tech Stack

- **Framework**: [Next.js 15.3](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.4](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma 5.7](https://www.prisma.io/)
- **UI Library**: [Chakra UI 2.10](https://chakra-ui.com/)

### Project Structure

```
app/
├── _components/        # Shared React components
├── _serverFunctions/   # Server-side data fetching functions
├── _types/             # TypeScript type definitions
├── _modelViewer/       # 3D character model viewer code
├── _utils/             # Utility functions and helpers
├── character/          # Character profile pages and components
├── guild/              # Guild roster pages and components
├── leaderboards/       # Leaderboard pages and components
└── page.tsx            # Homepage

json/                   # Item data and talent trees
prisma/                 # Database schema and migrations
scripts/                # Utility scripts for data processing
```

### Key Features

**Character Profiles**: Fetches character data from the Blizzard API and caches it in the database for 7 days. Calculates gear scores, displays talents, achievements, and PvP statistics.

**Item Data**: Item levels, display IDs (required for 3D model rendering), and icons are stored in JSON files (`json/items.json` and `json/itemsEra.json`) as they are not provided directly from the Blizzard API.

**Leaderboards**: Generated from cached character data in the database, ranking characters by gear score, item level, and honor kills.

**Guild Rosters**: Displays guild member lists with character statistics and rankings.

## Available Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production (includes Prisma generation)
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b yourGitHubName/amazing-feature`)
3. Make your changes
4. Test locally with `npm run dev`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin yourGitHubName/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 🐛 **Bug Reports**: Open an issue on GitHub
