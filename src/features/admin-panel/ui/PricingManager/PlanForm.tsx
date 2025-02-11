import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdatePricingPlanMutation } from "../../model/api";
import { PricingPlan } from "../../model/types";

const schema = yup.object({
   title: yup.string().required(),
   price: yup.number().min(0).required(),
});

export const PlanForm = ({ plan }: { plan?: PricingPlan }) => {
   const [updatePlan] = useUpdatePricingPlanMutation();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: plan,
   });

   const onSubmit = async (data: Partial<PricingPlan>) => {
      await updatePlan({ id: plan?.id || "new", ...data });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <input {...register("title")} placeholder="Название тарифа" />
         {errors.title && <span>{errors.title.message}</span>}

         <input type="number" {...register("price")} placeholder="Цена" />
         {errors.price && <span>{errors.price.message}</span>}

         <button type="submit">{plan ? "Обновить" : "Создать"}</button>
      </form>
   );
};
