import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { AppShell, Box, MediaQuery, Navbar, useMantineTheme, Footer, Header, Burger, Text, Anchor, UnstyledButton, Avatar, Group } from "@mantine/core"

import { ToggleTheme, UploadVideo } from '../components/ui'
import { useMe } from "../context/getMe";
import { VideosContextProvider } from "../context/video";

interface HomeProps {
    children?: React.ReactNode
}

const Home: React.FunctionComponent<HomeProps> = ({ children }) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const { user } = useMe()

    return (
        <VideosContextProvider>
            <AppShell
                styles={{
                    main: {
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                fixed
                navbar={
                    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                        <Navbar.Section>{/* Header with logo */}</Navbar.Section>
                        <Navbar.Section grow mt="md">{/* Links sections */}</Navbar.Section>
                        <Navbar.Section>{
                            <Text size="sm">© 2022 CloneYoutube</Text>}
                        </Navbar.Section>
                    </Navbar>
                }
                header={
                    <Header height={70} p="md">
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>


                            <Box sx={() => ({ flex: "1" })}>
                                <Image
                                    src='/logo.png'
                                    alt="Logo"
                                    width="100px"
                                    height="40px"
                                />
                            </Box>

                            {!user && (
                                <>
                                    <Link href="/auth/login" passHref>
                                        <Anchor ml="lg" mr="lr"
                                            title="Login">
                                            Login
                                        </Anchor>
                                    </Link>
                                    <Link href="/auth/register" passHref>
                                        <Anchor ml="lg" mr="lr"
                                            title="Register">
                                            Register
                                        </Anchor>
                                    </Link>
                                </>
                            )}

                            {user &&
                                (
                                    <>
                                        <UnstyledButton

                                            sx={(theme) => ({
                                                display: 'block',
                                                //width: '100%',
                                                padding: theme.spacing.sm,
                                                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                                                '&:hover': {
                                                    backgroundColor:
                                                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                                                },
                                            })}
                                        >
                                            <Group>
                                                <Avatar src={'https://source.unsplash.com/user/wsanter'} radius="xl" />

                                                <div style={{ flex: 1 }}>
                                                    <Text size="sm" weight={500}>
                                                        {user.username}
                                                    </Text>

                                                    <Text color="dimmed" size="xs">
                                                        {user.email}
                                                    </Text>
                                                </div>
                                            </Group>
                                        </UnstyledButton>
                                        <UploadVideo />
                                    </>
                                )
                            }

                            <Anchor ml="lg" >
                                <ToggleTheme />
                            </Anchor>
                        </div>
                    </Header>
                }
            >
                {children}
            </AppShell>
        </VideosContextProvider>
    )
}

export default Home