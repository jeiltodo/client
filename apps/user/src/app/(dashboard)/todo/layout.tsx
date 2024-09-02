export default function todoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='common-layout bg-slate-100'>{children}</main>
  );
}
