import Head from 'next/head';
import { useRouter } from "next/router";

import { Button, Container, Group, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { loginUser, registerUser } from '../../../api';

function Login() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
    });

    const { mutate } = useMutation<string, AxiosError, Parameters<typeof loginUser>["0"]>(loginUser, {
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
                id: "login",
                title: "Success",
                color: 'green',
                message: "Successfully Login",
            })
            router.push("/");
        },
        onError: () => {
            updateNotification({
                id: "LOgin",
                title: "Error",
                color: 'red',
                message: "Could not login",
            })
        }
    })

    return (
        <>
            <Head>
                <title>Login User</title>
            </Head>

            <Container>
                <Title>Login</Title>
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

                        <Group position="right" mt="md">
                            <Button type="submit">Login</Button>
                        </Group>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Login