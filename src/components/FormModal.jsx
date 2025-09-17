/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";
import { userSchema, postSchema } from "../utils/schemas";

export default function FormModal({ open, onClose, title, type = "users", initial, onSubmit }) {
  if (!open) return null;

  const isEdit = Boolean(initial);
  const schema = type === "users" ? userSchema : postSchema;

  const getDefaults = (data) =>
    data
      ? type === "users"
        ? { name: `${data.firstName} ${data.lastName}`, email: data.email, city: data.address?.city }
        : { title: data.title, body: data.body, userId: data.userId }
      : ""; 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaults(initial),
    mode: "onChange",
  });

  useEffect(() => {
    if (open) reset(getDefaults(initial));
  }, [open, initial, reset]);

  const onFormSubmit = (data) => {
    const payload =
      type === "users"
        ? {
            id: initial?.id,
            firstName: data.name.split(" ")[0],
            lastName: data.name.split(" ").slice(1).join(" "),
            email: data.email,
            address: { city: data.city },
          }
        : { id: initial?.id, ...data, userId: Number(data.userId) };

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md lg:max-w-2xl p-6 rounded-2xl shadow-2xl bg-white">
        {title && <h3 className="mb-6 text-lg font-semibold">{title}</h3>}

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {type === "users" ? (
            <>
              <Field label="Name" {...register("name")} error={errors.name?.message} />
              <Field label="Email" type="email" {...register("email")} error={errors.email?.message} />
              <Field label="City" {...register("city")} error={errors.city?.message} />
            </>
          ) : (
            <>
              <Field label="Title" {...register("title")} error={errors.title?.message} />
              <Field label="Body" as="textarea" rows={4} {...register("body")} error={errors.body?.message} />
              <Field label="User ID" type="number" {...register("userId", { valueAsNumber: true })} error={errors.userId?.message} />
            </>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isEdit ? "Update" : "Add"}
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-md font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm font-medium mb-1">{label}</label>}
      <input
        {...props}
        className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
