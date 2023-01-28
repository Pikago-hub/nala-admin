import { Footer, Navbar } from '../components';
import { About, Explore, Feedback, GetStarted, Hero, Insights, WhatsNew, World } from '../sections';

const Page = () => (
  <div className='bg-primary-black overflow-hidden'>
    <Navbar />
    <Hero />
   
      <About />
      
      <Explore />
    
    {//<div className='relative'>
    <GetStarted />
    //<div className='gradient-04 z-0'/>
    //<WhatsNew />
    //</div>
    }
    <WhatsNew />
    {//<World />
    }
    {/*<div className='relative'>
    <Insights />
    <div className='gradient-04 z-0'/>
    <Feedback />
  </div>*/}
    <Feedback />
    <Footer />
  </div>
);

export default Page;
