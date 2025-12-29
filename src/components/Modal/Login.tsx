import React, { useState } from 'react'
import { Modal, ModalBody } from 'flowbite-react'
import google from '../../assets/google.png'
import mobile from '../../assets/mobile.svg'
import guitar from '../../assets/guita.png'
import love from '../../assets/love.png'
import avatar from '../../assets/avatar.png'
import close from '../../assets/close.svg'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../Firebase/Firebase'

export interface LoginProps{
    status: boolean;
    toggleModal: () => void;
}

const Login:React.FC<LoginProps> = ({status, toggleModal}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        { img: guitar, text: "Help us become one of the safest place to buy and sell." },
        { img: love, text: "Close deals from the comfort of your home." },
        { img: avatar, text: "Keep all your favorites in one place." }
    ];

    const handleClick = async() => {
        try {
            const result = await signInWithPopup(auth,provider);
            toggleModal();
            console.log('User', result.user);

        } catch (error) {
            console.error(error);
        }
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

  return (
    <div>
      <Modal 
        theme={{
            "root": {
                "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
                "show": {
                    "on": "flex bg-black bg-opacity-50 backdrop-brightness-15",
                    "off": "hidden"
                },
                "sizes": {
                    "sm": "max-w-sm",
                    "md": "max-w-md",
                    "lg": "max-w-lg",
                    "xl": "max-w-xl",
                    "2xl": "max-w-2xl"
                }
            },
            "content": {
                "base": "relative w-full p-4 h-auto",
                "inner": "relative flex flex-col rounded-lg bg-white shadow"
            },
        }} 
        show={status} 
        onClose={toggleModal}
        className='rounded-lg' 
        position={'center'} 
        size='sm' 
        popup={true}
      >
        <div className='px-4 pt-4 pb-2 bg-white rounded-t-lg'>
            <img onClick={toggleModal} src={close} alt="" className='w-5 h-5 cursor-pointer hover:opacity-70'/>

            <div className="relative w-full h-52 overflow-hidden mt-2" onClick={(event)=>{event.stopPropagation()}}>
                <div className="flex flex-col items-center justify-center h-full px-4">
                    <img className="w-20 mb-4" src={slides[currentSlide].img} alt={`Slide ${currentSlide + 1}`} />
                    <p style={{ color: '#002f34' }} className="w-full text-center text-sm font-semibold leading-snug">
                        {slides[currentSlide].text}
                    </p>
                </div>

                <button 
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 text-xl bg-transparent hover:text-black p-1 outline-none focus:outline-none border-none focus:ring-0"
                >
                    ‹
                </button>
                <button 
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600 text-xl bg-transparent hover:text-black p-1 outline-none focus:outline-none border-none focus:ring-0"
                >
                    ›
                </button>

                {/* Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 w-1.5 rounded-full transition-colors outline-none focus:outline-none border-none ${
                                index === currentSlide ? 'bg-teal-400' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>

         <ModalBody className="bg-white p-0 rounded-b-lg" onClick={(event)=> {event.stopPropagation()}} >
            <div className="px-6 pb-6">
                <div className="flex items-center justify-start rounded border-2 border-solid border-black py-3 px-4 mb-3 cursor-pointer hover:border-gray-800">
                    <img className="w-5 h-5 mr-3" src={mobile} alt="" />
                    <p className="text-sm font-bold">Continue with phone</p>
                </div>
                <div onAuxClick={handleClick} className="flex items-center justify-center rounded border-2 border-solid border-gray-300 py-3 px-4 cursor-pointer hover:border-gray-400 active:bg-gray-50 relative" onClick={handleClick}>
                    <img className="w-5 h-5 absolute left-3" src={google} alt="" />
                    <p className="text-sm text-gray-600">Continue with Google</p>
                </div>
                <div className="pt-4 flex flex-col items-center justify-center">
                    <p className="font-semibold text-xs text-gray-600">OR</p>
                    <p className="font-bold text-sm pt-2 underline underline-offset-2 cursor-pointer hover:no-underline">Login with Email</p>
                </div>
                <div className="pt-8 flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-600 text-center">All your personal details are safe with us.</p>
                    <p className="text-xs pt-3 text-center text-gray-600">
                        If you continue, you are accepting <span className="text-blue-600 cursor-pointer hover:underline">OLX Terms and Conditions and Privacy Policy</span>
                    </p>
                </div>
            </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Login