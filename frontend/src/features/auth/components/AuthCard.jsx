import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";

export function AuthCard ({title, description, children, footer, onSubmit}){
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription> {description} </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
                {children}
            </CardContent>

            {footer && <CardFooter className="flex flex-col space-y-4" >
                {footer}
                </CardFooter>}
            </form>
        </Card>
    )
}