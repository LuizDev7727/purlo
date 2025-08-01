import { api } from '../api';

type Response = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

export default async function getProfileHttp() {
  const profile = await api.get('auth/get-profile').json<Response>();
  return profile;
}
