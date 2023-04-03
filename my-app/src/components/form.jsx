import { useForm } from "react-hook-form";

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))} st>
      <label
        style={{
          
          fontWeight: "bold",
        }}
        htmlFor="firstName"
        fontWeight="1"
      >
        First Name:
      </label>
      <input {...register("firstName", { pattern: /\d+/ })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register("age", { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>}
      <input type="submit" />
    </form>
  );
}
