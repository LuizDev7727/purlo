import { db } from "@/infra/database/client"
import { integrations } from "@/infra/database/schema/integrations"
import { eq } from "drizzle-orm"

type RemoveIntegrationUseCaseRequest = {
  integrationId:string
}

export default async function removeIntegrationUseCase({ integrationId }:RemoveIntegrationUseCaseRequest) {
  await db.delete(integrations).where(eq(integrations.id, integrationId))
}