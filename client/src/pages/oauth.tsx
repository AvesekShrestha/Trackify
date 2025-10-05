import { Button } from "@/components/ui/button";
import api from "@/utils/axios";

export default function OAuth() {
    const handleAutomate = async () => {
        try {
            const response = await api.get("/oauth/");
            const url = response.data.url;
            console.log(url)

            // Open OAuth URL in a new tab
            window.open(url, "_blank");
        } catch (err) {
            console.error(err);
        }
    };

    return <Button onClick={handleAutomate}>Automate</Button>;
}
