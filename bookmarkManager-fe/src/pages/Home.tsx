import { useQuery } from "@tanstack/react-query"
import { getContent } from "../services/handlers"

const Home = () => {
  const { data, isError, error } = useQuery({
    queryKey: ["content"],
    queryFn: getContent
  })

  if(isError) {
    console.log(error);
    return <div>Error fetching...</div>
  }

  console.log(data);

  return (
    <>
      <div>Home</div>
    </>
  )
}

export default Home