import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import { useForm } from "react-hook-form";

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"

// import { useNavigate } from "react-router-dom";

import { useToast } from "./ui/use-toast";

import { api } from "@/api_client/api";


const getEmailSchema = z.object({
    email: z.string().email({
        message: "Invalid Email Address"
    })
});

const resetPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Password Should be at least 8 chars"
    }),
    confirmPassword: z.string().min(8, {
        message: "Password Should be at least 8 chars"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});

const GetEmailForm = () => {
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(getEmailSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (data) => {
        api.requestPasswordRecovery(data.email)
            .then(response => {
                toast({
                    title: "Password Reset Initiated",
                    description: response.data.detail
                });
                form.reset();
            })
            .catch(error => {
                toast({
                    title: "There was a problem with your request",
                    description: error.response.data.detail
                });
            })
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
                <Button type="submit" className="mt-3">Reset Password</Button>
            </form>
        </Form>
    )

};

const ResetPasswordForm = () => {
    const { toast } = useToast();

    const queryParams = new URLSearchParams(location.search);
    const recoveryToken = queryParams.get('token');

    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = (data) => {
        api.recoverPassword(recoveryToken, data.password)
            .then(response => {
                toast({
                    title: "Password Reset Successful",
                    description: response.data.detail
                });
                form.reset();
            })
            .catch(error => {
                toast({
                    title: "There was a problem with your request",
                    description: error.response.data.detail
                });
            })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter New Password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Password should be 8 characters
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
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="mt-3">Reset Password</Button>
            </form>
        </Form>
    )

};

const PasswordRecoveryCard = () => {

    const queryParams = new URLSearchParams(location.search);
    const recoveryToken = queryParams.get('token');

    return (
        <Card className="md:max-w-5xl">
            <CardHeader>
                <CardTitle>Password Recovery</CardTitle>
                {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent>
                {recoveryToken ? <ResetPasswordForm /> : <GetEmailForm />}
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
};

export default PasswordRecoveryCard;