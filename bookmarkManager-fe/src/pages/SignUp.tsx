import Button from "../components/ui/Button"
import { Input } from "../components/ui/Input"
const SignUp = () => {
  return (
    <div className="bg-white z-10 mt-10 rounded-xl w-[90%] max-w-[600px] font-manrope shadow-lg">
      <div className="flex flex-col p-6 space-y-1.5">
        <h3 className="text-xl md:text-2xl text-primary font-semibold">Sign Up</h3>
        <p className="text-muted text-sm">Create an account to get started</p>
      </div>
      <div className="px-6 pb-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="font-medium text-sm" htmlFor="username">Username: </label>
            <Input type="text" id="username" placeholder="johndoe"/>
          </div>
          <div className="space-y-2">
            <label className="font-medium text-sm" htmlFor="password">Password: </label>
            <Input type="password" id="password"/>
          </div>
          <div className="space-y-2">
            <label className="font-medium text-sm" htmlFor="confirm-password">Confirm Password: </label>
            <Input type="password" id="confirm-password"/>
          </div>
          <div>
            <Button variant={"outline"} >Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp