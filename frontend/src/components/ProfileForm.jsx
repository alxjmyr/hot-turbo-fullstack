import { useFieldArray, useForm } from "react-hook-form";

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useToast } from "./ui/use-toast";

import { api } from "@/api_client/api";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

const profileSchema = z.object({
    id: z.number(),
    name: z.string().min(2, {
        message: "username should be at least 2 characters"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    is_active: z.boolean()
})

const profileDefaults = {
    id: null,
    name: "",
    email: "",
    is_active: null
}

const ProfileForm = () => {
    const { toast } = useToast();
    const { token } = useContext(UserContext);

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: profileDefaults,
    })

    const onSubmit = (data) => {
        console.log("Profile form submit")
        console.log(data)
        api.patchUser(token, data.name, data.email, data.is_active)
            .then(response => {
                const profileParse = profileSchema.parse(response.data)

                // form.setValue("id", profileParse.id)
                form.setValue("id", profileParse.id)
                form.setValue("name", profileParse.name)
                form.setValue("email", profileParse.email)
                form.setValue("is_active", profileParse.is_active)

                toast({
                    title: "Account Updated",
                    description: "Your account was successfully updated"
                })
            })
            .catch(error => {
                toast({
                    title: "Account Update Error",
                    description: error.reponse.data.detail
                })
            })
    };

    useEffect(() => {
        api.getUser(token)
            .then(response => {

                // setProfile(response.data)
                console.log("in the then handler")
                console.log(response.data)

                const profileParse = profileSchema.parse(response.data)
                console.log("profile parsed")
                console.log(profileParse)

                // form.setValue("id", profileParse.id)
                form.setValue("id", profileParse.id)
                form.setValue("name", profileParse.name)
                form.setValue("email", profileParse.email)
                form.setValue("is_active", profileParse.is_active)

            })
            .catch(error => {
                console.log(error.response)
            });
    }, [token])

    return (
        <Card className="md:max-w-5xl">
            <CardHeader>
                <CardTitle>Edit Account Details Below</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Id</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled />
                                    </FormControl>
                                    <FormDescription>
                                        This is your user id
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your user name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Email address for your account
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Active Account</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Account Status
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-3">Save Changes</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                {/* <p>Card Footer</p> */}
            </CardFooter>
        </Card>
    )
};

export default ProfileForm;