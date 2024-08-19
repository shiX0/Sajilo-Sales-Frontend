import DarkModeToggle from "@/components/darkmodetoggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SunMoon, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <div>
      <h1 className="text-3xl p-5 font-bold">Settings</h1>
      <div className="grid grid-cols-5 gap-3">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-medium">Profile</CardTitle>
            <User className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="ghost">
              <NavLink to={"/profile"}>See your details</NavLink>
            </Button>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-medium">Theme</CardTitle>
            <SunMoon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DarkModeToggle />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
