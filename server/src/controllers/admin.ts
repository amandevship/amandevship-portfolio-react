import {Admin} from "../models/admin";

async function handleCreateNewAdmin(req: any, res: any) {
    const body = req.body;
    if(
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.mobile ||
        !body.password
    )
   {
     return res.status(400).json({msg: "All fields are required"})
   }
   const result = await Admin.create({
     firstName: body.firstName,
     lastName: body.lastName,
     email: body.email,
     mobile: body.mobile,
     password: body.password
   })
   return res.status(201).json({msg: "Admin has beend created.",id: result._id})
}

async function handleUpdateAdmin(req: any, res: any) {
    const body = req.body;
    if(
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.mobile ||
        !body.password
    )
   {
     return res.status(400).json({msg: "All fields are required"})
   }
   const result = await Admin.findByIdAndUpdate(req.params.id, {
     firstName: body.firstName,
     lastName: body.lastName,
     email: body.email,
     mobile: body.mobile,
     password: body.password
   })
   return res.status(200).json({msg: "Admin has been updated."})
}

async function handleGetAllAdmin(req: any, res: any) {
    const admins = await Admin.find();
    return res.status(200).json({msg: "Admins fetched.", admins})
}

async function handleGetAdminById(req: any, res: any) {
    const admin = await Admin.findById(req.params.id);
    return res.status(200).json({msg: "Admin fetched.", admin})
}

async function handleDeleteAdmin(req: any, res: any) {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    return res.status(200).json({msg: "Admin deleted."})
}

export { handleCreateNewAdmin, handleUpdateAdmin, handleGetAllAdmin, handleGetAdminById, handleDeleteAdmin };
