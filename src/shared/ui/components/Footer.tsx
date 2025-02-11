import {
   Anchor,
   Container,
   Divider,
   Group,
   List,
   Stack,
   Text,
   Title,
   useMantineTheme,
} from "@mantine/core";
import {
   IconBrandInstagram,
   IconBrandTelegram,
   IconBrandTwitter,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const Footer = () => {
   const theme = useMantineTheme();

   const links = [
      { label: "Главная", link: "/" },
      { label: "Тарифы", link: "/pricing" },
      { label: "Блог", link: "/blog" },
      { label: "FAQ", link: "/faq" },
      { label: "Контакты", link: "/contacts" },
   ];

   const socialLinks = [
      { icon: <IconBrandTwitter size={20} />, link: "#" },
      { icon: <IconBrandInstagram size={20} />, link: "#" },
      { icon: <IconBrandTelegram size={20} />, link: "#" },
   ];

   return (
      <footer
         style={{
            backgroundColor: theme.colors.dark[7],
            color: theme.white,
         }}
      >
         <Container size="lg" py={40}>
            {/* Основной блок: два столбца в одном ряду */}
            <Group justify="space-between" align="start" gap="xl">
               {/* Левый блок: заголовок, описание и вертикальное меню */}
               <Stack gap="xs">
                  <Title order={3} style={{ color: theme.white }}>
                     Chat AI
                  </Title>
                  <Text size="sm" color="dimmed">
                     Современная платформа для работы с искусственным
                     интеллектом.
                  </Text>
                  <Stack gap={4} mt={theme.spacing.lg}>
                     {links.map((item) => (
                        <Anchor
                           key={item.link}
                           component={Link}
                           to={item.link}
                           size="sm"
                           sx={{
                              color: theme.white,
                              cursor: "pointer",
                              textDecoration: "none",
                              "&:hover": {
                                 textDecoration: "underline",
                                 color: theme.colors.gray[0],
                              },
                           }}
                        >
                           {item.label}
                        </Anchor>
                     ))}
                  </Stack>
               </Stack>

               {/* Правый блок: контакты и соцсети */}
               <Stack gap="lg">
                  <Stack gap="xs">
                     <Title order={4} style={{ color: theme.white }}>
                        Контакты
                     </Title>
                     <List spacing="sm" icon={null}>
                        <List.Item>
                           <Text size="sm" sx={{ color: theme.white }}>
                              Email: support@aistudio.com
                           </Text>
                        </List.Item>
                        <List.Item>
                           <Text size="sm" sx={{ color: theme.white }}>
                              Телефон: +7 (900) 123-45-67
                           </Text>
                        </List.Item>
                        <List.Item>
                           <Text size="sm" sx={{ color: theme.white }}>
                              Москва, Пресненская наб. 12
                           </Text>
                        </List.Item>
                     </List>
                  </Stack>

                  <Stack gap="xs">
                     <Title order={4} style={{ color: theme.white }}>
                        Социальные сети
                     </Title>
                     <Group gap="xs">
                        {socialLinks.map((item, index) => (
                           <Anchor
                              key={index}
                              href={item.link}
                              target="_blank"
                              sx={{
                                 color: theme.white,
                                 "&:hover": { color: theme.colors.gray[0] },
                              }}
                           >
                              {item.icon}
                           </Anchor>
                        ))}
                     </Group>
                  </Stack>
               </Stack>
            </Group>

            <Divider my="lg" color={theme.colors.dark[5]} />

            {/* Нижняя строка: копирайт и дополнительные ссылки */}
            <Group justify="space-between" align="center">
               <Text size="sm" sx={{ color: theme.white }}>
                  © 2025. Все права защищены
               </Text>
               <Group gap={30}>
                  <Anchor
                     component={Link}
                     to="/privacy"
                     size="sm"
                     sx={{
                        color: theme.white,
                        textDecoration: "none",
                        "&:hover": {
                           textDecoration: "underline",
                           color: theme.colors.gray[0],
                        },
                     }}
                  >
                     Политика конфиденциальности
                  </Anchor>
                  <Anchor
                     component={Link}
                     to="/terms"
                     size="sm"
                     sx={{
                        color: theme.white,
                        textDecoration: "none",
                        "&:hover": {
                           textDecoration: "underline",
                           color: theme.colors.gray[0],
                        },
                     }}
                  >
                     Условия использования
                  </Anchor>
               </Group>
            </Group>
         </Container>
      </footer>
   );
};
