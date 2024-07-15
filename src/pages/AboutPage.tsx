function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background">
      <header className="w-full bg-background text-Black py-6 text-center">
        <h1 className="text-4xl font-bold">About MultiTasking</h1>
      </header>

      <main className="flex-grow w-full max-w-4xl px-6 py-10">
        <section className="bg-background border rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-lg">
            We are a passionate team of developers, designers, and productivity
            enthusiasts committed to helping you achieve your goals. Our diverse
            backgrounds and expertise allow us to create a well-rounded app that
            meets the needs of a wide range of users.
          </p>
        </section>

        <section className="bg-background border rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Technology</h2>
          <p className="text-lg">
            My Task App is built using the latest web technologies to ensure a
            fast, reliable, and seamless experience. Our tech stack includes:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>React for the front-end</li>
            <li>Node.js and Express for the back-end</li>
            <li>MongoDB for database management</li>
            <li>Tailwind CSS for styling</li>
            <li>Cloud services for hosting and scalability</li>
          </ul>
        </section>

        <section className="bg-background border rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg mb-4">
            We envision a world where everyone can manage their tasks
            effortlessly and achieve their goals efficiently. Our app is just
            the beginning. We are constantly working on new features and
            improvements to make My Todo App the best productivity tool
            available.
          </p>
          <p className="text-lg">
            Join us on this journey and transform the way you manage your tasks!
          </p>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
