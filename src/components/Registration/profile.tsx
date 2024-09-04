import { 
  FormControl, 
  FormDescription, 
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

import { Button } from "@/components/ui/button"
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input"
import { RegistrationFormType } from '@/types/registration';

export const Profile = ()=>{
  const { control } = useFormContext<RegistrationFormType>();
  return (
    
    <Card>
      <CardHeader>
        <CardTitle>
          Profile Details
        </CardTitle>
        <CardDescription>
          Fill in your profile details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <FormField 
            control={control}
            name="profile.fullName"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Full Name: 
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your full name:" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={control}
            name="profile.emailAddress"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Email Address: 
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email address:" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}