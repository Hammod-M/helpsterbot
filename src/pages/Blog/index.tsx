import React from "react";
import { Link } from "react-router-dom";
import {
   Card,
   Image,
   Text,
   Badge,
   Button,
   Group,
   Title,
   SimpleGrid,
   Box,
   Center,
   Loader,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "@/model/blog/types";
import { useGetBlogPostsQuery } from "@/features/blog/model/api";
import { stripHtml } from "@/shared/lib/helpers";



export const BlogPage: React.FC = () => {
   const { data: posts, isLoading, isError } = useGetBlogPostsQuery();
   const navigate = useNavigate();

   if (isLoading)
      return (
         <Center style={{ height: "100vh" }}>
            <Loader size="lg" color="blue" variant="dots" />
         </Center>
      );
   if (isError || !posts) return <div>Error loading posts</div>;

   return (
      <Box p="xl">
         <Title order={1} ta="center" mb="xl" fw={700}>
            Блог
         </Title>

         <SimpleGrid
            cols={{ base: 1, md: 2 }}
            spacing="xl"
            verticalSpacing="xl"
            mx={{ md: "xl" }}
         >
            {posts.map((post: BlogPost) => (
               <Card
                  key={post?.id}
                  shadow="md"
                  padding="lg"
                  radius="lg"
                  withBorder
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between",
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
                  <Card.Section>
                     <Image
                        src={post?.img}
                        height={200}
                        alt={post?.title}
                        fit="cover"
                        style={{
                           borderTopLeftRadius: "var(--radius-md)",
                           borderTopRightRadius: "var(--radius-md)",
                        }}
                     />
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                     <Text fw={600} size="lg">
                        {post?.title}
                     </Text>
                     <Badge color="appleBlue" variant="light" radius="sm">
                        #{post?.number}
                     </Badge>
                  </Group>

                  <Text size="sm" c="dimmed" lineClamp={3} mb="md">
                     {stripHtml(post?.text || "")}
                  </Text>

                  <Group justify="space-between" mt="md">
                     <Text size="xs" color="gray">
                        {new Date(post.created_at).toLocaleDateString()}
                     </Text>
                     <Group spacing="xs">
                        <Text size="xs" weight={500}>
                           {post.number}
                        </Text>
                        <Button
                           component={Link}
                           to={`/blog/${post.id}`}
                           variant="light"
                           color="blue"
                           size="sm"
                        >
                           Читать далее
                        </Button>
                     </Group>
                  </Group>
               </Card>
            ))}
         </SimpleGrid>
      </Box>
   );
};
