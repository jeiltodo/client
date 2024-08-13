export default function GoalRootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <main className='common-layout bg-slate-100'>{children}</main>;
}
