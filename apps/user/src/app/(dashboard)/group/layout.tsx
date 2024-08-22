export default function GroupRootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <main className='common-layout bg-[#f5f5f5]'>{children}</main>;
}
