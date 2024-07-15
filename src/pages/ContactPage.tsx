import { Button } from "@/components/ui/button";

function ContactPage() {
  return (
    <div className="flex justify-center mt-4">
      <form className="flex flex-col items-center sm:gap-4 rounded-lg w-96 p-4  border border-blue-300">
        <h2 className="text-3xl">Contact Us</h2>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex justify-between min-w-72">
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              name="username"
              id="username"
              className="border text-primary border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div className="flex justify-between min-w-72">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="border text-primary border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="firstName">Subject:</label>
            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              className="border text-primary border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="lastName">Message</label>
            <input
              required
              type="text"
              className="border text-primary h-20 border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>
        <Button className="transition-all duration-300 hover:bg-blue-900 hover:text-white px-4 py-2  border ">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactPage;
