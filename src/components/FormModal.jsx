import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";
import { userSchema, postSchema } from "../utils/schemas";


export default function FormModal({ open, onClose, title, type = "users", initial = null, onSubmit }) {
  const isEdit = Boolean(initial);

  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: zodResolver(type === "users" ? userSchema : postSchema),
    defaultValues: initial
      ? type === "users"
        ? { name: `${initial.firstName} ${initial.lastName}`, email: initial.email, city: initial.address?.city }
        : { title: initial.title, body: initial.body, userId: initial.userId }
      : type === "users"
      ? { name: "", email: "", city: "" }
      : { title: "", body: "", userId: "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) return;
    reset(initial
      ? type === "users"
        ? { name: `${initial.firstName} ${initial.lastName}`, email: initial.email, city: initial.address?.city }
        : { title: initial.title, body: initial.body, userId: initial.userId }
      : type === "users"
      ? { name: "", email: "", city: "" }
      : { title: "", body: "", userId: "" }
    );
  }, [open, initial, reset, type]);

  const onFormSubmit = (data) => {
    if (type === "users") {
      const [firstName, ...rest] = data.name.trim().split(" ");
      onSubmit({
        id: initial?.id,
        firstName,
        lastName: rest.join(" "),
        email: data.email,
        address: { city: data.city },
      });
    } else {
      onSubmit({
        id: initial?.id,
        title: data.title,
        body: data.body,
        userId: Number(data.userId),
      });
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-md lg:max-w-2xl p-6 rounded-2xl shadow-2xl bg-white border-gray-200">
        {title && <h3 className="mb-6 text-lg md:text-xl font-semibold text-gray-800">{title}</h3>}

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
              className="w-full sm:w-auto px-5 py-2 rounded-md font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
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
