import { init } from './sqlite';

export const initializeDatabase = async () => {
  await init();
};