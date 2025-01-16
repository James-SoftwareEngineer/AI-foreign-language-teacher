
import { userService } from "../service";

const middleware = {
    async auth(req: any, res: any, next: any) {
        const token = req.headers.authorization;
        next();
    }
}

export default middleware;