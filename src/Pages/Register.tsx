import { HomeBar } from "@/components/navbar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { toast } from "sonner";
import { registrationFormSchema, RegistrationFormType } from "@/types/registration";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Profile } from "@/components/registration/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { formSectionAtom } from "@/store/formAtom";
import { Address } from "@/components/registration/address";

const Register = () => {
  const [ currentTab, setCurrentTab ] = useRecoilState(formSectionAtom);

  const onTabChange = (value: string)=>{
    setCurrentTab(value);
  }

  const form = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationFormSchema)
  })
  const onSubmit: SubmitHandler<RegistrationFormType> = async(data)=>{
    try {
      await new Promise((resolve) =>
        setTimeout(() => resolve("done"), 1000)
      ).then(()=>console.log(data))
      toast.success("Form has been submitted successfully!!!");
    } catch(error){
      console.log(error);
      toast.error("Failed to submit form.");
    }
  }

  return (  
    <div className="w-full min-h-screen bg-primary-foreground dark:bg-[#1f1f1f] flex flex-col items-center">
      <HomeBar />
      <FormProvider {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="min-w-[425px] w-[60%] max-w-[600px]"
        >
          <Tabs 
            value={currentTab} 
            onValueChange={onTabChange} 
            className="mt-10 w-full"
          >
            <TabsList className="w-full flex justify-around">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="profile"><Profile /></TabsContent>
            <TabsContent value="address"><Address /></TabsContent>
            <TabsContent value="education"></TabsContent>
            <TabsContent value="experience"></TabsContent>
            <TabsContent value="password"></TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
}
 
export default Register;