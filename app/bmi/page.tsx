"use client";
import dynamic from "next/dynamic"; // Import dynamic for dynamic loading
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// @ts-ignore

const GaugeChart: any = dynamic(() => import("react-gauge-chart"), {
  ssr: false,
});

const formSchema = z.object({
  height: z.string(),
  weight: z.string(),
});


interface bmiInfoType{
    status: string,
    goal: string, 
    tips: string[]
}

const Bmi = () => {
  const [open, setOpen] = useState(false);
  const [bmi, setBmi] = useState(1);
  const [bmiInfo, setBmiInfo] = useState<bmiInfoType>({status: "", goal:"", tips:[]})
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const b = Number((Number(data.weight) / Number(data.height) ** 2) * 10000);
    setBmi(b);
    setBmiInfo(getDietSuggestions(b))
    setOpen(true);
  };

  function getDietSuggestions(bmi: number) {
    let status;
    if (bmi < 18.5) {
      status = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      status = "Normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
      status = "Overweight";
    } else {
      status = "Obese";
    }

    let goal: any, tips: any;
    switch (status) {
      case "Underweight":
        goal = "Gain weight healthily.";
        tips = [
          "Eat more frequently. Include 5-6 smaller meals throughout the day.",
          "Choose nutrient-rich foods like whole grains, lean proteins, nuts, and seeds.",
          "Incorporate smoothies and shakes with fruits, vegetables, and protein powders.",
          "Add healthy fats such as avocados, olive oil, and cheese to your diet.",
          "Avoid empty-calorie foods that offer little nutritional value.",
        ];
        break;
      case "Normal weight":
        goal = "Maintain a balanced diet to sustain your weight.";
        tips = [
          "Follow a balanced diet that includes a variety of foods from all food groups.",
          "Ensure a proper intake of fruits, vegetables, whole grains, proteins, and healthy fats.",
          "Stay hydrated by drinking plenty of water.",
          "Limit the intake of sugary snacks, refined grains, and high-fat processed foods.",
          "Maintain regular physical activity.",
        ];
        break;
      case "Overweight":
        goal = "Lose weight through a healthy and sustainable diet.";
        tips = [
          "Reduce portion sizes and avoid second servings.",
          "Eat more vegetables, fruits, and whole grains.",
          "Choose lean proteins like fish, chicken, beans, and legumes.",
          "Avoid sugary drinks and opt for water, herbal teas, or black coffee.",
          "Incorporate physical activity into your daily routine.",
        ];
        break;
      case "Obese":
        goal = "Achieve significant weight loss to improve health.";
        tips = [
          "Consult a healthcare provider or dietitian for a personalized plan.",
          "Follow a calorie-controlled diet that is rich in nutrients.",
          "Focus on high-fiber foods like vegetables, fruits, and whole grains.",
          "Avoid high-calorie, low-nutrient foods such as fast food and sugary snacks.",
          "Increase physical activity gradually to complement dietary changes.",
        ];
        break;
      default:
        goal = "";
        tips = [];
    }

    return { status, goal, tips };
  }
  return (
    <div className="min-h-screen bg-[#FFF3CF] py-8">
      <Card className="max-w-3xl md:mx-auto p-2 rounded-xl mx-4 bg-opacity-50 filter backdrop-blur-md">
        <CardHeader>
          <CardTitle>BMI calculator</CardTitle>
          <CardDescription>
            BMI is a useful screening tool for identifying potential weight
            problems that may lead to health issues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl className="relative">
                      <Input
                        type="number"
                        placeholder="enter your height"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>Height should be in cm</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl className="relative">
                      <Input
                        type="number"
                        placeholder="enter your weight"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>Weight should be in kg</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex p-0 justify-end">
                <Button
                  type="submit"
                  className="mt-5 px-8  bg-amber-900 rounded-full float-right"
                >
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>BMI Report</DialogTitle>
          </DialogHeader>
          <div>
            <GaugeChart
              id="bmi-gauge-chart"
              animate={true}
              nrOfLevels={30}
              percent={bmi / 50}
              needleColor="#345243"
              colors={["#FF5F6D", "#12372A"]} // Colors for different BMI ranges
              arcPadding={0.02}
              textColor="#000000"
              style={{ width: "100%", height: "auto" }}
            />
            <p className="text-center font-semibold text-xl">BMI: {bmi}</p>
            <h3 className="px-6 w-fit text-neutral-100 mx-auto my-4 py-1 rounded-full bg-purple-800">{bmiInfo.status}</h3>
            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-1">
                <AccordionTrigger>Diet Plan: {bmiInfo!.goal}</AccordionTrigger>
                <AccordionContent>
                  {bmiInfo.tips.map((e, i)=><p key={i}>{e}</p>)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bmi;
