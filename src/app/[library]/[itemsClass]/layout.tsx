import CartNavDesktop from "@/components/layout/cartNavDesktop";

export default function layout({ children }) {
  return (
    <>
      <CartNavDesktop />
      {children}
    </>
  );
}
