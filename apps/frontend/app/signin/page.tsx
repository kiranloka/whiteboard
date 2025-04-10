import { AuthPage } from "@/components/AuthPage";

export default function Signin() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-center font-semibold">Sigin Page</h2>
        <AuthPage isSignin={true} />;
      </div>
      <div></div>
    </div>
  );
}
