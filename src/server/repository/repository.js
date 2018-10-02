const POSTGRES_USERNAME = !!process.env.CS_POSTGRES_USERNAME
    ? process.env.CS_POSTGRES_USERNAME
    : 'postgres';
const POSTGRES_PASSWORD = !!process.env.CS_POSTGRES_PASSWORD
    ? process.env.CS_POSTGRES_PASSWORD
    : 'postgres';
const POSTGRES_URL = !!process.env.CS_POSTGRES_URL
    ? process.env.CS_POSTGRES_URL
    : 'jdbc:postgresql://localhost:5432/testdb';

