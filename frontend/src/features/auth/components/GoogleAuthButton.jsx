import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";



export function GoogleAuthButton({title}){
    return(
    <Button variant="outline"  onClick={() => window.location.href = 'http://localhost:8000/auth/google/redirect'} 
            type="button"
            className="w-full">
            {title}
            <FcGoogle className="w-4 h-4 mb-1 " />
    </Button>
    )
}