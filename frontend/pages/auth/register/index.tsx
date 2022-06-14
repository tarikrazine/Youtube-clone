import Head from 'next/head';
import { useRouter } from "next/router";

import { Button, Container, Group, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { registerUser } from '../../../api';

function Register() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const { mutate } = useMutation<string, AxiosError, Parameters<typeof registerUser>["0"]>(registerUser, {
        onMutate: () => {
            showNotification({
                id: "register",
                title: "Creating account",
                message: "Please wait...",
                loading: true,
            })
        },
        onSuccess: () => {
            updateNotification({
                id: "register",
                title: "Success",
                color: 'green',
                message: "Successfully created account",
            })
            router.push("/auth/login");
        },
        onError: () => {
            updateNotification({
                id: "register",
                title: "Error",
                color: 'red',
                message: "Could not create account",
            })
        }
    })

    return (
        <>
            <Head>
                <title>Register user</title>
            </Head>

            <Container>
                <Title>Register</Title>
                <Paper
                    withBorder
                    shadow="md"
                    p={30}
                    mt={30}
                    radius="md"
                >
                    <form onSubmit={form.onSubmit((values) => mutate(values))}>
                        <TextInput
                            required
                            label="Username"
                            placeholder="John doe"
                            size='lg'
                            {...form.getInputProps('username')}
                        />
                        <TextInput
                            required
                            label="Email"
                            placeholder="your@email.com"
                            size='lg'
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your strong password"
                            size='lg'
                            {...form.getInputProps('password')}
                        />
                        <PasswordInput
                            required
                            label="Confirm Password"
                            placeholder="Your strong password"
                            size='lg'
                            {...form.getInputProps('confirmPassword')}
                        />

                        <Group position="right" mt="md">
                            <Button type="submit">Register</Button>
                        </Group>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Register