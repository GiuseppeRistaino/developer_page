
import React from 'react';

interface SkillProps {
  name: string;
  level: number; // 1-5
}

const Skill: React.FC<SkillProps> = ({ name, level }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-text-secondary text-sm">{level}/5</span>
      </div>
      <div className="w-full bg-dark-surface rounded-full h-2">
        <div 
          className="bg-highlight h-2 rounded-full" 
          style={{ width: `${(level / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-dark-surface">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Chi Sono</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-display font-bold mb-6">Background Professionale</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Sono uno sviluppatore con passione per l'innovazione e il design funzionale.
              Il mio percorso professionale mi ha permesso di acquisire competenze
              sia nello sviluppo di applicazioni mobile con Flutter che nella creazione
              di videogiochi con Unity.
            </p>
            <p className="text-text-secondary mb-6 leading-relaxed">
              La mia filosofia di lavoro si concentra sulla creazione di esperienze
              digitali intuitive e piacevoli, dove la funzionalità incontra l'estetica.
              Credo fermamente che un buon design debba essere tanto bello quanto utile.
            </p>
            
            <h3 className="text-2xl font-display font-bold mt-10 mb-6">Approccio al design</h3>
            <p className="text-text-secondary leading-relaxed">
              Il mio approccio alla progettazione è centrato sull'utente. Inizio ogni progetto
              con una fase di ricerca e comprensione del problema, seguita dalla creazione
              di prototipi e test iterativi. Questo mi permette di sviluppare soluzioni
              che non solo soddisfano i requisiti tecnici, ma offrono anche un'esperienza
              utente eccellente.
            </p>
          </div>
          
          <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-display font-bold mb-6">Competenze Tecniche</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Sviluppo Mobile</h4>
                <Skill name="Flutter" level={5} />
                <Skill name="Dart" level={5} />
                <Skill name="Firebase" level={4} />
                <Skill name="iOS/Android" level={4} />
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Game Development</h4>
                <Skill name="Unity" level={5} />
                <Skill name="C#" level={4} />
                <Skill name="Game Design" level={4} />
                <Skill name="3D Modeling" level={3} />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Design</h4>
                <Skill name="Figma" level={5} />
                <Skill name="Adobe XD" level={4} />
                <Skill name="UI/UX Design" level={5} />
                <Skill name="Prototyping" level={4} />
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Web Development</h4>
                <Skill name="HTML/CSS" level={4} />
                <Skill name="JavaScript" level={4} />
                <Skill name="React" level={3} />
                <Skill name="Tailwind CSS" level={4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
