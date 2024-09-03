import Menu from "../../src/ui/menus/UserMenu";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="sm:px-28 px-4 py-8">
            <Menu />
            {children}
        </div>
    )
}