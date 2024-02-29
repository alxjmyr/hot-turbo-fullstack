import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";

const LoginCard = () => {
    return (
        <Card className="md:max-w-5xl">
            <CardHeader>
                <CardTitle>Log In To Go Turbo!</CardTitle>
                {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter>
                {/* <p>Card Footer</p> */}
            </CardFooter>
        </Card>
    )
};

export default LoginCard;