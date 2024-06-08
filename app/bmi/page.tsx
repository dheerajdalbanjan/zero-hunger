"use client";
const GaugeChart = require("react-gauge-chart")
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

const formSchema = z.object({
  height: z.string(),
  weight: z.string(),
});

const Bmi = () => {
  const [open, setOpen] = useState(false);
  const [bmi, setBmi] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const b = (Number(data.weight) / Number(data.height) ** 2) * 10000;
    setBmi(b);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF3CF] py-8">
      <Card className="max-w-3xl md:mx-auto p-2 rounded-xl mx-4 bg-opacity-50 filter backdrop-blur-md">
        <CardHeader>
          <CardTitle>BMI calculator</CardTitle>
          <CardDescription>
            BMI index lets u known about your current health condition
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bmi;
