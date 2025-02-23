import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
   Card,
   Image,
   Text,
   Title,
   Button,
   Container,
   Center,
   Loader,
} from "@mantine/core";
import { useGetArticleByIdQuery } from "@/features/article/model/api";
import ContentDisplay from "@/shared/ui/components/ContentDisplay";

export const ArticlePostPage: React.FC = () => {
   const { postId } = useParams<{ postId: string }>();
   const navigate = useNavigate();
   console.log("id", postId);
   const {
      data: post,
      isLoading,
      isError,
   } = useGetArticleByIdQuery(postId ?? "");

   if (isLoading)
      return (
         <Center style={{ height: "100vh" }}>
            <Loader size="lg" color="blue" variant="dots" />
         </Center>
      );
   if (isError || !post)
      return <div style={{ padding: "20px" }}>Ошибка загрузки поста</div>;

   return (
      <Container size="lg">
         <Button
            variant="light"
            color="blue"
            mb="md"
            onClick={() => navigate("/article")}
         >
            Назад к списку
         </Button>
         <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
               <Image src={post?.img} height={350} alt={post.title} />
            </Card.Section>
            <Title order={2} mt="md">
               {post?.title}
            </Title>

            <ContentDisplay content={post?.text} />

            {/* <Text size="sm" color="dimmed" mt="sm">
               Номер поста: {post.number}
            </Text> */}
         </Card>
      </Container>
   );
};
