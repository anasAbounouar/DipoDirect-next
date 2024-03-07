import { auth, currentUser } from "@clerk/nextjs";

export async function getAuthenticationData() {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();

  if (userId) {
    // Query DB for user specific information or display assets only to logged in users
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  console.log(user, userId);

  // Use `user` to render user details or create UI elements
  return { user, userId };
}
