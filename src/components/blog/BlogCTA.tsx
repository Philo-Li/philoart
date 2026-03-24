interface BlogCTAProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function BlogCTA({
  title,
  description,
  buttonText,
  href,
}: BlogCTAProps) {
  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 text-center">
      <h3 className="text-xl font-bold text-blue-600 mb-2">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <a
        href={href}
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 font-bold rounded-full hover:bg-blue-700 transition-colors no-underline"
        style={{ color: "#ffffff", textDecoration: "none" }}
      >
        {buttonText}
      </a>
    </div>
  );
}
