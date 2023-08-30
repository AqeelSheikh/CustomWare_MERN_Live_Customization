import React from 'react'
import { motion,AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import {CustomButton} from "../components";
import { 
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
 } from "../config/motion";


const Home = () => {
    const snap=useSnapshot(state);

  return (
   
    
    <AnimatePresence>
    {
        snap.intro &&(
            <motion.section className='home'{...slideAnimation('left')}>
<motion.header {...slideAnimation('down')} >
    <img src='./threejs.png'
        className='w-8 h-8 object-contain'
    />
</motion.header>
<motion.div className='home-content'{...headContainerAnimation}>
<motion.div className='home-content'{...headTextAnimation}>
<h1 className='head-text'>
Let's<br className='xl:block hidden' />DO IT!.
</h1>
</motion.div>
</motion.div>
<motion.div {...headContentAnimation} className='flex flex-col gap-5'>
    <p className='max-w-md font-normal text-grey-600 text-base'>
    Customize different t-shirt designs with Threekit's interactive 3D product configurator and 360° viewer. Zoom in and out to fully explore every detail.
    <strong>Unleash your Imagination</strong>{''}
    With this guide, you will be able to create cool original t-shirts for every day! We've looked for similar articles and videos online, and found 
    </p>
    <CustomButton
        type='filled'
        title="customize it"
        handleClick={()=>state.intro=false}
        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
    />
</motion.div>
  </motion.section>

)}

    </AnimatePresence>
  )
}

export default Home;