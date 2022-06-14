import axios from 'axios';
import { Video } from '../types';

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/v1/users`;
const meBase = `${base}/api/v1/users/me`;
const authBase = `${base}/api/v1/auth`;
const videoBase = `${base}/api/v1/videos`;

export function registerUser(payload: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return axios.post(userBase, payload).then((res) => res.data);
}

export function loginUser(payload: { email: string; password: string }) {
  return axios
    .post(authBase, payload, { withCredentials: true })
    .then((res) => res.data);
}

export function getMe() {
  return axios
    .get(meBase, { withCredentials: true })
    .then((res) => res.data)
    .catch(() => null);
}

export function uploadVideo({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) {
  return axios
    .post(videoBase, formData, {
      withCredentials: true,
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export function updateVideo({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) {
  return axios.patch<Video>(`${videoBase}/${videoId}`, payload, {
    withCredentials: true,
  });
}

export function getVideos() {
  return axios.get(videoBase).then((res) => res.data);
}
