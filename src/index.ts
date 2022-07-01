import * as dotenv from 'dotenv-defaults';
dotenv.config({
  defaults: 'env/.env.defaults',
});

import { app } from './app';

app();
