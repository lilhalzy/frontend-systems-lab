export const usersKeys = {
  all: ['users'],

  lists: () => [
    ...usersKeys.all,
    'list',
  ],

  detail: (id) => [
    ...usersKeys.all,
    id,
  ],
}