import {
   useGetPricingPlansQuery,
   useUpdatePricingPlanMutation,
} from "../../model/api";
import { EditableCell } from "@/shared/ui/components/EditableCell";
import { PricingPlan } from "../../model/types";

export const PricingTable = () => {
   const { data: plans, isLoading } = useGetPricingPlansQuery();
   const [updatePlan] = useUpdatePricingPlanMutation();

   const handleSave = async (
      id: string,
      field: keyof PricingPlan,
      value: any
   ) => {
      await updatePlan({ id, [field]: value });
   };

   return (
      <table className="admin-table">
         <thead>
            <tr>
               <th>Название</th>
               <th>Цена</th>
               <th>Фичи</th>
            </tr>
         </thead>
         <tbody>
            {plans?.map((plan) => (
               <tr key={plan.id}>
                  <td>
                     <EditableCell
                        value={plan.title}
                        onSave={(value) => handleSave(plan.id, "title", value)}
                     />
                  </td>
                  <td>
                     <EditableCell
                        value={plan.price.toString()}
                        onSave={(value) =>
                           handleSave(plan.id, "price", Number(value))
                        }
                     />
                  </td>
                  <td>{plan.features.join(", ")}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};
