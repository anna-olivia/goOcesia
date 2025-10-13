import { defineEventHandler, readBody, createError } from "h3";
import type { H3Event } from "h3";

const config = useRuntimeConfig();

//typen

interface DemoUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Beispielhafte Demo-Datenbank
const demoUsers: DemoUser[] = [
  {
    id: 1,
    name: "Anna",
    email: config.demoUserEmail,
    password: config.demoUserPassword,
  },
  {
    id: 2,
    name: "Ecosia",
    email: String(config.ecoUserEmail || ""),
    password: String(config.ecoUserPassword || ""),
  },
];

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<{ email: string; password: string }>(event);

  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      message: "email and password incorrect",
    });
  }

  const user = demoUsers.find(
    (u: { email: string; password: string }) =>
      u.email === body.email && u.password === body.password
  );

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "invalid login details",
    });
  }
  const { password, ...userWithoutPassword } = user;
  //destructuring mit Rest -> user objekt wo password raugezogen wurde
  return userWithoutPassword;
});
