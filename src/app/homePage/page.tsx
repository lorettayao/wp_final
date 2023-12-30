import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import Link from "next/link";
import { getProjects, getWritings } from "./actions";
import { auth } from "@/lib/auth";
import SignOutButton from "./_components/SignOutButton";
import Rank from "./_components/rank";

export default async function ProjectsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !session?.user) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const projects = await getProjects(userId);
  const writings = await getWritings(userId);

  return (
    <main className="h-full border font-serif bg-dark-blue text-white"> {/* Set dark blue background and white text color */}
      <div className="bg-white"> {/* Set white background */}
        <div className="flex h-10 items-center py-8 pt-8 my-8">
          <Link href="/homePage">
            <h2 className="flex w-screen text-5xl font-bold items-center justify-center">
              GRE StudEE
            </h2>
          </Link>
        </div>

        <div className="flex gap-6 fixed top-2.5 right-5 text-white"> {/* Set white text color */}
          <div className="flex items-center gap-2">
            <span className="text-md font-semibold">
              {session?.user?.name || "User"}
            </span>
          </div>
          <SignOutButton />
        </div>

        <div className="flex p-4">
          <div className="flex-1 p-4 rounded-xl border border-dark-blue bg-white shadow-md"> {/* Set dark blue border, white background, and add shadow */}
            <Link
              className="mx-5 rounded-xl bg-dark-blue px-4 py-2 text-lg transition-all hover:bg-dark-blue-light"
              href="/projects/create"
            >
              + 今日單字
            </Link>
            <section className="flex grow flex-col gap-2 my-4">
              {projects.length === 0 ? (
                <div className="flex h-10 w-full flex-col items-center justify-between p-2">
                  <h3 className="text-gray-500">No Lists</h3> {/* Set a cold tone text color */}
                </div>
              ) : (
                projects.map((project) => (
                  <Link
                    href={`/projects/${project.id}`}
                    key={project.id}
                    className="flex w-full cursor-pointer rounded-xl p-2 pl-6 transition-all hover:bg-gray-200"
                  >
                    <h3 className="text-xl text-gray-700">{project.name}</h3> {/* Set a cold tone text color */}
                  </Link>
                ))
              )}
            </section>
          </div>

          <div className="flex-1 p-4 bg-dark-blue shadow-md rounded-md"> {/* Set dark blue background and add shadow */}
            {/* <h2>Column 2</h2> */}
            <Rank />
          </div>

          <div className="flex-1 p-4 rounded-xl border border-dark-blue bg-white shadow-md"> {/* Set dark blue border, white background, and add shadow */}
            <Link
              className="mx-2 rounded-xl bg-dark-blue px-4 py-2 text-lg transition-all hover:bg-dark-blue-light"
              href="/writings/create2write"
            >
              + 寫作練習
            </Link>
            <section className="flex grow flex-col gap-2 my-4">
              {writings.length === 0 ? (
                <div className="flex h-10 w-full flex-col items-center justify-between p-2">
                  <h3 className="text-gray-500">No Writings</h3> {/* Set a cold tone text color */}
                </div>
              ) : (
                writings.map((writing) => (
                  <Link
                    href={`/writings/${writing.id}`}
                    key={writing.id}
                    className="flex w-full cursor-pointer rounded-xl p-2 pl-6 transition-all hover:bg-gray-200 max-w-md overflow-hidden"
                  >
                    <h3 className="text-xl text-gray-700 text-overflow-ellipsis overflow-ellipsis whitespace-nowrap">{writing.name}</h3> {/* Set a cold tone text color */}
                  </Link>
                ))
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
