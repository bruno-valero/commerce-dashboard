'use client'

import { useGlobalState } from '@/contexts/GlobalContext';
import { links } from '@/data/dummy';
import { ReactNode, useEffect } from 'react';
import Navbar from '../Navbar/index';
import SideBar from '../SideBar/index';

// import { registerLicense } from '@syncfusion/ej2-base';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiNotification3Line } from 'react-icons/ri';
import handleCloseSideBar from './functions/handleCloseSideBar';
// registerLicense('ORg4AjUWIQA/Gnt2V1hiQlBGfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5ad0djUH9bcXNSRWlY');

interface MenuProps {
  children: ReactNode;
}

export default function Menu({ children }:MenuProps) {


  const globalState = useGlobalState();
  const [activeMenu, setActiveMenu ] = globalState.activeMenu;
  const [cart, setCart] = globalState.cart;
  const [chat, setChat] = globalState.chat;
  const [notification, setNotification] = globalState.notification;
  const [userProfile, setUserProfile] = globalState.userProfile;
  const [screenSize, setScreenSize] = globalState.screenSize;

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (screenSize <= 1024) return setActiveMenu(false);
    setActiveMenu(true);
  }, [screenSize]);
   

  return (
    <>
      {activeMenu ? (
        <div className='w-72 fixed dark:bg-blue-950 bg-white shadow-sm z-50'>
          <SideBar.Root>
            <SideBar.CloseButton />
            <SideBar.Logo href='/' text='Valero' handleCloseSideBar={handleCloseSideBar} />
            {links.map(item => (
              <div key={item.title} >
                <p className='text-gray-400 m-3 mt-4 uppercase'>
                  {item.title}
                </p>
                {item.links.map(lk => (
                  <div key={`${item.title}_${lk.path}`}>
                    <SideBar.Link href={`/${lk.path}`} text={lk.name} icon={lk.icon} handleCloseSideBar={handleCloseSideBar} />
                  </div>
                ))}
              </div>
            ))}
          </SideBar.Root>
        </div>
      ) : (
        <div className='w-0 dark:bg-blue-950'>
          <p>Menu Oculto</p>
        </div>
      )}
      <div className={`dark:bg-blue-950 bg-white min-h-screen ${activeMenu ? 'ml-72' : 'flex-2'} w-full max-xl:w-[75%] max-lg:w-full` }>
        <div className='fixed md:static bg-white dark:bg-blue-950 w-full'>
          <Navbar.Root>
            <Navbar.Button title='Menu' icon={<AiOutlineMenu />} color='text-blue-500' dotColor='bg-red-500' customFunc={() => setActiveMenu(prev => !prev)} />
            <div className='flex flex-row justify-between gap-6'>
              <Navbar.Button title='Carrinho' icon={<FiShoppingCart />} color='text-blue-500' dotColor='bg-red-500' customFunc={() => setCart(prev => !prev)} />
              <Navbar.Button title='Chat' icon={<BsChatLeft />} color='text-blue-500' dotColor='bg-red-500' customFunc={() => setChat(prev => !prev)} />
              <Navbar.Button title='Notificações' icon={<RiNotification3Line />} color='text-blue-500' dotColor='bg-red-500' customFunc={() => setNotification(prev => !prev)} />
              <Navbar.Profile title='Perfil' icon={<MdKeyboardArrowDown />} color='text-blue-500' dotColor='bg-red-500' customFunc={() => setUserProfile(prev => !prev)} />
            </div>
          </Navbar.Root>
        </div>
        {children}
      </div>
    </>
  );
};
