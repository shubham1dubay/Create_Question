import { pool } from '../db';

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Postgres connected:', res.rows[0]);
        process.exit(0);
    } catch (err) {
        console.error('PostgreSQL connection error:', err);
        process.exit(1);
    }
})();
