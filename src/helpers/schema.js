import { schema } from 'normalizr';


const usersSchema = new schema.Entity('users');

export const usersListSchema = new schema.Array(usersSchema);
