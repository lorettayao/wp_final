type Props = {
  children: React.ReactNode;
};
export default async function ProjectsLayout({ children }: Props) {
  return (
    <main id="full-page" className="fixed top-0 flex h-screen w-full overflow-scroll">
      <div className="grow">{children}</div>
    </main>
  );
}
