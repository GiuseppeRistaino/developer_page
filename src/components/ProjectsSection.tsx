
import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Technology {
  name: string;
  color?: string;
}

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
}

const Project: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  technologies,
  liveLink,
  githubLink,
  featured = false
}) => {
  return (
    <Card className={`bg-dark-card border-dark-surface overflow-hidden card-hover ${
      featured ? 'border-l-4 border-l-highlight' : ''
    }`}>
      <div className="aspect-video overflow-hidden bg-dark-surface">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-display font-bold">{title}</h3>
          {featured && (
            <span className="bg-highlight/20 text-highlight text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        <p className="text-text-secondary mb-6">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag" style={tech.color ? { backgroundColor: tech.color } : {}}>
              {tech.name}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {liveLink && (
            <Button 
              className="bg-highlight hover:bg-highlight-dark" 
              size="sm"
              asChild
            >
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink size={16} /> Demo
              </a>
            </Button>
          )}
          {githubLink && (
            <Button 
              variant="outline" 
              size="sm"
              className="border-highlight text-highlight hover:bg-highlight/10"
              asChild
            >
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={16} /> Code
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectsSection: React.FC = () => {
  const projects: ProjectProps[] = [
    {
      title: "EatsNeed",
      description: "App mobile Flutter per la gestione dei prodotti in dispensa, con notifiche per le scadenze e suggerimenti di ricette personalizzate.",
      image: "/images/EatsNeed_splash.jpg",
      technologies: [
        { name: "Flutter" },
        { name: "Firebase" },
        { name: "Barcode API" },
        { name: "Notifications" }
      ],
      liveLink: "https://play.google.com/store/apps/details?id=com.miscorex.eatsneed",
      //githubLink: "#",
      featured: true
    },
    {
      title: "PianoMap",
      description: "PianoMap è l'app dedicata agli amanti del pianoforte e della musica che vogliono scoprire, suonare e condividere pianoforti accessibili al pubblico in ogni angolo del mondo.",
      image: "/images/pianoMaps_splash.png",
      technologies: [
        { name: "Flutter" },
        { name: "Firebase" }
      ],
      //liveLink: "#",
      featured: true
    },
    /*{
      title: "Torchmaze",
      description: "Videogioco mobile survival in prima persona realizzato con Unity. Sfida i giocatori a trovare l'uscita prima che la torcia si spenga.",
      image: "https://placehold.co/600x400/262626/424242?text=Torchmaze+Game&font=montserrat",
      technologies: [
        { name: "Unity" },
        { name: "C#" },
        { name: "AI" },
        { name: "Procedural Generation" }
      ],
      liveLink: "#",
      featured: true
    }*/
  ];

  return (
    <section id="projects">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Progetti</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="animate-fade-in" 
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <Project {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
