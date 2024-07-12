"use client";
import { FormControl, Input, Button } from "@mui/base";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);
    router.push("/main/users");
  };
  return (
    <div>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Centered container using Tailwind CSS */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold mb-8">Login</h2>
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <FormControl
                className="w-full"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              >
                <Input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Username"
                  id="username"
                  type="text"
                />
              </FormControl>
              <FormControl
                className="w-full"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
                <Input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Password"
                  id="password"
                  type="password"
                />
              </FormControl>
              <Button
                className="w-full bg-black text-white py-2 rounded  mt-4"
                type="submit"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
