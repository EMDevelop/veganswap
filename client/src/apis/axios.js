import axios from 'axios';

// NODE_ENV out of production is 'development'
// NODE_ENV inside of production, we'll be in 'production'
// we will then see that because the front end and back end are on the same machine now:
// baseurl now = /api/v1/

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.veganswap.co.uk/api/v1'
    : 'http://localhost:3001/api/v1';

// const baseURL = 'http://localhost:3001/api/v1';

export default axios.create({
  baseURL,
});

console.log('AXIOS Exported');
