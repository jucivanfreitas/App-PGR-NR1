import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL;
const confirmed = process.env.DEMO_SEED_CONFIRM === '1';

if (!connectionString) {
  console.log('DATABASE_URL not set. Set it, then rerun to seed demo data.');
  process.exit(0);
}

if (!confirmed) {
  console.log('Demo seed is opt-in. Set DEMO_SEED_CONFIRM=1 to write demo rows.');
  process.exit(0);
}

const client = new Client({ connectionString });

const organizations = [
  { id: 'org_demo_1', name: 'Acme Demo', owner_user_id: 'user_demo_1' },
  { id: 'org_demo_2', name: 'Northwind Demo', owner_user_id: 'user_demo_2' },
];

const subscriptions = [
  { id: 'sub_demo_1', organization_id: 'org_demo_1', access_state: 'ACTIVE' },
  { id: 'sub_demo_2', organization_id: 'org_demo_2', access_state: 'TRIAL' },
];

try {
  await client.connect();
  await client.query('BEGIN');

  for (const row of organizations) {
    await client.query(
      'INSERT INTO organizations (id, name, owner_user_id) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
      [row.id, row.name, row.owner_user_id],
    );
  }

  for (const row of subscriptions) {
    await client.query(
      'INSERT INTO subscriptions (id, organization_id, access_state) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
      [row.id, row.organization_id, row.access_state],
    );
  }

  await client.query('COMMIT');
  console.log('Demo data seeded.');
} catch (error) {
  await client.query('ROLLBACK').catch(() => undefined);
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
