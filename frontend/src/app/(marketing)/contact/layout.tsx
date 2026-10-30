import type { ReactNode } from "react";
type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return (
    <>

      <main>{children}</main>
    </>
  );
}