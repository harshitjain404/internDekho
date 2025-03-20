import React from 'react'

const Home = () => {
  return (
    <div className="flex justify-center items-center" style={{height:"78vh"}}>
        <div className='flex flex-col md:flex-row justify-center items-center md:px-20 md:pt-10 gap-7 ' id="header">
            <div className='basis-1/2 flex justify-center items-center order-2 md:order-1'>
                <div className=' flex justify-center items-center flex-col w-72 text-3xl md:text-4xl font-strong' style={{color:"#363636",}}>
                    We're happy to see you here and can't wait to help you explore the internships.
                </div> 
            </div>
            <div className='basis-1/2 header-image order-1 md:order-2'>
                <img src="work.svg " className='img-fluid animated h-56 md:h-428' alt=""  />
            </div>
        </div>
        {/* logos start */}
        {/* <section class="text-gray-600 body-font">
            <div class="container px-5 py-3 mx-auto">
                <hr/>
                <marquee class="flex flex-wrap -m-4">
                    <div className='flex flex-row gap-28'>
                        <div class="p-4 flex items-center justify-center">
                            <div class="h-full text-center flex items-center justify-center">
                            <img alt="testimonial" class=" h-20  w-36" src="linkedIn.png"/>
                            </div>
                        </div>
                        <div class="p-4 flex items-center justify-center">
                            <div class="h-full text-center flex items-center justify-center" >
                            <img alt="testimonial" class=" h-20 w-36" src="internshala.png"/>
                            </div>
                        </div>
                        <div class="p-4 flex items-center justify-center">
                            <div class="h-full text-center flex items-center justify-center">
                            <img alt="testimonial" class=" h-20 w-36" src="naukri.png" style={{height:"105px"}}/>
                            </div>
                        </div>
                        <div class="p-4 flex items-center justify-center">
                            <div class="h-full text-center flex items-center justify-center">
                            <img alt="testimonial"  src="indeed.png" style={{height:"35px"}}/>
                            </div>
                        </div>
                    </div> 
                </marquee>
                <hr/>
            </div>
        </section> */}
        {/* logos start */}
    </div>
  )
}

export default Home