// import Navbar from "./_components/Navbar";
import Header from "./_components/Header";

type Props = {
  children: React.ReactNode;
};
export default async function ProjectsLayout({ children }: Props) {
  return (
    <main id="full-page" className="fixed top-0 flex-col h-screen w-full ">
      <Header /> 
      <div className="grow">{children}</div>
    </main>
  );
}
