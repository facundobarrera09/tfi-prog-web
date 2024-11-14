import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SideNav from "../components/navigation/SideNav";
import { Toaster } from "react-hot-toast";
import { CheckIcon, NoSymbolIcon } from "@heroicons/react/16/solid";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Instituto",
    description: "Aplicación de administración del Instituto",
};

interface layoutProps { children: React.ReactNode; }

export default function RootLayout({ children }: Readonly<layoutProps>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex row h-full min-h-screen`}
            >
                <SideNav />
                
                {children}

                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    gutter={8}
                    toastOptions={{
                        // Define default options
                        className: '',
                        duration: 3000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },

                        // Default options for specific types
                        error: {
                            duration: 5000,
                            style: {
                                color: "white",
                                background: '#f44336',
                                fontSize: '1rem'
                            },
                            icon: <NoSymbolIcon className="w-7 h-7" />
                        },

                        success: {
                            duration: 5000,
                            style: {
                                color: "white",
                                background: '#138636',
                                fontSize: '1rem'
                            },
                            icon: <CheckIcon className="w-7 h-7" />
                        }
                    }}
                />
            </body>
        </html>
    );
}
