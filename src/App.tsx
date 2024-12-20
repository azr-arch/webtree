import { useEffect, useState } from "react";

interface IProfile {
    gender: string;
    name: {
        first: string;
        last: string;
    };
    phone: string;
    picture: {
        medium: string;
        large: string;
    };
}

function App() {
    const url = "https://randomuser.me/api/?page=1&results=1&seed=abc";

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <Card url={url} />
        </div>
    );
}

function Card({ url }: { url: string }) {
    const [profileData, setProfileData] = useState<null | IProfile>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(url);
            const data = await res.json();

            setProfileData(data?.results[0]);
        })();
    }, []);

    return (
        <div className="w-[450px] aspect-video relative ">
            <div className="circle absolute top-[48%] -left-[10%] "></div>
            <div className="circle absolute -top-[10%] -right-[10%]"> </div>

            {/* Card */}
            <div className="w-full h-full bg-white/10 backdrop-blur-lg border-[2px] border-white/20 absolute top-0 left-0 rounded-md p-5">
                <div className="flex items-center gap-x-6 w-full h-full">
                    <div className="w-[170px] h-full overflow-hidden rounded-sm object-cover">
                        <img
                            className="object-cover w-full h-full"
                            src={profileData?.picture.large}
                        />
                    </div>

                    <div className="flex flex-col items-start gap-y-4 text-white/90  h-full ">
                        <p className="text-3xl">
                            {profileData?.name.first} {profileData?.name.last}
                        </p>
                        <p className="capitalize text-lg">{profileData?.gender}</p>
                        <p className="text-lg">{profileData?.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
