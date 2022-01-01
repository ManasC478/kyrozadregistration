import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);

  return (
    <div>
      {session ? (
        <>
          Signed in as {session.user.email} <br />
          <img src={session.user.image} alt={session.user.name} />
          <br />
          <p>{session.user.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
}
