import { SimpleGrid } from "@mantine/core";
import { VideoTeaser } from "../components/ui";
import { useVideo } from "../context/video";
import Home from "../Layout"

const HomePage = () => {
  const { videos } = useVideo();
  return (
    <SimpleGrid cols={3}>
      {(videos || []).map((video) => {
        return <VideoTeaser key={video.videoId} video={video} />;
      })}
    </SimpleGrid>
  )
}

HomePage.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Home>
      {page}
    </Home>
  )
}

export default HomePage
