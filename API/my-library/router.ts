import { Router } from "express";
import readRoutes from "./routes/read";
import currentlyReadingRoutes from "./routes/currently-reading";
import wantToReadRoutes from "./routes/want-to-read";

const router = Router();

router.use("/books", readRoutes);
router.use("/currently-reading", currentlyReadingRoutes);
router.use("/want-to-read", wantToReadRoutes);

export default router;
