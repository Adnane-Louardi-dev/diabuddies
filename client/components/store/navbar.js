import Link from "next/link";
import {Logo} from "../Logo";

const Navbar = () => {

   return (
      <>
         <nav className="font-nunito">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
               <div className="relative flex items-center justify-between h-16">
                  <Logo />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                     <Link href={"/store/wish_list"} className="p-1 rounded-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current hover:fill-current" fill="none" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                     </Link>
                     <Link href="/store/cart" passHref={true} className="p-1 ml-3 rounded-full text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2">
                           <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={1.5}
                                 d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.305-15l-3.432 12h-10.428l-3.777-9h-2.168l4.615 11h13.239l3.474-12h1.929l.743-2h-4.195z"
                              />
                           </svg>
                           <span className={`absolute top-5 right-4 inline-block w-3 h-3 transform translate-x-1/2 -translate-y-1/2 bg-yellow-600 rounded-full`}></span>
                     </Link>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
};

export default Navbar;
