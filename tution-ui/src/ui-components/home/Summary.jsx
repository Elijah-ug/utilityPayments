import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Summary = () => {
  return (
    <div className="py-5  flex items-center justify-center  backdrop-blur-sm ">
        <div className="grid sm:grid-cols-3 gap-17 w-full">
            <Card className="w-full max-w-xl bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
      <CardHeader>
        <CardTitle>Problem At Hand</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="name">Student Name</Label>
              <Input id="name" type="text" placeholder="Enter student's name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="class">Class</Label>
              <Input id="class" type="text" placeholder="Enter student's class" required />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>

    <Card className="w-full max-w-sm bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
      <CardHeader>
        <CardTitle>Solution To The Problem</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="name">Student Name</Label>
              <Input id="name" type="text" placeholder="Enter student's name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="class">Class</Label>
              <Input id="class" type="text" placeholder="Enter student's class" required />
            </div>
          </div>
        </form>
      </CardContent>
      
    </Card>

    <Card className="w-full max-w-sm bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
      <CardHeader>
        <CardTitle>Challenges </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="name">Student Name</Label>
              <Input id="name" type="text" placeholder="Enter student's name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="class">Class</Label>
              <Input id="class" type="text" placeholder="Enter student's class" required />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
        </div>
    </div>
  );
};
