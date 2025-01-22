import { useQuery } from "@tanstack/react-query"
import { getMeta } from "../../services/handlers"
import { Trash2, ExternalLink } from "lucide-react"
import fallbackImg from "../../assets/image.png"
const ContentCard = ({link} : {link: string}) => {
  const { data , isError, error } = useQuery({
    queryKey: ["preview", link],
    queryFn: () => getMeta(link)
  })

  if(isError) {
    console.error(error);
    return <div>Error loading Preview</div>
  }

  data ? console.log(data) : null

  return (
    <div className="flex flex-col h-auto justify-center items-center group gap-2 cursor-pointer mb-3">
      <div className="relative grow self-stretch">
        <div className="relative h-full rounded-xl flex flex-col shadow-xl overflow-hidden">
          <img src={data?.image ? data.image : fallbackImg} alt="Preview" className="w-full object-contain" />
          <div className="absolute inset-0 w-full h-full bg-black opacity-0 backdrop-blur-sm bg-opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 p-4 transition-opacity ease-out duration-300">
            <div className="w-full h-full flex flex-col justify-between">
              <div className="text-white">
                <div className="flex justify-between items-center">
                  <p className="text-white font-medium truncate">{data?.title}</p>
                  <button className="rounded-full bg-red-500 hover:bg-red-600 p-1.5">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="text-white flex justify-end w-full">
                  <div className="flex items-center gap-2 text-sm px-2 py-1 bg-black backdrop-blur-lg bg-opacity-30 rounded-full border border-gray-200 border-opacity-30 max-w-56">
                    <div className="truncate"><a href={link}>{link}</a></div>
                    <div>
                      <ExternalLink size={16} />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-sm text-muted px-3">
        {data?.title}
      </div>
    </div>
  )
}

export default ContentCard