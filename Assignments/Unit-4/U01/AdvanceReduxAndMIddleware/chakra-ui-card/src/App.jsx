import React from "react";
import { Container } from "@chakra-ui/react";
import {
  Box,
  Avatar,
  Text,
  Button,
  Tag,
  VStack,
  HStack,
  Link,
  Badge,
} from "@chakra-ui/react";

function App() {
  return (
    <Container py={10}>
      <Box
        maxW={{ base: "90%", sm: "400px" }}
        w="full"
        mx="auto"
        boxShadow="md"
        rounded="xl"
        p={6}
        textAlign="center"
      >
        <Box position="relative" w="fit-content" mx="auto" mb={4}>
          <Avatar
            size="xl"
            name="Lindsey James"
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
          />
          <Badge
            boxSize={4}
            bg="green.400"
            borderRadius="full"
            border="2px solid white"
            position="absolute"
            bottom="2"
            right="2"
          />
        </Box>

        <Text fontWeight="bold" fontSize="xl">
          Lindsey James
        </Text>
        <Text fontSize="sm" color="gray.500" mb={4}>
          @lindsey_jam3s
        </Text>

        <Text fontSize="md" mb={2}>
          Actress, musician, songwriter
          <br />
          and artist. PM for work inquires
          <br />
          or <Link color="blue.500">#tag</Link> me in your posts
        </Text>

        <HStack justify="center" wrap="wrap" spacing={2} mt={4} mb={6}>
          {["#ART", "#PHOTOGRAPHY", "#MUSIC"].map((tag) => (
            <Tag key={tag} size="sm" variant="subtle" colorScheme="gray">
              {tag}
            </Tag>
          ))}
        </HStack>

        <HStack justify="center" spacing={4}>
          <Button variant="ghost" colorScheme="gray">
            Message
          </Button>
          <Button colorScheme="blue">Follow</Button>
        </HStack>
      </Box>
    </Container>
  );
}

export default App;
