import type { ReactNode } from "react";
type IndustriesesLayoutProps = {
  children: ReactNode;
};

export default function IndustriesLayout({ children }: IndustriesesLayoutProps) {
  return (
    <>

      <main>{children}</main>
    </>
  );
}