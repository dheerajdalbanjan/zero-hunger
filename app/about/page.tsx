import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen py-10 bg-amber-50 '>
    <div className='max-w-7xl mx-auto  '>
        <div className="">
          <h2 className=" text-xl text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Mission to End Hunger
          </p>
          <p className="mt-4 max-w-5xl text-lg text-gray-500 ">
            At 0Hunger, we are dedicated to achieving Sustainable Development Goal 2: Zero Hunger. Our focus is on targets 2.1 and 2.2, ensuring everyone has access to safe, nutritious, and sufficient food all year round.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 h-52 md:grid-cols-2 gap-8">
            <div className="flex flex-col  items-center text-center">
              <div className="bg-amber-100 h-full shadow-lg rounded-lg px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">Target 2.1</h3>
                <p className="mt-4 text-lg text-gray-500">
                  End hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious, and sufficient food all year round.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-100 shadow-lg h-full rounded-lg px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">Target 2.2</h3>
                <p className="mt-4 text-lg text-gray-500">
                  End all forms of malnutrition, including achieving, by 2025, the internationally agreed targets on stunting and wasting in children under 5 years of age, and address the nutritional needs of adolescent girls, pregnant and lactating women, and older persons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg px-6 py-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center">Our Story</h3>
            <p className="mt-4 text-lg text-gray-500 text-center">
              Founded with a vision to eradicate hunger, 0Hunger has been at the forefront of various initiatives to ensure food security for all. Our team is committed to making a tangible difference in the lives of people, focusing on sustainable and impactful solutions.
            </p>
          </div>
        </div>
    </div>
    </div>
  )
}

export default About