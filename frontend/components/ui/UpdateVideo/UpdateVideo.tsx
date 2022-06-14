import { Dispatch, SetStateAction } from "react"

import { useForm } from "@mantine/hooks";
import { updateNotification } from "@mantine/notifications";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { Button, Container, Group, Paper, Switch, TextInput } from "@mantine/core";
import { updateVideo } from "../../../api";
import { Video } from "../../../types";
import { useVideo } from "../../../context/video";

interface UpdateVideoProps {
    videoId: string | any
    isOpened: Dispatch<SetStateAction<boolean>>
}

const UpdateVideo: React.FunctionComponent<UpdateVideoProps> = ({ videoId, isOpened }) => {
    const { refetch } = useVideo()

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            published: false
        },
    });

    const { mutate } = useMutation<AxiosResponse<Video>, AxiosError, Parameters<typeof updateVideo>["0"]>(updateVideo, {
        onSuccess: () => {
            updateNotification({
                id: "video",
                title: "Success",
                color: 'green',
                message: "Successfully video uploaded"
            })

            isOpened(false);
            refetch();
        },
        onError: () => {
            updateNotification({
                id: "video",
                title: "Error",
                color: 'red',
                message: "Could not upload video",
            })
        }
    })
    return (
        <Container>
            <Paper
                withBorder
                shadow="md"
                p={30}
                mt={30}
                radius="md"
            >
                <form onSubmit={form.onSubmit((values) => mutate({ videoId, ...values }))}>
                    <TextInput
                        required
                        label="Title"
                        size='lg'
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        required
                        label="Description"
                        size='lg'
                        {...form.getInputProps('description')}
                    />

                    <Switch mt='md' size='lg' label="Published" {...form.getInputProps("published")} />

                    <Group position="right" mt="md">
                        <Button type="submit">Save</Button>
                    </Group>
                </form>
            </Paper>
        </Container >
    )
}

export default UpdateVideo