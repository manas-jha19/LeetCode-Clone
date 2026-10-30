import { Suspense } from "react";
import { getCurrentUserData } from "../../modules/auth/actions";
import { UserRole } from "@/generated/prisma/enums";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggler";
import { CreateProblemForm } from "@/modules/problems/components/create-problem-form";

const CreateProblemContent = async () => {
  const user = await getCurrentUserData();
  //@ts-ignore
  if (user?.role !== UserRole.ADMIN) {
    redirect("/");
  }
  return (
    <section className="flex flex-col items-center justify-center mx-4 my-4">
      <div className="flex flex-row justify-between items-center w-full">
        <Link href={"/"}>
          <Button variant={"outline"} size={"icon"}>
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <h1 className="text-3xl text-amber-400 font-bold">
          Welcome {user?.firstName} create a problem !
        </h1>
        <ModeToggle />
      </div>
      <CreateProblemForm />
    </section>
  );
};

const CreateProblemPage = () => {
  return (
    <Suspense fallback={<div>Loading problem form...</div>}>
      <CreateProblemContent />
    </Suspense>
  );
};
export default CreateProblemPage;
