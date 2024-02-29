import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import SignupForm from "./SignupForm";

const SignupCard = () => {

    return (
        <Card className="md:max-w-5xl">
            <CardHeader>
                <CardTitle>Join the Turbo Team</CardTitle>
                <CardDescription>Just do it... Turbo Team is dope!</CardDescription>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
            <CardFooter>
                {/* <p>Card Footer</p> */}
            </CardFooter>
        </Card>
    )
};

export default SignupCard;