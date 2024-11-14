import toast from "react-hot-toast"

const error = (message: string) => {
    toast.error(message)
}

export default error