import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import { Button } from "./ui/button";

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
                <Button variant="ghost" size="sm"><a href="/password-reset">Forgot Password</a></Button>
            </CardFooter>
        </Card>
    )
};

export default LoginCard;