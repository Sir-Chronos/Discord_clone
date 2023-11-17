import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export default async function SetupPage() {
  const profileResult = await initialProfile();

  // Verifica se o retorno é uma função e chama, caso seja
  const profile = typeof profileResult === 'function' ? profileResult() : profileResult;

  if (!profile || typeof profile === 'function' || !profile.id) {
    return <div>Profile not found or invalid</div>;
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`)
  }
  
  return <div>Create a Server</div>;
}

