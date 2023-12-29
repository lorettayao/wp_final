import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getProjects } from "./actions";
import { auth } from "@/lib/auth";
import SignOutButton from "./_components/SignOutButton";

export default async function ProjectsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !session?.user) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const projects = await getProjects(userId);

  return (
    <main className="flex h-full w-full justify-center border font-serif">
      <div className="flex-col">
        <div className="flex h-10 w-full flex-row items-center gap-12 py-8 pt-8">
          <Link href="/homePage">
            <h2 className="text-5xl font-bold">
              GRE StudEE
            </h2>
          </Link>
        </div>
        <div className="flex-row my-4 justify-center">
          <Link
            className="mx-5 rounded-xl bg-gray-50 px-4 py-2 text-lg drop-shadow-md transition-all hover:bg-gray-200"
            href="/projects/create"
          >
            + 今日單字
          </Link>
          <Link
            className="mx-2 rounded-xl bg-gray-50 px-4 py-2 text-lg drop-shadow-md transition-all hover:bg-gray-200"
            href="/projects/create2write"
          >
            + 寫作練習
          </Link>
        </div>

        <Separator className="my-3" />

        {/* <p className="text-xl text-gray-600/50 font-serif mx-20">請選擇一份單字</p> */}
        <section className="flex grow flex-col gap-2 overflow-scroll my-4">
          {projects.length === 0 ? (
            <div className="flex h-10 w-full flex-col items-center justify-between p-2">
              <h3>No Projects</h3>
            </div>
          ) : (
            projects.map((project) => {
              return (
                <Link
                  href={`/projects/${project.id}`}
                  key={project.id}
                  className="flex w-full cursor-pointer flex-row items-center justify-between p-2 pl-6 transition-all hover:bg-gray-200"
                >
                  <h3 className="text-xl">{project.name}</h3>
                </Link>
              );
            })
          )}
        </section>
      </div>
      <div className="flex gap-6 fixed top-2.5 right-1">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200"></div>
            <span className="text-md font-semibold">
              {
                session?.user?.name || "User"
              }
            </span>
          </div>
          <SignOutButton />
        </div>
    </main>
  );
}
