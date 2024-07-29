// import { json, type ActionFunctionArgs } from "@remix-run/node";

// import { POST, createUserSession } from "shared/api";

// export const signIn = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();
//   const email = formData.get("email")?.toString() ?? "";
//   const password = formData.get("password")?.toString() ?? "";

//   const { data, error } = await POST("/users/login", {
//     body: { user: { email, password } },
//   });

//   if (error) {
//     return json({ error }, { status: 400 });
//   } else {
//     return createUserSession({
//       request: request,
//       user: data.user,
//       redirectTo: "/",
//     });
//   }
// };

// export const register = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();
//   const username = formData.get("username")?.toString() ?? "";
//   const email = formData.get("email")?.toString() ?? "";
//   const password = formData.get("password")?.toString() ?? "";

//   const { data, error } = await POST("/users", {
//     body: { user: { email, password, username } },
//   });

//   if (error) {
//     return json({ error }, { status: 400 });
//   } else {
//     return createUserSession({
//       request: request,
//       user: data.user,
//       redirectTo: "/",
//     });
//   }
// };
