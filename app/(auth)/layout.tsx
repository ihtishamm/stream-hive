import { ReactNode } from "react"

interface ChannelLayoutProps {
    children: ReactNode
}


const AuthLayout: React.FC<ChannelLayoutProps> = ({ children }) => {
    return (
        <div className="bg-slate-50 w-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-screen-sm flex items-center justify-center">
                <div className="w-full">

                    <div>{children}</div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout