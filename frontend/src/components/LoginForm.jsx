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


const loginSchema = z.object({
    email: z.string().email({
        message: "Invalid Email Address"
    }),
    password: z.string().min(8, {
        message: "Password should be at least 8 chars"
    })
})

const LoginForm = () => {
    const { toast } = useToast();

    const { setToken } = useContext(UserContext);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const navigate = useNavigate();
    const logInRedirect = () => {
        const path = "/protected";
        navigate(path);
    };

    const onSubmit = (data) => {
        // console.log(JSON.stringify(data))

        api.getLoginToken(data.email, data.password)
            .then(response => {
                // console.log(response.data)
                setToken(response.data.access_token);
                form.reset();
                logInRedirect();
            })
            .catch(error => {
                toast({
                    title: "Problem At Sign In",
                    description: error.response.data.detail
                })
            });

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="tim@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the email associated with your account
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
                                Should be at least 8 chars
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="mt-3">Log In</Button>
            </form>
        </Form>


    )

};

export default LoginForm;