import { useState } from "react"
import Button from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import axios from "axios"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const { username, password } = formData;
    let valid = true;
    if (username.length < 3 || username.length > 20) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be 3-20 characters long",
      }));
      valid = false;
    }
    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      }));
      valid = false;;
    }
    return valid;
  }
  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validate()) {
      return;
    }
    try {
      setLoading(true);
      const { username, password } = formData;
      const response = await axios.post("https://mindvault-api.onrender.com/api/v1/user/signin", {
        username,
        password
      })
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
    catch(error) {
      //@ts-ignore
      toast.error(error.response.data.message);
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({...prev, [id]: value}));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  }

  return (
    <div className="bg-white z-10 mt-10 rounded-xl w-[90%] max-w-[600px] font-manrope shadow-lg">
      <div className="flex flex-col p-6 space-y-1.5">
        <h3 className="text-xl md:text-2xl text-primary font-semibold">Sign In</h3>
        <p className="text-muted text-sm">Log in to your profile</p>
      </div>
      <div className="px-6 pb-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="font-medium text-sm" htmlFor="username">Username: </label>
            <Input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="johndoe"/>
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>
          <div className="space-y-2">
            <label className="font-medium text-sm" htmlFor="password">Password: </label>
            <Input type="password" value={formData.password} onChange={handleChange} id="password"/>
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <div className="text-sm">
            <span className="text-muted">Don't have an account yet? </span>
            <Link to={"/auth/signup"} className="text-primary hover:underline">Sign Up</Link>
          </div>
          <div>
            <Button variant={"primary"} className="w-full" disabled={Object.values(errors).some(error => error) || loading}>
              {loading ?
              <> 
                <Loader2 className="animate-spin"/>
                <span>Signing You In...</span> 
              </>
              : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn