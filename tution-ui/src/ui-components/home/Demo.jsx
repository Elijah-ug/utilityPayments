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

export const Demo = () => {
  const { writeContractAsync: register, pending: registerPending } = useWriteContract();
  return (
    <div className="flex items-center justify-center py-20">
      <Card className="w-full max-w-4xl bg-gray-600 border-gray-200/40 shadow-sm shadow-gray-500 text-white">
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias numquam rem veniam voluptatibus officiis
                assumenda nesciunt ullam odio beatae harum voluptas libero delectus suscipit, quis saepe, eveniet eius?
                Optio, blanditiis!
              </p>
            </div>

            <div className="grid gap-2">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto natus optio non maxime voluptatibus
                quasi sed perferendis cupiditate officiis aperiam, ipsum error saepe nesciunt atque facilis ipsam
                aliquid! Iste, deleniti.
              </p>
            </div>

            <div className="grid gap-2">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto natus optio non maxime voluptatibus
                quasi sed perferendis cupiditate officiis aperiam, ipsum error saepe nesciunt atque facilis ipsam
                aliquid! Iste, deleniti.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
