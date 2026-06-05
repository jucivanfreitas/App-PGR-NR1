# Demo Data

Demo data is optional and intended for local developer onboarding.

Use `npm run demo:seed` after you configure `DATABASE_URL` and apply the database schema.

The command is opt-in. Set `DEMO_SEED_CONFIRM=1` when you want it to write rows.

Seeded sample records:

- two organizations
- one `ACTIVE` subscription
- one `TRIAL` subscription

The seed is idempotent and skips existing rows by primary key.
