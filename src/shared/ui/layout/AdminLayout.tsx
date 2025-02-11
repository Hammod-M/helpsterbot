import { Outlet } from "react-router-dom";
import {
   AppShell,
   Avatar,
   Text,
   Group,
   Box,
   Menu,
   ActionIcon,
   UnstyledButton,
   rem,
   useMantineTheme,
} from "@mantine/core";
import {
   IconArticle,
   IconCurrencyDollar,
   IconHome,
   IconLayoutDashboard,
   IconLogout,
   IconSettings,
   IconUser,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "@/features/auth/model/adminSlice";

export const AdminLayout = () => {
   const dispatch = useDispatch();
   const theme = useMantineTheme();
   const [opened, { toggle }] = useDisclosure();

   return (
      <AppShell
         padding="md"
         navbar={{
            width: { base: 300 },
            breakpoint: "sm",
            collapsed: { mobile: !opened },
         }}
         header={{ height: 70 }}
      >
         <AppShell.Header p="md">
            <Group justify="space-between">
               <Text size="xl" fw={700} c="blue">
                  Административная панель
               </Text>

               <Menu shadow="md" width={200} position="bottom-end">
                  <Menu.Target>
                     <Group gap="sm" style={{ cursor: "pointer" }}>
                        <Avatar radius="xl" color="blue" />
                        <Box>
                           <Text fw={500}>Администратор</Text>
                           <Text size="sm" c="dimmed">
                              admin@example.com
                           </Text>
                        </Box>
                     </Group>
                  </Menu.Target>

                  <Menu.Dropdown>
                     {/* <Menu.Item leftSection={<IconUser size={16} />}>
                        Профиль
                     </Menu.Item> */}
                     {/* <Menu.Item leftSection={<IconSettings size={16} />}>
                        Настройки
                     </Menu.Item> */}
                     <Menu.Divider />
                     <Menu.Item
                        color="red"
                        leftSection={<IconLogout size={16} />}
                        onClick={() => dispatch(adminLogout())}
                     >
                        Выйти
                     </Menu.Item>
                  </Menu.Dropdown>
               </Menu>
            </Group>
         </AppShell.Header>

         <AppShell.Navbar p="md">
            <UnstyledButton component={Link} to="/admin/blog">
               <Group gap="sm">
                  <IconArticle size={20} />
                  <Text>Блог</Text>
               </Group>
            </UnstyledButton>

            <UnstyledButton component={Link} to="/admin/articles">
               <Group gap="sm">
                  <IconArticle size={20} />
                  <Text>Статьи</Text>
               </Group>
            </UnstyledButton>

            <UnstyledButton component={Link} to="/admin/pricing">
               <Group gap="sm">
                  <IconCurrencyDollar size={20} />
                  <Text>Тарифы</Text>
               </Group>
            </UnstyledButton>

            <UnstyledButton component={Link} to="/">
               <Group gap="sm">
                  <IconHome size={20} />
                  <Text>Сайт</Text>
               </Group>
            </UnstyledButton>
         </AppShell.Navbar>

         <AppShell.Main>
            <Box>
               <Outlet />
            </Box>
         </AppShell.Main>
      </AppShell>
   );
};
