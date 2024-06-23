"use client"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {motion} from 'framer-motion'
import Image from "next/image";
import React, { useState } from "react";

const Target = () => {


  const [value, setValue] = useState('one'); 

  return (
    <div className="max-w-7xl mx-auto py-8 ">
      <h2 className="mb-3 text-4xl text-neutral-700 font-bold">Our Targets</h2>
      <Tabs defaultValue="one" className="transition-all duration-300 ease-in-out" value={value} onValueChange={e=>setValue(e)}>
        <TabsList className="flex bg-emerald-50 rounded-full px-4 py-1 w-fit">
          <TabsTrigger
            className={`rounded-full active:scale-90 transition-all duration-300 ease-in-out px-4 py-1 ${value == 'one' ?"bg-emerald-200":''}`}
            value="one"
          >
            SDG 2.1
          </TabsTrigger>
          <TabsTrigger
            value="two"
            className={`rounded-full active:scale-90 transition-all duration-300 ease-in-out px-4 py-1 ${value == 'two' ?"bg-emerald-200":''}`}
          >
            SDG 2.2
          </TabsTrigger>
        </TabsList>
        <TabsContent className="flex items-center justify-between" value="one">
          <motion.p initial={{scale:0.9}} whileInView={{scale:1}} className="max-w-3xl p-7 duration-300 rounded-3xl my-5 bg-[#e8c97237]">
            By 2030, end hunger and ensure access by all people, in particular
            the poor and people in vulnerable situations, including infants, to
            safe, nutritious, and sufficient food all year round. This target
            focuses on the fundamental aspect of ensuring that everyone,
            regardless of their socioeconomic status, has access to enough
            nutritious food throughout the year. This target addresses not just
            the availability of food, but also its safety and nutritional value,
            recognizing that ending hunger is not only about quantity but also
            about the quality of food. Efforts to achieve this goal might
            include a variety of strategies, such as: Enhancing agricultural
            productivity and sustainable food production systems. Promoting
            policies that support small-scale farmers and help distribute food
            more equitably. Implementing social safety nets or food assistance
            programs to support individuals who are unable to meet their food
            needs. Addressing global and local challenges such as climate
            change, which threatens food security in many parts of the world.
          </motion.p>
          <Image height={400} width={400} alt="image" src="https://i.ytimg.com/vi/qX7NO6lTUso/maxresdefault.jpg" className="filter" />
        </TabsContent>
        <TabsContent className="flex items-center justify-between" value="two">
          <motion.p initial={{scale:0.9}} whileInView={{scale:1}}  className="max-w-3xl p-7  duration-300 rounded-3xl my-5 bg-[#e8c97237]">
            This specific target under SDG 2 aims to end all forms of
            malnutrition by 2030. It emphasizes addressing the nutritional needs
            of adolescent girls, pregnant and lactating women, and older
            persons. It also aims at tackling stunted and wasted children under
            5 years of age. Stunting: Reduced growth rate in human development,
            a direct consequence of malnutrition or nutrient deficiencies.
            Wasting: A severe form of malnutrition that implies a high risk of
            mortality; it is characterized by low weight for height. To achieve
            these objectives, initiatives might include improving access to
            nutritious foods, enhancing sustainable agriculture practices,
            promoting equitable distribution of food resources, and
            strengthening local food systems.
          </motion.p>
          <Image height={400} width={400} alt="image" src="https://assets.weforum.org/editor/4uJGzZ_d4c9XJLSNwW-AbYf1EmSqZajdmuj5D55Y2bc.png" className="filter" />
        </TabsContent>
      </Tabs>
    </div>
  );  
};

export default Target;
