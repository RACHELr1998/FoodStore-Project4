import mongoose from "mongoose";

export interface IRoleModel extends mongoose.Document {
    roleName: string;
}

export const RoleSchema = new mongoose.Schema<IRoleModel>({
    roleName: {
        type: String,
        required: [true, "Missing role"],
        minlength: [5, "Role must be minimum 5 charts"],
        maxlength: [8, "Role can't exceed 8 charts"],
        trim: true,
        unique: true
    } 
}, {
    versionKey: false
});

export const RoleModel = mongoose.model<IRoleModel>("RoleModel", RoleSchema, "roles");