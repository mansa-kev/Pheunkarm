import { Pool } from 'pg';

// Configure the database connection using the local Supabase container's connection string.
// Note: We use port 54322 based on the local docker ps output for the supabase_db_taskme-local container.
const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/postgres';

export const pool = new Pool({
  connectionString: dbUrl,
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

/**
 * Initializes the database tables if they don't exist.
 */
export const initDb = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS whop_payments (
      id VARCHAR(255) PRIMARY KEY,
      amount NUMERIC NOT NULL,
      currency VARCHAR(10) NOT NULL,
      status VARCHAR(50) NOT NULL,
      plan_id VARCHAR(255),
      customer_email VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await query(createTableQuery);
    console.log('Whop payments table initialized.');
  } catch (err) {
    console.error('Failed to initialize Whop payments table:', err);
  }
};
