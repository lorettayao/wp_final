import Navbar from "./_components/Navbar";

type Props = {
  children: React.ReactNode;
};
export default async function ProjectsLayout({ children }: Props) {
  return (
    <main className="fixed top-0 flex h-screen w-full ">
      <Navbar />
      <div className="grow">{children}</div>
    </main>
  );
}
