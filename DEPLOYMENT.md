# Deploy WanderHome

## Render settings

- Service type: Web Service
- Runtime: Node
- Build command: `npm ci`
- Start command: `npm start`
- Health check path: `/healthz`

## Required environment variables

Set these in the hosting dashboard. Do not commit real values.

```env
NODE_ENV=production
NODE_VERSION=22.12.0
MONGO_URL=mongodb+srv://...
SESSION_SECRET=use-a-long-random-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
GEOCODING_USER_AGENT=WanderHome/1.0 your-email@example.com
```

## Notes

- `MONGO_URL` must be a hosted MongoDB URL, such as MongoDB Atlas. Do not use `mongodb://127.0.0.1...` in production.
- The project includes `render.yaml`, so Render can read the web service settings from the repo.
- After deploy, open `/healthz`. It should show `ok`.
- To refresh seed listings locally, run `npm run seed`. In production, run `npm run seed -- --force` only when you intentionally want to replace listing data.
- To repair known broken listing image URLs without reseeding, run `npm run repair:images`.
