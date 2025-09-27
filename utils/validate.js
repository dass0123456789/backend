import {object,string} from "yup"
export const registerscheema=object({
  email:string().email().required(),
  username:string().min(1),
  password:string().min(6)
})
export const loginscheema=object({
  email:string().email().required(),
  password:string().min(6)
})
export const updateemailcheema=object({
  email:string().email().required()
})
export const contentschema =object().shape({
  body:string()
    .required()
    .test(
      'no-script-tag',
      (value) => {
        if (!value) return true; 
        const forbiddenPattern = /<\s*script.*?>.*?<\s*\/\s*script\s*>|javascript:|on\w+=/gis;
        return !forbiddenPattern.test(value);
      }
    ),
});

export const validate=(schema)=>async(req,res,next)=>{
  try {
    await schema.validate(req.body,{abortEarly:false});
    next();
  } catch (error) {
    const errortxt=error.errors.join(",")
    const err=new Error(errortxt)
    next(err)
  }
}