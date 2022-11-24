import { combine, createEffect, createStore } from "effector";

type User = { name: string };

// stores
export const $users = createStore<User[]>([]);

// effects
export const loadUsersEf = createEffect(mockFind);
export const createUserEf = createEffect(mockCreateUser);

// combined
export const $usersStore = combine({
  data: $users,
  loading: loadUsersEf.pending,
});
export const $createUserStore = combine({ loading: createUserEf.pending });

// subscribe
$users.on(loadUsersEf.doneData, (state, result) => result);
$users.on(createUserEf.doneData, (state, result) => [...state, result]);

// test data
async function mockCreateUser(user: User): Promise<User> {
  await wait();
  return Promise.resolve(user);
}
async function mockFind(opts: {
  limit: number;
  offset: number;
}): Promise<User[]> {
  await wait();
  return Promise.resolve([getTestUser(), getTestUser(), getTestUser()]);
}

// utils

export function getTestUser(): User {
  return { name: `user ${new Date().getTime()}` };
}
function wait() {
  return new Promise((resolve) => setTimeout(resolve, 500));
}
