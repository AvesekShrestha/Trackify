import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "@/assets/login.jpg"

export default function ProfileSetting() {
    return (
        <>
            {/* Main content */}
            <Card className="p-8 bg-white shadow-sm rounded-xl flex flex-col-reverse lg:flex-row md:flex-row justify-between">
                <div className="flex-1 pr-10">
                    <h2 className="text-xl font-semibold">Edit your profile</h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <Input placeholder="Avesek" defaultValue="Avesek" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Birthday</label>
                            <Input type="date" defaultValue="2003-04-18" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input type="email" defaultValue="avesek@example.com" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <Input type="text" defaultValue="+977 9800000000" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Bio</label>
                            <Input placeholder="Type something about you..." />
                        </div>

                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black mt-4">
                            Save changes
                        </Button>
                    </form>
                </div>

                <div className="flex flex-col items-center justify-start w-full md:w-1/3 mt-10 md:mt-0">
                    <img
                        src={Image}
                        alt="Profile"
                        className="w-40 h-40 rounded-xl object-cover object-top mb-4"
                    />
                    <Button
                        variant="outline"
                        className="w-full border-yellow-400 text-yellow-500 hover:bg-yellow-50 mb-2"
                    >
                        Change avatar
                    </Button>
                    <button className="text-sm text-red-500 hover:underline">
                        Delete avatar
                    </button>
                </div>
            </Card>

        </>
    )
}
