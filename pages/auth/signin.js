import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Header from "../../components/Header";
import Logo from "../../components/Logo";

const signIn = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Logo n={3}/>
        <p className="w-3/5 text-center py-10">
          This is not a real product, it's built for education purpose only. I'm
          working on building a next level instagram alternative platfrom for
          India. If you wanna join me I would love to grind together.
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="py-3 px-12 bg-blue-500 hover:bg-white hover:border-blue-500 hover:border-2 hover:text-blue-500 text-white font-semibold rounded-full"
              onClick={() =>
                signIntoProvider(provider.id, { callbackUrl: "/" })
              }>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default signIn;
