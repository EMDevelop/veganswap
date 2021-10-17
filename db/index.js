const { Pool } = require('pg');

const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

config.ssl = {
  rejectUnauthorized: false,
};

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production' ? proConfig : devConfig,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};