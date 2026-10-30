import type { ReactNode } from "react";
type ResourcesLayoutProps = {
  children: ReactNode;
};

export default function ResourcesLayout({ children }: ResourcesLayoutProps) {
  return (
    <>

      <main>{children}</main>
    </>
  );
}