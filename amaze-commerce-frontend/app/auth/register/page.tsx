import Link from "next/link";


export default function Register() {
  return (
    <div className="container relative mx-auto justify-center mb-20 items-center flex w-full">
      {/* Background Video */}
      <div className="flex justify-center items-center absolute">
        <video
          autoPlay
          loop
          muted
          className="w-full h-[700px] top-5 rounded-lg relative z-0 object-cover  opacity-50"
        >
          <source src="/video/register-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-center my-4">
          Amaze<span className="text-yellow-500">Com</span>
        </h1>
        <div className="flex flex-col justify-center border-2 py-12 shadow-lg shadow-running-animation px-8 rounded-lg items-start">
          <h3 className="text-4xl font-semibold mb-6">
            Create account
          </h3>
          <div>
            <form action="" className="flex flex-col">
              <label htmlFor="name" className="text-xl font-semibold mb-1">
                Your name
              </label>
              <input
                type="text"
                className=" rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
              />
              <label htmlFor="email" className="text-xl font-semibold mb-1">
                Your email
              </label>
              <input
                type="email"
                className=" rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
              />
              <label htmlFor="phone" className="text-xl font-semibold mb-1">
                Mobile number
              </label>
              <input
                type="tel"
                className=" rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
              />
              <label htmlFor="password" className="text-xl font-semibold mb-1">
                Enter password
              </label>
              <input
                type="password"
                className=" rounded-lg p-2 mb-4 w-[400px] border-gray-400 border-2"
              />
              <button className="text-xl font-semibold btn btn-warning">
                Continue
              </button>
            </form>
            <div className="flex gap-3 mt-2">
              <p className="text-xl ">Already have an account? </p> <Link className="text-blue-500 text-xl font-semibold" href={'/'}>Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
