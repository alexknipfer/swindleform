interface GetUserArgs {
  id: string;
}

export const getUser = async (_: Record<string, never>, args: GetUserArgs) => {
  return {
    id: args.id,
    email: 'test@email.com',
    name: 'Test Name',
  };
};
