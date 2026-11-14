interface FooterProps {
  name: string;
  credit: string;
}

export function Footer({ name, credit }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col gap-1 px-7 pb-10 pt-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-12 lg:px-[80px]">
      <p>
        © {year} {name}
      </p>
      <p>{credit}</p>
    </footer>
  );
}
