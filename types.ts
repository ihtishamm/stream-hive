export type GQLContext = {
    user?: { id: string; name:string; email: string; createdAt: string } | null
  }