import { useState } from "react";
import {
   Container,
   Title,
   Button,
   Group,
   Modal,
   TextInput,
   NumberInput,
   Table,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
   useCreatePricingPlanMutation,
   useDeletePricingPlanMutation,
   useUpdatePricingPlanMutation,
} from "@/features/pricing/model/api";
import { useGetPricingPlansQuery } from "@/features/pricing/model/api";

const schema = yup.object().shape({
   name: yup.string().required("Название обязательно"),
   price: yup.number().required("Цена обязательна"),
   message_count: yup.number().required("Количество сообщений обязательно"),
   max_length_sym: yup
      .number()
      .required("Максимальная длина символов обязательна"),
   image_count: yup.number().required("Количество изображений обязательно"),
   voice_count: yup
      .number()
      .required("Количество голосовых сообщений обязательно"),
});

export const PricingManager = () => {
   const { data: plans } = useGetPricingPlansQuery();
   const [createPricingPlan] = useCreatePricingPlanMutation();
   const [updatePricingPlan] = useUpdatePricingPlanMutation();
   const [deletePricingPlan] = useDeletePricingPlanMutation();
   const [opened, setOpened] = useState(false);
   const [editingPlan, setEditingPlan] = useState(null);

   const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         name: "",
         price: 0,
         message_count: 0,
         max_length_sym: 0,
         image_count: 0,
         voice_count: 0,
      },
   });

   const openEdit = (plan) => {
      setEditingPlan(plan);
      reset({
         name: plan.name,
         price: plan.price,
         message_count: plan.message_count,
         max_length_sym: plan.max_length_sym,
         image_count: plan.image_count,
         voice_count: plan.voice_count,
      });
      setOpened(true);
   };

   const openCreate = () => {
      setEditingPlan(null);
      reset({
         name: "",
         price: 0,
         message_count: 0,
         max_length_sym: 0,
         image_count: 0,
         voice_count: 0,
      });
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

   const hadnleDeletePlan = (plan) => {
      const isConfirmed = window.confirm(
         "Вы уверены, что хотите удалить этот тариф?"
      );
      if (isConfirmed) {
         deletePricingPlan(plan.id);
      }
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
                  <th style={{ textAlign: "left" }}>Сообщений</th>
                  <th style={{ textAlign: "left" }}>Макс. длина</th>
                  <th style={{ textAlign: "left" }}>Изображений</th>
                  <th style={{ textAlign: "left" }}>Голосовых</th>
                  <th style={{ textAlign: "left" }}>Действия</th>
               </tr>
            </thead>
            <tbody>
               {plans?.map((plan) => (
                  <tr key={plan.id}>
                     <td>{plan.name}</td>
                     <td>{plan.price} ₽</td>
                     <td>{plan.message_count}</td>
                     <td>{plan.max_length_sym}</td>
                     <td>{plan.image_count}</td>
                     <td>{plan.voice_count}</td>
                     <td>
                        <Button size="xs" onClick={() => openEdit(plan)}>
                           Редактировать
                        </Button>
                        <Button
                           size="xs"
                           onClick={() => hadnleDeletePlan(plan)}
                        >
                           Удалить
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
               <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                     <TextInput
                        label="Название тарифа"
                        {...field}
                        error={errors.name?.message}
                        required
                     />
                  )}
               />
               <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                     <NumberInput
                        label="Цена"
                        {...field}
                        error={errors.price?.message}
                        required
                        mt="md"
                     />
                  )}
               />
               <Controller
                  name="message_count"
                  control={control}
                  render={({ field }) => (
                     <NumberInput
                        label="Количество сообщений"
                        {...field}
                        error={errors.message_count?.message}
                        required
                        mt="md"
                     />
                  )}
               />
               <Controller
                  name="max_length_sym"
                  control={control}
                  render={({ field }) => (
                     <NumberInput
                        label="Максимальная длина символов"
                        {...field}
                        error={errors.max_length_sym?.message}
                        required
                        mt="md"
                     />
                  )}
               />
               <Controller
                  name="image_count"
                  control={control}
                  render={({ field }) => (
                     <NumberInput
                        label="Количество изображений"
                        {...field}
                        error={errors.image_count?.message}
                        required
                        mt="md"
                     />
                  )}
               />
               <Controller
                  name="voice_count"
                  control={control}
                  render={({ field }) => (
                     <NumberInput
                        label="Количество голосовых сообщений"
                        {...field}
                        error={errors.voice_count?.message}
                        required
                        mt="md"
                     />
                  )}
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
