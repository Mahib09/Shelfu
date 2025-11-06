"use client";

export default function Pricing() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">Pricing</h1>
      <p className="mb-10 text-gray-400">
        Shelfu is completely free! All features are available to every user with
        no hidden costs.
      </p>

      <section className="bg-[#1E1E1E] p-8 rounded-lg border text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Free for Everyone
        </h2>
        <p className="text-gray-400 mb-6">
          Enjoy full access to Shelfu’s collection tracking, statistics,
          insights, and search features. No limits, no subscriptions — just
          manage your manga the way you want.
        </p>
        <p className="text-xl font-bold text-white mb-6">$0 / month</p>
        <a
          href="/auth/signup"
          className="inline-block bg-[#dedede] hover:brightness-125 text-black font-medium px-6 py-3 rounded-md transition-all ease-in-out"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}
