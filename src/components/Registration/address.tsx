import { useFormContext } from "react-hook-form";
import { RegistrationFormType } from "@/types/registration";
import { useSetRecoilState } from "recoil";

import { 
  FormControl,  
  // FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formSectionAtom } from "@/store/formAtom";
import { formSections, statesOfIndia } from "@/constants/registration";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandGroup, CommandInput, CommandList, CommandEmpty, CommandItem } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { CheckIcon } from "lucide-react";

export const Address = ()=>{
  const { control, trigger } = useFormContext<RegistrationFormType>();
  const setCurrentTab = useSetRecoilState(formSectionAtom);

  const validateProfileSchema = async()=>{
    const isValid = await trigger([
      "address",
    ])
    return isValid;
  }

  const handleClick = async ()=>{
    const isValid = await validateProfileSchema();
    if (isValid) setCurrentTab(formSections.education);
  }

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Address Details
        </CardTitle>
        <CardDescription>
          Fill in your address details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col justify-center">
          <div className="p-2 px-4 border rounded-xl">
            <CardTitle className="text-xl font-bold text-right mt-2 text-neutral-400 dark:text-neutral-600">
              Correspondence Address
            </CardTitle>
            <CardDescription className="text-xs mb-2 text-right text-neutral-400 dark:text-neutral-600">
              Temporary address to recieve mails and parcels
            </CardDescription>
            <div className="space-y-1">
              <FormField 
                control={control}
                name="address.addressForCorrespondence.address"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Your address" 
                        className="dark:bg-neutral-900"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField 
                control={control}
                name="address.addressForCorrespondence.city"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Your City" 
                        className="dark:bg-neutral-900"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <div className="flex justify-between space-x-2">
                <FormField 
                  control={control}
                  name="address.addressForCorrespondence.pinCode"
                  render={({field})=>(
                    <FormItem className="w-full">
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Your postal code" 
                          className="dark:bg-neutral-900"
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                          defaultValue={field.value}
                          />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                <FormField
                  control={control}
                  name="address.addressForCorrespondence.state"
                  render={({ field })=>(
                    <FormItem className="w-full flex flex-col mt-2.5">
                      <FormLabel>State</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              "font-normal",
                              "dark:bg-neutral-900",
                              !field.value && "text-muted-foreground"
                            )}
                            >
                            {(field.value
                              ? statesOfIndia.find((state) => state === field.value)
                              : "Select a state"
                            )}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                            <Command>
                              <CommandInput
                                placeholder="Search state..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No state found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className="w-full h-40">
                                    {statesOfIndia.map((state, index)=>(
                                      <CommandItem
                                        value={state}
                                        key={index}
                                        onSelect={()=>field.onChange(state)}
                                        defaultValue={field.value}
                                      >
                                        {state}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            state === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="p-2 px-4 border rounded-xl">
            <CardTitle className="text-xl font-bold text-right mt-2 text-neutral-400 dark:text-neutral-600">
              Permanent Address
            </CardTitle>
            <CardDescription className="text-xs mb-2 text-right text-neutral-400 dark:text-neutral-600">
              Address where you live that is listed on your legal documents
            </CardDescription>
            <div className="space-y-1">
              <FormField 
                control={control}
                name="address.permanentAddress.address"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Your address" 
                        className="dark:bg-neutral-900"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField 
                control={control}
                name="address.permanentAddress.city"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Your City" 
                        className="dark:bg-neutral-900"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <div className="flex justify-between space-x-2">
                <FormField 
                  control={control}
                  name="address.permanentAddress.pinCode"
                  render={({field})=>(
                    <FormItem className="w-full">
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Your postal code" 
                          className="dark:bg-neutral-900"
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                          defaultValue={field.value}
                          />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                <FormField
                  control={control}
                  name="address.permanentAddress.state"
                  render={({ field })=>(
                    <FormItem className="w-full flex flex-col mt-2.5">
                      <FormLabel>State</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              "font-normal",
                              "dark:bg-neutral-900",
                              !field.value && "text-muted-foreground"
                            )}
                            >
                            {(field.value
                              ? statesOfIndia.find((state) => state === field.value)
                              : "Select a state"
                            )}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                            <Command>
                              <CommandInput
                                placeholder="Search state..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No state found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className="w-full h-40">
                                    {statesOfIndia.map((state, index)=>(
                                      <CommandItem
                                        value={state}
                                        key={index}
                                        onSelect={()=>field.onChange(state)}
                                        defaultValue={field.value}
                                      >
                                        {state}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            state === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button variant={"outline"} className="w-full" onClick={handleClick}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}