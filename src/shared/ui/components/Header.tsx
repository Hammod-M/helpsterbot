import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { logout } from "@/features/auth/model/slice";
import {
   Container,
   Group,
   Button,
   Menu,
   Burger,
   Paper,
   Title,
   Drawer,
   Stack,
   Divider,
   Avatar,
   Text,
   rem,
   useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { IconUser, IconLogout, IconMessage } from "@tabler/icons-react";

export const Header = ({ onMenuToggle }: { onMenuToggle: () => void }) => {
   const dispatch = useDispatch();
   const { isAuthenticated, user } = useSelector(
      (state: RootState) => state.auth
   );
   const theme = useMantineTheme();
   const isMobile = useMediaQuery("(max-width: 768px)");
   const [drawerOpened, setDrawerOpened] = useState(false);

   const links = [
      { label: "Главная", link: "/" },
      { label: "Тарифы", link: "/pricing" },
      { label: "Блог", link: "/blog" },
      { label: "Изображения", link: "/images" },
      { label: "Видео", link: "/video" },
   ];

   const userMenuItems = (
      <Menu withArrow position="bottom-end">
         <Menu.Item
            component={Link}
            to="/profile"
            leftSection={
               <IconUser style={{ width: rem(14), height: rem(14) }} />
            }
         >
            Профиль
         </Menu.Item>

         <Menu.Item
            component={Link}
            to="/chat"
            leftSection={
               <IconMessage style={{ width: rem(14), height: rem(14) }} />
            }
         >
            Чат
         </Menu.Item>

         <Menu.Item
            leftSection={
               <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => dispatch(logout())}
         >
            Выход
         </Menu.Item>
      </Menu>
   );

   return (
      <>
         <Paper
            radius={0}
            style={{
               background: "linear-gradient(90deg, #0071e3, #00a1f1)",
            }}
            p="md"
         >
            <Container size="lg">
               <Group
                  justify="space-between"
                  align="center"
                  style={{ height: 60 }}
               >
                  <Title
                     order={2}
                     style={{
                        color: theme.white,
                        fontFamily: theme.headings.fontFamily,
                     }}
                  >
                     Logo
                  </Title>

                  {!isMobile ? (
                     <Group gap="xl">
                        {links.map((link) => (
                           <Button
                              key={link.label}
                              component={Link}
                              to={link.link}
                              variant="subtle"
                              style={{
                                 color: theme.white,
                                 "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                 },
                              }}
                           >
                              {link.label}
                           </Button>
                        ))}

                        {isAuthenticated ? (
                           <Menu withArrow position="bottom-end">
                              <Menu.Target>
                                 <Avatar
                                    src={user?.avatar}
                                    radius="xl"
                                    style={{
                                       cursor: "pointer",
                                       border: `2px solid ${theme.white}`,
                                    }}
                                 />
                              </Menu.Target>

                              <Menu.Dropdown>
                                 <Menu.Label>
                                    {user?.name}
                                    <Text size="xs" c="dimmed">
                                       {user?.email}
                                    </Text>
                                 </Menu.Label>
                                 <Divider />

                                 {userMenuItems}
                              </Menu.Dropdown>
                           </Menu>
                        ) : (
                           <Group gap="xs">
                              <Button
                                 component={Link}
                                 to="/auth/signin"
                                 variant="light"
                                 color="appleBlue"
                                 radius="xl"
                                 size="md"
                                 style={{
                                    border: `1px solid ${theme.white}`,
                                    color: theme.white,
                                    "&:hover": {
                                       backgroundColor:
                                          "rgba(255,255,255,0.15)",
                                    },
                                 }}
                              >
                                 Вход
                              </Button>
                              <Button
                                 component={Link}
                                 to="/auth/signup"
                                 variant="light"
                                 color="appleGray"
                                 radius="xl"
                                 size="md"
                                 style={{
                                    border: `1px solid ${theme.white}`,
                                    color: theme.white,
                                    "&:hover": {
                                       backgroundColor:
                                          "rgba(255,255,255,0.15)",
                                    },
                                 }}
                              >
                                 Регистрация
                              </Button>
                           </Group>
                        )}
                     </Group>
                  ) : (
                     <Burger
                        opened={drawerOpened}
                        onClick={() => setDrawerOpened((o) => !o)}
                        size="sm"
                        color={theme.white}
                     />
                  )}
               </Group>
            </Container>
         </Paper>

         <Drawer
            opened={drawerOpened}
            onClose={() => setDrawerOpened(false)}
            size="100%"
            padding="md"
            position="right"
            overlay={{ opacity: 0.5, blur: 4 }}
         >
            <Stack gap="md">
               {links.map((link) => (
                  <Button
                     key={link.label}
                     component={Link}
                     to={link.link}
                     onClick={() => setDrawerOpened(false)}
                     variant="subtle"
                     fullWidth
                  >
                     {link.label}
                  </Button>
               ))}

               <Divider my="md" />

               {isAuthenticated ? (
                  <>
                     <Stack gap={4}>
                        <Text fw={500}>{user?.name}</Text>
                        <Text size="sm" c="dimmed">
                           {user?.email}
                        </Text>
                     </Stack>
                     <Divider />

                     {userMenuItems}
                  </>
               ) : (
                  <Group grow>
                     <Button
                        component={Link}
                        to="/auth/signin"
                        variant="outline"
                        radius="xl"
                     >
                        Вход
                     </Button>
                     <Button component={Link} to="/auth/signup" radius="xl">
                        Регистрация
                     </Button>
                  </Group>
               )}
            </Stack>
         </Drawer>
      </>
   );
};
