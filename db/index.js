const { Pool } = require('pg');
const { parse } = require('pg-connection-string');

const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const config = parse(process.env.DATABASE_URL);

config.ssl = {
  rejectUnauthorized: false,
};

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'production' ? config : devConfig,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
