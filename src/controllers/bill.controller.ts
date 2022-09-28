// import { Request, Response } from "express";
// import bill from "../schemas/bill-older";

// class BillOlder {
//     async getAll (req: Request, res: Response) {
//         try {
//             const billolder = await bill.find().populate('product')
//             console.log(billolder);
            
//             // res.render('user/billoler', { bills: bill })
//             res.status(200).json({billolder})
//         } catch (error) {
//             res.render(error)
//         }
//     }
// }
// export default new BillOlder();