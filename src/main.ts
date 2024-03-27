import "reflect-metadata";
import path from "path";

import { loadSync } from "@grpc/proto-loader";
import { ReflectionService } from "@grpc/reflection";
import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { 
    BackgroundServiceServer,
    BackgroundServiceService,
    SendBackgroundRequest,
    SendBackgroundResponse
} from "./generated/protos/background";


const PROTO_PATH = path.join("src", "protos", "background.proto");
const HOST = "0.0.0.0";
const PORT = 8080;

const packageDefinition = loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)

// WARNING: Don't use reflections in production

const reflection = new ReflectionService(packageDefinition);
const address = `${HOST}:${PORT}`
const server = new Server();

reflection.addToServer(server);

server.addService(BackgroundServiceService, createBackgroundServiceServer());
server.bindAsync(address, ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.log(error.message)
        process.exit(1);
    }

    console.log("Server running at:", port);
});

// --- Service implementations ---

function createBackgroundServiceServer(): BackgroundServiceServer {
    async function sendBackground(
        call: ServerUnaryCall<SendBackgroundRequest, SendBackgroundResponse>,
        callback: sendUnaryData<SendBackgroundResponse>
    ) {
        const request = call.request
        const response = {
            success: true
        };

        console.log("Receive send with:", request.name);

        callback(null, response);
    }

    return {
        sendBackground
    };
}