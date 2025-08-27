interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  )
}