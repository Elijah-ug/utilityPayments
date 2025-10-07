import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ClientInfo = () => {
  return (
    // <div>
      <Card className="w-full max-w-lg bg-gray-600 backdrop-blur-sm border-gray-200/40 shadow-sm shadow-gray-500 text-white">
        <CardHeader>
          <CardTitle>Client Profile </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">

             <div className="flex items-center gap-2">
                <span>Address:</span>
                <span>0x28Aa0...A0220</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Balance:</span>
                <span>100 AFB</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    // </div>
  );
};
