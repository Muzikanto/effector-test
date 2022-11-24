import Head from "next/head";
import { useStore } from "effector-react";
import {
  $createUserStore,
  $usersStore,
  createUserEf,
  getTestUser,
  loadUsersEf,
} from "../src/store";
import React from "react";

export default function Home() {
  const { data: users, loading } = useStore($usersStore);
  const { loading: createLoading } = useStore($createUserStore);

  React.useEffect(() => {
    loadUsersEf({ limit: 10, offset: 0 }).then();
  }, []);

  const handleCreate = (): void => {
    createUserEf(getTestUser()).then();
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h5>Users:</h5>

        {users.map((user, i) => (
          <p key={`user-${i}`}>{user.name}</p>
        ))}
        {loading && <p>Loading users</p>}

        <button onClick={handleCreate} disabled={createLoading}>
          add user {createLoading ? "loading..." : ""}
        </button>
      </main>
    </div>
  );
}
