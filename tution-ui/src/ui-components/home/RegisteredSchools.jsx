import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteContract } from "wagmi";

export const RegisteredSchools = () => {
  const { writeContractAsync: register, pending: registerPending } = useWriteContract();
  return (
    <div className="flex items-center justify-end">
      <Card className="w-full max-w-xl bg-gray-600 border-gray-200/40 shadow-sm shadow-gray-500 text-white h-[450px] ">
        <CardHeader>
          <CardTitle>Registered Schools/Institutions</CardTitle>
        </CardHeader>
        <CardDescription className="px-3 text-white flex items-center relative">
          <Input placeholder="Search School by name or address" required />
          <Button className="bg-gray-700 absolute right-3 rounded-tl-none rounded-bl-none">Search</Button>
        </CardDescription>
        <CardContent className="overflow-y-auto max-h-[90%]">
          <div className=" p-2  flex flex-col gap-6">
            <div className="grid gap-2">
              <p>Uganda</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim aut nobis perspiciatis quisquam atque
                aperiam necessitatibus, incidunt cupiditate nostrum laudantium a obcaecati commodi ipsum! Tenetur
                pariatur veritatis incidunt facilis harum?
              </p>
            </div>

            <div className="grid gap-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, dicta minima dolores nam culpa
                similique distinctio adipisci nemo, voluptatum a corporis consectetur natus. Placeat soluta vero ea
                mollitia fuga id.
              </p>
            </div>

            <div className="grid gap-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui deleniti, nemo explicabo tempora, vitae
                quaerat delectus dolorum voluptas consequuntur ipsa culpa doloremque quasi pariatur consequatur
                inventore asperiores alias? Sequi, vitae?
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
