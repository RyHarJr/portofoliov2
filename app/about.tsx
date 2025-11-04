export default function About() {
  return (
    <>
      <section id="about" className="bg-thirdary p-20">
        <div>
          <h2 className="text-4xl font-bold mb-4 text-text-primary text-center">About Me</h2>
          <div className="grid grid-cols-2 gap-8 border p-10 rounded-lg">
            <div>
              <p className="text-text-primary mb-4">Hello! I'm [Your Name], a passionate developer with a love for creating innovative solutions. With a background in [Your Background], I specialize in [Your Specialization].</p>
              <p className="text-text-primary mb-4">In my free time, I enjoy [Your Hobbies] and exploring new technologies. I'm always eager to learn and take on new challenges.</p>
              <p className="text-text-primary">Feel free to reach out if you'd like to collaborate or just say hello!</p>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </>
  )
}
