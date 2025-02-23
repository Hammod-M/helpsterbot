import {
   Container,
   Title,
   Text,
   Divider,
   Box,
   ScrollArea,
   Table,
   Group,
   ThemeIcon,
   Center,
   Loader,
   Button,
} from "@mantine/core";
import {
   useCreatePaymentMutation,
   useGetPricingPlansQuery,
} from "@/features/pricing/model/api";
import { IconCheck, IconStar, IconZzz } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useNavigate } from "react-router-dom";

export const PricingPage = () => {
   const navigate = useNavigate();
   const { userID, isAuthenticated } = useSelector(
      (state: RootState) => state.auth
   );

   const { data: plansFromBackend } = useGetPricingPlansQuery();
   const [createPayment] = useCreatePaymentMutation();

   const handleSelect = async (plan: any) => {
      if (!isAuthenticated) {
         navigate("/auth/signin");
         return;
      }
      const payload = {
         id: userID,
         amount: plan.price * 100,
         subscription_type: plan.name,
         subscription_time: new Date(
            new Date().setDate(new Date().getDate() + 30)
         )
            .toISOString()
            .split("T")[0],
      };
      try {
         const response = await createPayment(payload).unwrap();
         if (response?.message?.Success && response?.message?.PaymentURL) {
            window.location.href = response.message.PaymentURL;
         } else {
            console.log("Payment success");
         }
      } catch (error) {
         console.error("Error creating payment:", error);
      }
   };

   if (!plansFromBackend) {
      return (
         <Center style={{ height: "100vh" }}>
            <Loader size="lg" color="blue" variant="dots" />
         </Center>
      );
   }

   // Статические данные для остальных тарифов
   const staticPlans = [
      {
         id: 2,
         name: "СТАНДАРТ",
         price: 300,
         message_count: 1000,
         max_length_sym: 20000,
         image_count: 200,
         voice_count: 200,
      },
      {
         id: 3,
         name: "ПРЕМИУМ",
         price: 750,
         message_count: 2500,
         max_length_sym: 100000,
         image_count: 500,
         voice_count: 500,
      },
      {
         id: 4,
         name: "УЛЬТРА",
         price: 2000,
         message_count: 7000,
         max_length_sym: 400000,
         image_count: 1400,
         voice_count: 1400,
      },
   ];

   // Объединяем данные от бэкенда и статические данные
   const plans = [
      ...plansFromBackend,
      ...staticPlans.filter(
         (staticPlan) =>
            !plansFromBackend.some((plan) => plan.id === staticPlan.id)
      ),
   ];

   // Функция для форматирования значений
   const formatValue = (value: number | string, isFreePlan: boolean) => {
      if (isFreePlan && value === 0) {
         return "❌";
      }
      return typeof value === "number" ? value.toLocaleString() : value;
   };

   // Данные для таблицы с учетом данных от бэкенда
   const featureRows = [
      {
         feature: "💬 Запросы в месяц",
         values: plans.map((plan) =>
            formatValue(plan.message_count, plan.name === "БЕСПЛАТНО")
         ),
      },
      {
         feature: "📩 Максимальная длина сообщения в символах*",
         values: plans.map((plan) =>
            formatValue(plan.max_length_sym, plan.name === "БЕСПЛАТНО")
         ),
      },
      {
         feature: "🖼️ Создание изображений в месяц",
         values: plans.map((plan) =>
            formatValue(plan.image_count, plan.name === "БЕСПЛАТНО")
         ),
      },
      {
         feature: "🔊 Озвучек в месяц",
         values: plans.map((plan) =>
            formatValue(plan.voice_count, plan.name === "БЕСПЛАТНО")
         ),
      },
      // Статические данные для остальных характеристик
      {
         feature: "📷 Распознавание фото",
         values: ["❌", "✅", "✅", "✅"],
      },
      {
         feature: "⚡ Быстрые ответы",
         values: ["❌", "✅", "✅", "✅"],
      },
      {
         feature:
            "🤖 Доступ к ChatGPT 4o, o3 mini 🆕, Claude Sonnet, Gemini Pro, Perplexity",
         values: ["❌", "✅", "✅", "✅"],
      },
      {
         feature:
            "🤖 Доступ к Claude Opus, Perplexity Pro, ChatGPT o3 mini-high 🆕",
         values: ["❌", "❌", "✅", "✅"],
      },
      {
         feature: "🤖 Доступ к o1",
         values: ["❌", "❌", "❌", "✅"],
      },
   ];

   return (
      <Container size="lg" py={80}>
         {/* Hero Section */}
         <Box mb={40} sx={{ textAlign: "center" }}>
            <Title
               order={1}
               size={48}
               weight={700}
               align="center"
               mb="md"
               sx={(theme) => ({
                  background: `-webkit-linear-gradient(${theme.colors.blue[6]}, ${theme.colors.cyan[5]})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
               })}
            >
               Тарифные планы
            </Title>
            <Text size="xl" color="dimmed" maw={800} mx="auto" align="center">
               Выберите тариф, который подходит именно вам. Наши тарифы созданы
               для всех, у кого есть потребность в качественном сервисе.
            </Text>
         </Box>
         {/* Pricing Table */}
         <ScrollArea>
            <Table highlightOnHover verticalSpacing="md">
               <thead>
                  <tr>
                     <th
                        style={{
                           minWidth: 200,
                           padding: "8px",
                           backgroundColor: "#000",
                           color: "#fff",
                           fontWeight: 400,
                        }}
                     >
                        ВОЗМОЖНОСТЬ
                     </th>
                     {plans.map((plan, index) => {
                        const fontWeight =
                           index === 0
                              ? 400
                              : index === 1 || index === 2
                              ? 700
                              : 400;
                        return (
                           <th
                              key={plan.id}
                              style={{
                                 minWidth: 140,
                                 padding: "8px",
                                 backgroundColor: "#000",
                                 color: "#fff",
                                 fontWeight: fontWeight,
                                 textAlign: "center",
                              }}
                           >
                              <Title order={4} style={{ margin: 0 }}>
                                 {plan.name}
                              </Title>
                              <Text
                                 size="xl"
                                 weight={700}
                                 style={{ margin: 0 }}
                              >
                                 {plan.price}₽/месяц
                              </Text>
                           </th>
                        );
                     })}
                  </tr>
               </thead>
               <tbody>
                  {featureRows.map((row, rowIndex) => (
                     <tr key={rowIndex}>
                        <td
                           style={{
                              padding: "8px",
                              textAlign: "center",
                              border: "1px solid #ccc",
                           }}
                        >
                           {row.feature}
                        </td>
                        {row.values.map((value, colIndex) => {
                           let bgColor = "";
                           if (colIndex === 1)
                              bgColor = "rgba(255, 245, 177, 0.25)";
                           else if (colIndex === 2)
                              bgColor = "rgba(137, 230, 255, 0.25)";
                           else if (colIndex === 3)
                              bgColor = "rgba(252, 8, 0, 0.25)";
                           return (
                              <td
                                 key={colIndex}
                                 style={{
                                    minWidth: 140,
                                    padding: "8px",
                                    textAlign: "center",
                                    backgroundColor: bgColor,
                                    border: "1px solid #ccc",
                                 }}
                              >
                                 {value}
                              </td>
                           );
                        })}
                     </tr>
                  ))}
                  <tr>
                     <td
                        style={{
                           padding: "8px",
                           textAlign: "center",
                           border: "1px solid #ccc",
                        }}
                     ></td>
                     {plans.map((plan, index) =>
                        index === 0 ? (
                           <td
                              key={plan.id}
                              style={{
                                 minWidth: 140,
                                 padding: "8px",
                                 textAlign: "center",
                                 border: "1px solid #ccc",
                              }}
                           ></td>
                        ) : (
                           <td
                              key={plan.id}
                              style={{
                                 minWidth: 140,
                                 padding: "8px",
                                 textAlign: "center",
                                 border: "1px solid #ccc",
                              }}
                           >
                              <Button
                                 variant="outline"
                                 fullWidth
                                 onClick={() => handleSelect(plan)}
                              >
                                 Выбрать
                              </Button>
                           </td>
                        )
                     )}
                  </tr>
               </tbody>
            </Table>
         </ScrollArea>
         <Divider my={40} />
         {/* Features Section */}
         <Box mt={40}>
            <Title order={2} size={36} align="center" mb="xl">
               Почему выбирают нас
            </Title>
            <Group
               position="center"
               justify="space-between"
               spacing="xl"
               noWrap
            >
               <Box sx={{ textAlign: "center" }}>
                  <ThemeIcon variant="light" size={60} radius="lg" color="blue">
                     <IconZzz size={30} />
                  </ThemeIcon>
                  <Title order={4} mt={16}>
                     Простая интеграция
                  </Title>
                  <Text c="dimmed" maw={250}>
                     Быстрое подключение к любой системе за несколько минут
                  </Text>
               </Box>
               <Box sx={{ textAlign: "center" }}>
                  <ThemeIcon variant="light" size={60} radius="lg" color="cyan">
                     <IconStar size={30} />
                  </ThemeIcon>
                  <Title order={4} mt={16}>
                     Надежная защита
                  </Title>
                  <Text c="dimmed" maw={250}>
                     Ваши данные защищены по международным стандартам
                  </Text>
               </Box>
               <Box sx={{ textAlign: "center" }}>
                  <ThemeIcon
                     variant="light"
                     size={60}
                     radius="lg"
                     color="violet"
                  >
                     <IconCheck size={30} />
                  </ThemeIcon>
                  <Title order={4} mt={16}>
                     Гибкая настройка
                  </Title>
                  <Text c="dimmed" maw={250}>
                     Персонализируйте решения под свои задачи
                  </Text>
               </Box>
            </Group>
         </Box>
         <Divider my={40} />
         {/* FAQ Section */}
         <Box mt={40}>
            <Title order={2} size={36} align="center" mb="xl">
               Частые вопросы
            </Title>
            <Group
               position="center"
               justify="space-between"
               spacing="xl"
               noWrap
            >
               <Box sx={{ minWidth: 300 }}>
                  <Title order={4} mb={8}>
                     Можно ли изменить тариф?
                  </Title>
                  <Text c="dimmed" maw={500}>
                     Вы можете перейти на другой тариф в любой момент. Разница в
                     цене будет пересчитана пропорционально.
                  </Text>
               </Box>
               <Box sx={{ minWidth: 300 }}>
                  <Title order={4} mb={8}>
                     Есть ли пробный период?
                  </Title>
                  <Text c="dimmed" maw={500}>
                     Да, мы предоставляем 14-дневный пробный период для всех
                     новых пользователей.
                  </Text>
               </Box>
            </Group>
         </Box>
      </Container>
   );
};
