import "../../css/About.css";

const team = [
  {
    name: "Ilyass Oudli",
    role: "Fullstack Web Developer",
    responsibility: "yyyyyyyyyyyyyyyyyyyyyyyyyy",
    image: "https://ca.slack-edge.com/E05LYDFST6K-U0886ATPBME-26bb96d4f536-512", // replace with your actual image path
    github: "https://github.com/med-ilyass",
  },
  {
    name: "Lyla Lynn",
    role: "Fullstack Web Developer",
    responsibility: "yyyyyyyyyyyyyyyyyyyyyyyyyy",
    image: "https://ca.slack-edge.com/E05LYDFST6K-U087HDL8YRH-1aa5a6a2de36-512",
    github: "https://github.com/theLylabean",
  },
  {
    name: "Nancy Quinonez",
    role: "Fullstack Web Developer",
    responsibility: "yyyyyyyyyyyyyyyyyyyyyyyyyy",
    image: "https://ca.slack-edge.com/E05LYDFST6K-U08730NC4UF-24045defd479-512",
    github: "https://github.com/itsnancyq",
  },
];

const About = () => {
  return (
    <div className="about-page">
      <section className="intro-section">
        <h1>About Our Platform</h1>
        <p>
          Welcome to our platform — a safe, inclusive, and creative space
          designed for everyone. Whether you’re here to explore, express, or
          connect, our mission is to empower voices from all communities,
          including LGBTQ+, people of color, neurodivergent individuals, and
          anyone who has ever felt unheard. Our platform was built with
          community in mind. We believe in the power of stories and the strength
          of shared experiences. Here, users can create posts, share thoughts,
          engage with others through comments, and participate in open
          conversations across a variety of topics — from daily life and mental
          health, to creativity, advocacy, and everything in between. We are
          committed to maintaining a respectful and safe environment where hate
          speech, discrimination, and harassment are not tolerated. Whether
          you’re a developer, an artist, a student, an activist, or just someone
          who wants to belong — you have a place here. This is more than just a
          site; it’s your community. 💬🏳️‍🌈✊
        </p>
      </section>

      <section className="team-section">
        <h2>Meet the Dev Team</h2>
        <div className="team-grid">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              <img src={member.image} alt={`${member.name}'s avatar`} />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              {/* <p className="responsibility">{member.responsibility}</p> */}
              <a href={member.github} target="_blank" rel="noreferrer">
                Visit GitHub
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
