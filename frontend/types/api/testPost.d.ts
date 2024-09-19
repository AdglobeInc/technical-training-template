interface TestPostRequest {
  id: number;
  text: string;
}

interface TestPostResponse {
  status: "success";
  id: number;
  title: string;
  content: string;
}
