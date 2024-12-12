import LogoutButton from "@/app/_components/LogoutButton";
import { useClerk } from "@clerk/nextjs";

const handleLogout = () => {
  const { signOut } = useClerk();
  signOut();
};

export default function HomePage() {
  return (
    <section className="rounded-3xl shadow-sm">
      <div className="p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
          Ready to leave?
        </p>

        <h2 className="mt-6 text-3xl font-bold">We're sad to see you go!</h2>

        <div className="mt-8 inline-block w-full">
          <LogoutButton />
        </div>
      </div>
    </section>
  );
}
