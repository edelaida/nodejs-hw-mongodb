import { Router } from "express";
import {
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController,
    requestResetEmailController,
    resetPasswordController
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    loginUserSchema,
    registerUserSchema,
    requestResetEmailSchema,
    resetPasswordShema
} from "../validation/auth.js";
import { validateBody } from "../middlewares/validateBody.js";


const router = Router();
router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

router.post('/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

router.post('/logout',
    ctrlWrapper(logoutUserController));

router.post('/refresh',
    ctrlWrapper(refreshUserSessionController));  
    
router.post('/send-reset-email',
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController),
);   

router.post('/reset-pwd',
    validateBody(resetPasswordShema),
    ctrlWrapper(resetPasswordController),
);

export default router;