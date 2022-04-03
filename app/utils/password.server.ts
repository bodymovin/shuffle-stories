import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hash = async (password: string): Promise<string> => {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

export const validate = async (
  password: string,
  hashString: string,
): Promise<string> => bcrypt.hash(password, hashString);
