import { useState } from "react"

import { Button, Group, Modal, RingProgress, Text, Center } from "@mantine/core"
import { Dropzone, MIME_TYPES } from "@mantine/dropzone"
import { ArrowBigUpLine } from "tabler-icons-react"
import { useMutation } from "react-query"
import { AxiosError, AxiosResponse } from "axios"
import { updateNotification } from "@mantine/notifications"

import { uploadVideo } from "../../../api"
import UpdateVideo from "../UpdateVideo"
import { Video } from "../../../types"

const UploadVideo = () => {
    const [opened, setOpened] = useState(false)
    const [progress, setProgress] = useState(0)

    const { mutate, data } = useMutation<string, AxiosError, Parameters<typeof uploadVideo>["0"]>(uploadVideo, {
        onSuccess: () => {
            updateNotification({
                id: "video",
                title: "Success",
                color: 'green',
                message: "Successfully video uploaded"
            })
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

    const config = {
        onUploadProgress: (progressEvent: any) => {
            const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );

            setProgress(percent);
        },

    };

    function upload(files: File[]) {
        const formData = new FormData();

        formData.append("video", files[0]);

        mutate({ formData, config });
    }

    return (
        <>
            <Modal
                opened={opened}
                closeOnClickOutside={false}
                onClose={() => setOpened(false)}
                title='Upload Video'
                centered
                size='xl'
            >
                {
                    progress === 0 && (
                        <Dropzone
                            onDrop={(files) => {
                                return upload(files)
                            }}
                            accept={[MIME_TYPES.mp4]}
                            multiple={false}
                        >
                            {(status) => {
                                return (
                                    <Group
                                        direction="column"
                                        spacing='xl'
                                        sx={{
                                            height: '50vh',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <ArrowBigUpLine />
                                        <Text>Drag video here or click to find</Text>
                                    </Group>
                                )
                            }}
                        </Dropzone>
                    )
                }
                {
                    progress > 0 && (
                        <Center>
                            <RingProgress
                                sections={[{ value: progress, color: 'blue' }]}
                                label={
                                    <Text color="blue" weight={700} align="center" size="xl">
                                        {progress}%
                                    </Text>
                                }
                            />
                        </Center>
                    )
                }
                {
                    data && (
                        <UpdateVideo videoId={data.videoId} isOpened={setOpened} />
                    )
                }
            </Modal>
            <Button onClick={() => setOpened(true)}>Upload Video</Button>
        </>
    )
}

export default UploadVideo