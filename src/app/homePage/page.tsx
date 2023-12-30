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
    <main className="h-full border font-serif">
      <div>
        <div className="flex h-10 items-center py-8 pt-8 my-8">
          <Link href="/homePage">
            <h2 className="flex w-screen text-5xl font-bold items-center justify-center">
              GRE StudEE
            </h2>
            {/* <Separator className="my-3 w-screen" /> */}
          </Link>
        </div>

        <div className="flex gap-6 fixed top-2.5 right-5">
          <div className="flex items-center gap-2">
            <span className="text-md font-semibold">
              {
                session?.user?.name || "User"
              }
            </span>
          </div>
          <SignOutButton />
        </div>

        
        <div className="flex p-4">
          <div className="flex-1 p-4 rounded-xl border border-black">
            {/* <h2>Column 1</h2> */}
            <Link
              className="mx-5 rounded-xl bg-blue-100 px-4 py-2 text-lg drop-shadow-md transition-all hover:bg-gray-300"
              href="/projects/create"
            >
              + 今日單字
            </Link>
            <section className="flex grow flex-col gap-2 my-4">
              {projects.length === 0 ? (
                <div className="flex h-10 w-full flex-col items-center justify-between p-2">
                  <h3>No Lists</h3>
                </div>
              ) : (
                projects.map((project) => {
                  return (
                    <Link
                      href={`/projects/${project.id}`}
                      key={project.id}
                      className="flex w-full cursor-pointer rounded-xl p-2 pl-6 transition-all hover:bg-gray-200"
                    >
                      <h3 className="text-xl">{project.name}</h3>
                    </Link>
                  );
                })
              )}
            </section>
          </div>

          <div className="flex-1 p-4">
            {/* <h2>Column 2</h2> */}
            <Rank />
          </div>

          <div className="flex-1 p-4 rounded-xl border border-black">
            {/* <h2>Column 3</h2> */}
            <Link
              className="mx-2 rounded-xl bg-blue-100 px-4 py-2 text-lg drop-shadow-md transition-all hover:bg-gray-300"
              href="/writings/create2write"
            >
              + 寫作練習
            </Link>
            <section className="flex grow flex-col gap-2 my-4">
              {writings.length === 0 ? (
                <div className="flex h-10 w-full flex-col items-center justify-between p-2">
                  <h3>No Writings</h3>
                </div>
              ) : (
                writings.map((writing) => {
                  return (
                    <Link
                      href={`/writings/${writing.id}`}
                      key={writing.id}
                      className="flex w-full cursor-pointer rounded-xl p-2 pl-6 transition-all hover:bg-gray-200 max-w-md overflow-hidden"
                    >
                      <h3 className="text-xl text-overflow-ellipsis overflow-ellipsis whitespace-nowrap">{writing.name}</h3>
                    </Link>
                  );
                })
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
