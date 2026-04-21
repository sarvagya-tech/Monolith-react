import express from "express";
import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(cors({
    origin:"http://localhost:5173",
    credentials : true

}));



app.get("/",(req,res)=>{
    res.send("hello world");

})



// app.listen(Port,()=>{
// console.log(`app liten on the post number${Port}`);
// })


import  userRouter  from "./routes/user.routes.js";
import  chatRouter  from "./routes/chat.routes.js";

app.use("/api/v2/user",userRouter);
//app.use("/api/v2/users",userRouter);
app.use("/api/v2/chat",chatRouter);

app.use((err, req, res, next) => {
    const statusCode = err?.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err?.message || "Internal Server Error",
        errors: err?.error || [],
    });
});


export default app;
