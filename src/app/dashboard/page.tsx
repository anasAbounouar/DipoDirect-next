import { auth, currentUser } from "@clerk/nextjs";

export default async function Dashboard() {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();
  console.log(userId);

  if (!userId) {
    // Query DB for user specific information or display assets only to logged in userster
    return <p>you are not logged in </p>;
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  console.log(user);
  // Use `user` to render user details or create UI elements
}
