import { useRouter } from "next/router";
import {Form} from "@/components";

export default function FormPage() {
    const router = useRouter();
    const { lat, lng } = router.query;
    return (
        <div>
            <h1>Add a City</h1>
            <p>
                Position: {lat}, {lng}
            </p>
            <Form />
        </div>
    );
}