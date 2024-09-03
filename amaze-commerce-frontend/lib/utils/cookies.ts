"use server";

import { cookies } from "next/headers";

interface DeleteData {
  name: string;
}

async function deleteCookie(data: DeleteData): Promise<void> {
  const { name } = data;
  cookies().set(name, "", { maxAge: 0 });
}

export default deleteCookie;
