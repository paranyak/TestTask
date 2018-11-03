import { schema } from 'normalizr';


const usersSchema = new schema.Entity('users');

export const usersListSchema = new schema.Array(usersSchema);

const imagesSchema = new schema.Entity('images');

export const imagesListSchema = new schema.Array(imagesSchema);
