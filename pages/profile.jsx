import { useUser } from "@auth0/nextjs-auth0";
import { LogoutIcon } from "@heroicons/react/outline";

const features = [
  { name: "Bestellungen", description: "Designed by Good Goods, Inc." },
  {
    name: "Offene Zahlungen",
    description:
      "Solid walnut base with rare earth magnets and powder coated steel card cover",
  },
  { name: "E-Mail", description: "" },
  {
    name: "Telefonnummer",
    description: "Hand sanded and finished with natural oil",
  },
  { name: "Lieferadresse", description: "Wood card tray and 3 refill packs" },
];

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 ">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Mein Konto
            </h2>
            <div className="border-t border-gray-200 mt-5"></div>
            <div className="rounded-lg pt-10">
              {user ? (
                <a
                  href="/api/auth/logout"
                  className="items-center justify-between flex"
                >
                  <div className="flex-col items-center justify-start font-semibold text-lg">
                    <p className="truncate font-bold">Guten Tag!</p>
                    <p className="truncate font-light uppercase">{user.name}</p>
                  </div>
                  <div className="flex text-sm items-center bg-red-100 hover:bg-red-500 hover:text-white py-2 px-4 cursor-pointer rounded-lg">
                    Abmelden
                    <LogoutIcon className="cursor-pointer h-6 w-6 ml-2" />
                  </div>
                </a>
              ) : (
                <a href="/api/auth/login" className="items-center justify-end">
                  <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Anmelden
                  </a>
                </a>
              )}
            </div>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  );
}
