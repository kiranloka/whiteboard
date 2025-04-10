import { AuthPage } from "@/components/AuthPage";

export default function SignUp() {
  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <div className="flex justify-center items-center">
        <AuthPage isSignin={false} />
      </div>

      <div className="bg-slate-400 text-white flex justify-center items-center p-10">
        <h1 className="text-4xl font-bold leading-snug text-center">
          “Discipline is the bridge between goals and accomplishment.”
        </h1>
      </div>
    </div>
  );
}
