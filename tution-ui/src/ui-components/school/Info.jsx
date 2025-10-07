import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Info = () => {
  return (
    <div>
      <Card className="w-full max-w-sm bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
        <CardHeader>
          <CardTitle>School Profile For Address </CardTitle>
        </CardHeader>
        <CardDescription className="px-2 text-amber-400">
          <CardTitle>0x28Aa098cB391622716755425A7C125BAFE5A0220</CardTitle>
        </CardDescription>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span>Name:</span>
                <span>Kigezi High School</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Activated:</span>
                <span>✅</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Balance:</span>
                <span>100 AFB</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Tution Fee:</span>
                <span>3 AFB</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
