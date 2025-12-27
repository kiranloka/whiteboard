import { AuthPage } from "@/components/AuthPage";

export default function Signin() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <AuthPage isSignin={true} />;
      </div>
      <div></div>
    </div>
  );
}
