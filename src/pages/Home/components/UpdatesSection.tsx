import { useGetBlogPostsQuery } from "@/features/blog/model/api";
import { Link } from "react-router-dom";
import {
   Card,
   Image,
   Text,
   Group,
   Button,
   Container,
   Title,
   SimpleGrid,
   rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { stripHtml } from "@/shared/lib/helpers";
import { IconArrowRight, IconCalendar } from "@tabler/icons-react";

export const UpdatesSection = () => {
   const { data: posts = [] } = useGetBlogPostsQuery();
   const isSmallScreen = useMediaQuery("(max-width: 768px)");

   return (
      <Container size="lg" py={rem(60)}>
         <Group justify="space-between" align="center" mb="xl">
            <Title
               order={2}
               fw={700}
               style={{ fontFamily: "SF Pro Display, sans-serif" }}
            >
               Последние обновления
            </Title>
            <Button
               component={Link}
               to="/blog"
               variant="subtle"
               color="appleBlue"
               rightSection={<IconArrowRight size={16} />}
               size="md"
            >
               Посмотреть все
            </Button>
         </Group>

         <SimpleGrid
            cols={{ base: 1, md: 3 }}
            spacing="xl"
            verticalSpacing="xl"
         >
            {posts?.slice(0, 3).map((post) => (
               <Card
                  key={post.id}
                  padding="lg"
                  radius="lg"
                  withBorder
                  style={{
                     minHeight: rem(420),
                     display: "flex",
                     flexDirection: "column",
                     transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  styles={{
                     root: {
                        "&:hover": {
                           transform: "translateY(-5px)",
                           boxShadow: "var(--shadow-lg)",
                        },
                     },
                  }}
               >
                  <Card.Section mb="md">
                     <Image
                        src={post.img}
                        alt={post.title}
                        height={200}
                        fit="cover"
                        style={{
                           borderTopLeftRadius: rem(12),
                           borderTopRightRadius: rem(12),
                        }}
                     />
                  </Card.Section>

                  <Group justify="space-between" mb="xs">
                     <Title
                        order={3}
                        fw={600}
                        lineClamp={1}
                        style={{ flex: 1 }}
                     >
                        {post.title}
                     </Title>
                  </Group>

                  <Text size="sm" c="dimmed" lineClamp={3} mb="auto">
                     {stripHtml(post?.text || "")}
                  </Text>

                  <Group justify="space-between" mt="md">
                     <Group gap="xs">
                        <IconCalendar size={16} color="var(--apple-gray-2)" />
                        <Text size="sm" c="dimmed">
                           {new Date(post.created_at).toLocaleDateString()}
                        </Text>
                     </Group>
                     <Button
                        component={Link}
                        to={`/blog/${post.id}`}
                        variant="light"
                        color="appleBlue"
                        size="sm"
                        rightSection={<IconArrowRight size={16} />}
                        styles={{
                           root: {
                              border: "1px solid var(--apple-blue)",
                              "&:hover": {
                                 backgroundColor: "var(--apple-blue)",
                                 color: "white",
                              },
                           },
                        }}
                     >
                        Подробнее
                     </Button>
                  </Group>
               </Card>
            ))}
         </SimpleGrid>
      </Container>
   );
};
