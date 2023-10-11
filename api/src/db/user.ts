import mongoose from "mongoose";

type UpdateUserType = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  photo?: string;
};

const UserRoleSchema = new mongoose.Schema({
  role_id: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return value === "1" || value === "2";
      },
    },
  },
  value: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return value === "user" || value === "admin";
      },
    },
  },
});

export const UserRole = mongoose.model("UserRole", UserRoleSchema);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role_id: {
    type: String,
    ref: "UserRole",
    default: "1",
  },
  photo: { type: String },
  suspended: { type: Number, default: 0 },
  authentication: {
    salt: { type: String, select: false },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: function (value: string) {
          return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
        },
        message:
          "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter.",
      },
    },
    sessionToken: { type: String, select: false },
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export async function createUser(values: Record<string, any>) {
  const newUser = new UserModel(values);
  const savedUser = await newUser.save();
  return savedUser;
}
export async function getAllUsers() {
  return await UserModel.find();
}

export async function getUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
export async function getUserByEmailWithCredentials(email: string) {
  return UserModel.findOne({ email }).select(
    "+authentication.salt +authentication.password"
  );
}

export async function getUserBySessionToken(sessionToken: string) {
  return UserModel.findOne({ "authentication.sessionToken": sessionToken });
}

export async function getUserByID(id: string) {
  return UserModel.findById(id);
}

export async function deleteByID(id: string) {
  await UserModel.findOneAndDelete({
    _id: id,
  });
}

export async function updatedByID(id: string, values: UpdateUserType) {
  return await UserModel.findOneAndUpdate({ _id: id }, values, { new: true });
}
