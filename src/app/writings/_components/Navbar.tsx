// import Link from "next/link";
// import { redirect } from "next/navigation";

// import { getProjects } from "../actions";

// import { Separator } from "@/components/ui/separator";
// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

// import SignOutButton from "./SignOutButton";
// import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";
// // import logoImage from "@/../public/EE-logo-2.png";


// export default async function Navbar() {
//   const session = await auth();
//   const userId = session?.user?.id;
//   if (!userId || !session?.user) {
//     redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
//   }
//   const projects = await getProjects(userId);
//   return (
//     <nav className="flex min-w-fit flex-col justify-between gap-2 overflow-hidden font-serif">
//       <div className="flex h-10 w-full flex-row items-center gap-12 px-6 py-8 pt-8">
//         <Link href="/homePage">
//           <h2 className="text-3xl font-bold">
//             GRE StudEE
//           </h2>
//         </Link>
//       </div>
//       <Separator />
//       <Link
//         className="mx-2 rounded-xl bg-gray-50 px-4 py-2 text-lg drop-shadow-md transition-all hover:bg-gray-200"
//         href="/projects/create"
//       >
//         + 今日單字
//       </Link>
//       <Link
//         className="mx-2 rounded-xl bg-gray-50 px-4 py-2 text-lg drop-shadow-md transition-all hover:bg-gray-200"
//         href="/projects/create2write"
//       >
//         + Writing Practice
//       </Link>
//       <section className="flex grow flex-col gap-2 overflow-scroll">
//         {projects.length === 0 ? (
//           <div className="flex h-10 w-full flex-col items-center justify-between p-2">
//             <h3>No Projects</h3>
//           </div>
//         ) : (
//           projects.map((project: { id: Key | null | undefined; name: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => {
//             return (
//               <Link
//                 href={`/projects/${project.id}`}
//                 key={project.id}
//                 className="flex w-full cursor-pointer flex-row items-center justify-between p-2 pl-6 transition-all hover:bg-gray-200"
//               >
//                 <h3 className="text-xl">{project.name}</h3>
//               </Link>
//             );
//           })
//         )}
//       </section>
//       <div className="flex w-full items-center justify-between gap-8 px-4 py-2">
//         <div className="flex items-center gap-2">
//           <span className="text-md font-semibold">
//             {
//               session?.user?.name || "User"
//             }
//           </span>
//         </div>
//         <SignOutButton />
//       </div>
//     </nav>
//   );
// }
