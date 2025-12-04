# icecream-back-master

This Firebase/Node/Express app was prepared for serverless deployment to Vercel.

Key changes made for Vercel:
- Export `index.js` as a serverless handler by using `serverless-http`.
- Moved file uploads to memory storage and Cloudinary. Removed local disk storage.
- Use environment variables for DB and cloud credentials (see `.env.example`).
- Implemented DB connection reuse for `mongoose` to avoid repeated connections on serverless cold starts.

Quick local setup:

1. Copy `.env.example` to `.env` and fill production values.
2. Install dependencies:

```bash
npm install
```

3. Run locally:

```bash
npm run dev
# or
npm start
```

Deploying to Vercel (UI)

1. Push your repo to GitHub.
2. Go to Vercel UI -> Create New Project -> Import Git Repository.
3. Assign Environment Variables in Project Settings (Production / Preview):
   - MONGO_URI
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
4. Deploy.

Notes:
- The app uses Cloudinary for file uploads—no local storage is used.
- For very large uploads or better performance, consider direct-to-cloud uploads from the client.

