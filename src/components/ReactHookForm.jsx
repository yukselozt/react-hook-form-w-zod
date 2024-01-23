import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@email.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
      //   setError("email", {
      //     message: "This email is already taken",
      //   });
    }
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <input
          {...register(
            "email"
            //    {
            //     required: "Email is required",
            //     // pattern: Some Regex Validations
            //     validate: (value) => {
            //       if (!value.includes("@")) {
            //         return "Email must include @";
            //       }
            //       return true;
            //     },
            //   }
          )}
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>
      <div className="input-wrapper">
        <input
          {...register(
            "password"
            //   {
            //     required: "Password is required",
            //     // minLength: 8,
            //     minLength: {
            //       value: 8,
            //       message: "Password must have at least 8 characters",
            //     },
            //   }
          )}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && <p className="error-message">{errors.root.message}</p>}
    </form>
  );
};

export default ReactHookForm;
