import { useEffect } from 'react';
import { Footer } from './components/layout/Footer';
import { GeometryBackground } from './components/layout/GeometryBackground';
import { Nav } from './components/layout/Nav';
import { Awards } from './components/sections/Awards';
import { Contact } from './components/sections/Contact';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { awards, awardsHeading, awardsIntro } from './data/awards';
import { navItems, profile } from './data/profile';
import { projects, projectsHeading } from './data/projects';
import { servicesContent } from './data/services';
import { marqueeTech, skills, skillsHeading, stacks, stacksLabel, toolboxLabel } from './data/skills';
import { Marquee } from './components/ui/Marquee';

export default function App() {
  // The browser resolves the URL hash before React renders, so honor deep links (e.g. /#contact) here.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-surface"
      >
        Skip to content
      </a>

      <GeometryBackground />

      <div className="relative z-10 mx-auto max-w-[1480px] px-3 pt-3 sm:px-4 sm:pt-4 lg:pl-8 lg:pr-40 xl:px-40">
        <Nav items={navItems} name={profile.shortName} status={profile.availability.short} />

        <main id="main" className="flex flex-col gap-3 sm:gap-4">
          <Hero profile={profile} projectsId="projects" />
          <Marquee items={marqueeTech} />
          <Services content={servicesContent} />
          <Projects heading={projectsHeading} projects={projects} />
          <Skills
            heading={skillsHeading}
            stacksLabel={stacksLabel}
            stacks={stacks}
            toolboxLabel={toolboxLabel}
            skills={skills}
          />
          <Awards heading={awardsHeading} intro={awardsIntro} awards={awards} />
          <Contact contact={profile.contact} />
        </main>

        <Footer name={profile.name} credit={profile.footer.credit} />
      </div>
    </>
  );
}
