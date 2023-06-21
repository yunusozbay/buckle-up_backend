import { Router, Request, Response, NextFunction} from "express";
import { CityData } from "../models/CityData.model"

const router: Router = Router();

router.get("/:city", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const city = await CityData.findOne({name: req.params.city})
        res.json({city});
    } catch(err) {
        res.status(403).json({message: "City data not found"})
    }
});

export default router;