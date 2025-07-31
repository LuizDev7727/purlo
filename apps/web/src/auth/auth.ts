import { defineAbilityFor } from '@purlo/casl';
import { cookies } from 'next/headers';
import { getMembershipHttp } from '@/http/organizations/get-membership.http';
import { getCookie } from 'cookies-next'

export async function isAuthenticated() {
  const cookie = await cookies();
  const token = cookie.get('purlo-token')?.value;
  return !!token;
}

export async function getCurrentOrg() {
  const cookie = await cookies();
  const currentOrg = cookie.get('purlo-org')?.value ?? '';
  return currentOrg;
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg();

  const membership = await getMembershipHttp(org);

  return membership;
}

export async function ability() {
  const membership = await getCurrentMembership();

  if (!membership) {
    return null;
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  });

  return ability;
}
