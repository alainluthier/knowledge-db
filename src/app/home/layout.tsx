import Navbar from "@/components/Navbar"
export default function Layout({children}:{children: React.ReactNode}){
    return(
        <div className="flex flex-col md:justify-items-center w-full h-full">
            <div className="flex-col">
            <Navbar/>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:pt-12 md:pb-12 md:pl-2 md:pr-2 md:ml-12 md:mr-12">
                {children}
            </div>
        </div>
    )
}