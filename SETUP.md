# HFW App Setup Guide

## Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Google OAuth credentials

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hfw_app"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local` file

## Database Setup

1. Create a PostgreSQL database named `hfw_app`
2. Update the `DATABASE_URL` in your `.env.local` file with your database credentials
3. Run the database migration:

```bash
bunx prisma migrate dev --name init
```

## Running the Application

1. Install dependencies:
```bash
bun install
```

2. Start the development server:
```bash
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- ✅ Google OAuth authentication
- ✅ Protected dashboard route
- ✅ User session management
- ✅ PostgreSQL database with Prisma ORM
- ✅ Responsive UI with Tailwind CSS

## Project Structure

```
hfw-app/
├── app/
│   ├── api/auth/[...nextauth]/route.js  # NextAuth API routes
│   ├── auth/signin/page.js              # Sign-in page
│   ├── dashboard/page.js                # Protected dashboard
│   ├── layout.js                        # Root layout with SessionProvider
│   ├── page.js                          # Home page with redirects
│   └── providers.js                     # SessionProvider wrapper
├── lib/
│   ├── auth.js                          # NextAuth configuration
│   └── prisma.js                        # Prisma client utility
├── prisma/
│   └── schema.prisma                    # Database schema
└── SETUP.md                             # This file
```

## Next Steps

After setting up authentication, you can:

1. Add more user profile fields to the database
2. Create additional protected routes
3. Implement role-based access control
4. Add more OAuth providers (GitHub, Facebook, etc.)
5. Build your application features 