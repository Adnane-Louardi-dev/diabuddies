import React from "react";
import Link from "next/link";
import {Logo} from "../Logo";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import {Button} from "@mui/material";
import {ProductImage} from "./ProductImage";
import {useGetCart} from "../../customeHooks/useCart";
import {SettingsMenu} from "../appBar/SettingsMenu";
import {useTranslation} from "next-i18next";

const Navbar = () => {
    const [anchorElCart, setAnchorElCart] = React.useState(null);
    const {data: cart} = useGetCart()
    const {t} = useTranslation("blogStore")
    const handleOpenCartMenu = (event) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleCloseCartMenu = () => {
        setAnchorElCart(null);
    };

   return (
      <>
         <nav className="font-nunito">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
               <div className="relative flex items-center justify-between h-16">
                  <Logo />
                  <div className="absolute inset-y-0 right-20 flex items-center px-5 sm:static sm:inset-auto sm:ml-6 sm:pr-4">
                     <Link href={"/store/wish_list"} className="p-1 rounded-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current hover:fill-current" fill="none" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                     </Link>
                      <IconButton onClick={handleOpenCartMenu} className="p-1 ml-3 rounded-full text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2">
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.305-15l-3.432 12h-10.428l-3.777-9h-2.168l4.615 11h13.239l3.474-12h1.929l.743-2h-4.195z"
                              />
                          </svg>
                          <span className={`absolute top-2 right-4 text-[0.7rem] text-white inline-block w-4 h-4 transform translate-x-1/2 -translate-y-1/2 bg-yellow-600 rounded-full`}>
                              {cart && cart.totalItems}
                          </span>
                      </IconButton>
                      <Menu
                          sx={{mt: "45px"}}
                          id="menu-appbar"
                          anchorEl={anchorElCart}
                          anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                          }}
                          className={"h-[500px] scroll-auto"}
                          open={Boolean(anchorElCart)}
                          onClose={handleCloseCartMenu}
                      >
                          {cart && cart.venteEntries.map(({product,quantity,total}) => {
                              const {name,thumbnail,selling_price} = product.attributes
                              return <div className={"mx-3"} key={product.id}>
                                  <div className="mx-auto mb-5 flex rounded-xl shadow-md bg-blue-50 px-1 py-2">
                                      <div
                                          className="self-center relative h-16 w-16  flex-shrink-0 rounded-xl overflow-hidden bg-gray-400">
                                          {thumbnail && <ProductImage className={"w-full h-full bg-center bg-cover"}
                                                         src={thumbnail.data}/>}
                                      </div>
                                      <div
                                          className="self-center flex flex-col mx-auto mt-2 xs:mt-0 xs:ml-3 px-3 xs:px-0 justify-between rounded-xl font-rubik">
                                          <div className="flex-col">
                                              <h1 className="mt-1 w-48 text-sm">{name}</h1>
                                              <h1 className="my-1 text-sm flex justify-between">
                                                  <p>
                                                      {quantity} * <span className={"text-blue-700"}>{selling_price}</span> {t("currency")}
                                                  </p>
                                                  <p>
                                                      {total} {t("currency")}
                                                  </p>
                                              </h1>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          })}
                          <div className={"mx-3"}>
                              {cart?.totalItems !== 0 &&
                                  <Link href="/store/cart" passHref={true}>
                                      <Button className={"bg-amber-500 text-white my-5 w-full"}>
                                          {t("checkout")}
                                      </Button>
                                  </Link>}
                              <Link href="/store/orders" passHref={true}>
                                  <Button className={"bg-amber-500 text-white w-full"}>
                                      {t("myOrders")}
                                  </Button>
                              </Link>
                          </div>
                      </Menu>
                  </div>
                   <SettingsMenu />
               </div>
            </div>
         </nav>
      </>
   );
};

export default Navbar;
