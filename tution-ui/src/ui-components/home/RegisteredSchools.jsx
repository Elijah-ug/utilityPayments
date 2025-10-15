import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetSchoolsQuery } from '../rtkQuery//school';
import { FaCopy } from 'react-icons/fa6';
import { useState } from 'react';

export const RegisteredSchools = () => {
  const [selectedAddr, setSelectedAddr] = useState('');
  const [copied, setCopied] = useState(false);
  const { data: schools, error, isLoading } = useGetSchoolsQuery();
  console.log('registered schools ==>', schools);

  const handleCopyAddress = (addr) => {
    setSelectedAddr(addr);
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    console.log('selectedAddr==>', selectedAddr);
  };
  return (
    <div className="flex items-center justify-end">
      <Card className="w-full max-w-xl bg-gray-600 border-gray-200/40 shadow-sm shadow-gray-500 text-white h-[450px] ">
        <CardHeader>
          <CardTitle>Registered Schools/Institutions</CardTitle>
        </CardHeader>
        <CardDescription className="px-3 text-white flex items-center relative">
          <Input placeholder="Search School by name or address" required />
          <Button className="bg-gray-700 absolute right-3 rounded-tl-none rounded-bl-none">
            Search
          </Button>
        </CardDescription>
        <CardContent className="overflow-y-auto max-h-[90%]">
          <div className=" p-2  flex flex-col gap-6">
            <div className="grid gap-2">
              {schools?.length > 0 ? (
                schools.map((school) => (
                  <div key={school.id} className="flex flex-col bg-gray-700 p-2 rounded-xs ">
                    <div className="">
                      <h3>{school.name}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>Tution:</span>
                      <span>{school.tution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span> Address:</span>
                      <span>{`${school.school.slice(0, 7)}...${school.school.slice(0, 7)}`}</span>
                      <div
                        onClick={() => handleCopyAddress(school.school)}
                        className="flex items-center gap-1 transition-all duration-400 ease-in-out"
                      >
                        {selectedAddr === school.school && copied ? (
                          <span className="text-xs">Copied!</span>
                        ) : (
                          <FaCopy className="text-gray-400 cursor-pointer" />
                        )}
                      </div>
                    </div>
                    {school.location && (
                      <div className="flex items-center gap-2">
                        <span>Location:</span>
                        <span>{school.location || ''}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="">
                  <p>This section will be updated soon</p>
                </div>
              )}
              {/* <p>Uganda</p>
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
              </p> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
