import type { ReactNode } from "react";
type ServicesLayoutProps = {
  children: ReactNode;
};

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <>

      <main>{children}</main>
    </>
  );
}