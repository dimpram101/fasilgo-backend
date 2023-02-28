import Joi from "joi";

const userRegistrationSchema = Joi.object({
  fullname: Joi.string()
    .max(30)
    .required()
    .messages({
      "any.required": "Nama tidak boleh kosong!",
      "string.max": "Nama tidak boleh lebih dari 30 karakter!"
    }),
  email: Joi.string()
    .email()
    .max(30)
    .required()
    .messages({
      "string.email": "Harap masukan email yang benar!",
      "any.required": "Email tidak boleh kosong!",
      "string.max": "Email tidak boleh lebih dari 30 karakter!"
    }),
  nomorHP: Joi.string()
    .max(14)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "any.required": "Nomor HP tidak boleh kosong!",
      "string.max": "Nomor HP tidak boleh lebih dari 14 karakter!",
      "string.pattern.base": "Harap masukan nomor HP yang benar!"
    }),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .messages({
      "any.required": "Password tidak boleh kosong!",
      "string.min": "Password tidak boleh kurang dari 8 karakter!",
      "string.max": "Password tidak boleh lebih dari 30 karakter!"
    }),
  confirmPassword: Joi.ref('password')
})

const userLoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .max(30)
    .required()
    .messages({
      "string.email": "Harap masukan email yang benar!",
      "any.required": "Email tidak boleh kosong!",
      "string.max": "Email tidak boleh lebih dari 30 karakter!"
    }),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .messages({
      "any.required": "Password tidak boleh kosong!",
      "string.min": "Password tidak boleh kurang dari 8 karakter!",
      "string.max": "Password tidak boleh lebih dari 30 karakter!"
    })    
})

// try {
//   const user = await userRegistrationSchema.validateAsync({
//     fullname: "Dimas Pramudya",
//     email: "dimas@gmail.com",
//     nomorHP: "0718293791",
//     password: "dimpram2004"
//   }, {
//     abortEarly: false
//   })

//   console.log({ user });
// } catch (error) {
//   console.log(error);
// }


export { userRegistrationSchema, userLoginSchema };