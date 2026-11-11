import React from 'react'

const Header = () => {
  return (
    <section className="hero">
    <div className="content flex column al-ce gap-md">
      <p className={"eyebrow"}>Hebammen-Team</p>
      <h1>
        Ankommen.<br /> Vertrauen.<br /> Geborgen Sein.
      </h1>
      <p className={"lead"}>
        Wir begleiten euch auf eurem Weg ins Elternsein.
      </p>
      <div className="flex row gap-md">
        <a href="/team">
          <button>Lerne das Team kennen</button>
        </a>
        <a href="/kurse"><button>Kurse ansehen</button></a>
      </div>
    </div>
  </section>
  )
}

export default Header