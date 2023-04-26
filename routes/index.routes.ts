import { Router, Request, Response, NextFunction} from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("All good in here");
});

export default router;