interface BigHeaderProps {
  text: string;
}

export function BigHeader({ text }: BigHeaderProps) {
  return <h2>{text}</h2>;
}

export function SmallHeader({ text }: BigHeaderProps) {
  return <h4>{text}</h4>;
}
