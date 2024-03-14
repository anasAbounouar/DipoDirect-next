import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Cart',
};
export default function layout({ children }) {
  return <> {children}</>;
}
