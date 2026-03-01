import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the PhiloArt team",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          We&apos;d love to hear from you! Whether you have a question, suggestion, or just
          want to say hello, feel free to reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">General Inquiries</h2>
            <p className="text-gray-600 mb-4">
              For general questions about PhiloArt, partnerships, or press inquiries.
            </p>
            <a
              href="mailto:hello@philoart.io"
              className="text-blue-600 hover:underline"
            >
              hello@philoart.io
            </a>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Support</h2>
            <p className="text-gray-600 mb-4">
              Need help with your account or have a technical issue?
            </p>
            <a
              href="mailto:support@philoart.io"
              className="text-blue-600 hover:underline"
            >
              support@philoart.io
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Follow Us</h2>
        <div className="flex gap-4">
          <a
            href="https://twitter.com/philo2022"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter
          </a>
          <a
            href="https://github.com/philo-li/philoart"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Feedback</h2>
        <p className="text-gray-600 mb-4">
          Have suggestions for improving PhiloArt? We&apos;re always looking to make
          the platform better for our community.
        </p>
        <p className="text-gray-600">
          You can submit feature requests and bug reports on our{" "}
          <a
            href="https://github.com/philo-li/philoart/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub Issues page
          </a>.
        </p>
      </div>
    </div>
  );
}
