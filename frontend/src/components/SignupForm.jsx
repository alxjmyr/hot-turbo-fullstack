import { useContext } from "react";
import { useForm } from "react-hook-form";

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

import { useNavigate } from "react-router-dom";

import { useToast } from "./ui/use-toast";

import { api } from "@/api_client/api";
import { UserContext } from "@/contexts/UserContext";


const signupSchema = z.object({
    name: z.string().min(2, {
        message: "Username should be at least 2 chars"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(8, {
        message: "Password should be at least 8 chars"
    }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});

const SignupForm = () => {

    const { toast } = useToast();

    const { setToken } = useContext(UserContext);

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const navigate = useNavigate();
    const signUpRedirect = () => {
        const path = "/protected";
        navigate(path);
    };

    const onSubmit = (data) => {
        // console.log(JSON.stringify(data))

        api.createUser(data.name, data.email, data.password)
            .then(response => {
                // console.log(response.data)
                setToken(response.data.access_token);
                form.reset();
                signUpRedirect();
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    title: "Problem Creating Your Account",
                    description: error.response.data.detail
                })
            });

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
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
                                <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your email
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Password should be more than 8 characters
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirm Password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Confirm password should match above.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="mt-3">Sign Up</Button>
            </form>
        </Form>
    )

};

export default SignupForm;