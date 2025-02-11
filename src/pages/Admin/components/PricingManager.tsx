import { useState } from "react";
import {
   Container,
   Title,
   Button,
   Group,
   Modal,
   TextInput,
   NumberInput,
   List,
   Table, // New import
} from "@mantine/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
   useCreatePricingPlanMutation,
   useUpdatePricingPlanMutation,
} from "@/features/pricing/model/api";
import { useGetPricingPlansQuery } from "@/features/pricing/model/api";

// Define the schema
const schema = yup.object().shape({
   name: yup.string().required("Название обязательно"),
   price: yup.number().required("Цена обязательна"),
});

export const PricingManager = () => {
   const { data: plans } = useGetPricingPlansQuery();
   const [createPricingPlan] = useCreatePricingPlanMutation();
   const [updatePricingPlan] = useUpdatePricingPlanMutation();
   const [opened, setOpened] = useState(false);
   const [editingPlan, setEditingPlan] = useState(null);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: { name: "", price: 0 },
   });

   const openCreate = () => {
      setEditingPlan(null);
      reset({ name: "", price: 0 });
      setOpened(true);
   };

   const openEdit = (plan) => {
      setEditingPlan(plan);
      // Changed from plan.title to plan.name to properly populate fields
      reset({ name: plan.name, price: plan.price });
      setOpened(true);
   };

   const onSubmit = (data) => {
      if (editingPlan) {
         updatePricingPlan({ subscribe_id: editingPlan.id, ...data });
      } else {
         createPricingPlan(data);
      }
      setOpened(false);
   };

   return (
      <Container size="lg">
         <Group justify="space-between" mb="md">
            <Title order={2}>Управление тарифами</Title>
            <Button onClick={openCreate}>Добавить тариф</Button>
         </Group>
         <Table highlightOnHover>
            <thead>
               <tr>
                  <th style={{ textAlign: "left" }}>Название</th>
                  <th style={{ textAlign: "left" }}>Цена</th>
                  <th style={{ textAlign: "left" }}>Действия</th>
               </tr>
            </thead>
            <tbody>
               {plans?.map((plan) => (
                  <tr key={plan.id}>
                     <td>{plan.name}</td>
                     <td>{plan.price} ₽</td>
                     <td>
                        <Button size="xs" onClick={() => openEdit(plan)}>
                           Редактировать
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
         <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title={editingPlan ? "Редактировать тариф" : "Создать тариф"}
         >
            <form onSubmit={handleSubmit(onSubmit)}>
               <TextInput
                  label="Название тарифа"
                  {...register("name")}
                  error={errors.name?.message}
                  required
               />
               <NumberInput
                  label="Цена"
                  {...register("price", { valueAsNumber: true })}
                  error={errors.price?.message}
                  required
                  mt="md"
               />
               <Group justify="space-between" mt="md">
                  <Button variant="outline" onClick={() => setOpened(false)}>
                     Отмена
                  </Button>
                  <Button type="submit">
                     {editingPlan ? "Сохранить" : "Создать"}
                  </Button>
               </Group>
            </form>
         </Modal>
      </Container>
   );
};
