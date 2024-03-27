import { credentials } from "@grpc/grpc-js";
import { SendBackgroundRequest, BackgroundServiceClient } from "../src/generated/protos/background";

const BACKGROUND_SERVICE_URL = "0.0.0.0:8080";

function main() {
    const client = new BackgroundServiceClient(
        BACKGROUND_SERVICE_URL,
        credentials.createInsecure()
    );
    
    const request: SendBackgroundRequest = {
        id: "21y1byubbaxsc",
        name: "iFonso",
    };

    client.sendBackground(request, (error, response) => {
        if (error) {
            console.log(error.message);
        };

        console.log(response);
    })
};

main();