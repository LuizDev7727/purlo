'use server';

import { updateOrganizationSchema } from '@purlo/contracts';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentOrg } from '@/auth/auth';
import { shutdownOrganizationHttp } from '@/http/organizations/shutdown-organization.route';
import { updateOrganizationHttp } from '@/http/organizations/update-organization.http';

export async function updateOrganizationAction(prevState: any, data: FormData) {
  const currentOrg = await getCurrentOrg();

  const result = updateOrganizationSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const error = result.error.issues[0]?.message;
    return { success: false, message: null, error };
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data;

  try {
    await updateOrganizationHttp({
      org: currentOrg,
      name,
      domain,
      shouldAttachUsersByDomain,
    });

    revalidateTag('organizations');
  } catch (err) {
    // if (err instanceof HTTPError) {
    //   const { message } = await err.response.json();

    //   return { success: false, message, errors: null };
    // }

    // console.error(err);

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      error: null,
    };
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    error: null,
  };
}

export async function shutdownOrganizationAction() {
  const currentOrg = await getCurrentOrg();

  await shutdownOrganizationHttp({ org: currentOrg });

  redirect('/dashboard');
}
